import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../../components/layout/PageContainer';

// 星座列表
const constellations = [
  '白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座',
  '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'
];

const ConstellationPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedConstellation, setSelectedConstellation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  // 处理星座选择
  const handleConstellationSelect = (constellation: string) => {
    setSelectedConstellation(constellation);
    fetchAnalysis(constellation);
  };

  // 获取星座分析
  const fetchAnalysis = async (constellation: string) => {
    setIsLoading(true);
    try {
      // 调用 API
      const response = await fetch(`/api/v1/fortune/constellation/${constellation}`);
      
      if (response.ok) {
        const result = await response.json();
        setAnalysis(result.data);
      } else {
        const error = await response.json();
        alert(error.error.message);
      }
    } catch (error) {
      alert('网络错误，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer className="py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-serif font-semibold text-center mb-8 text-text-primary">
          星座分析
        </h1>

        {/* 星座选择 */}
        <div className="glass rounded-xl p-6 mb-8">
          <h3 className="text-sm font-medium text-text-secondary mb-4">
            选择星座
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {constellations.map((constellation) => (
              <button
                key={constellation}
                type="button"
                onClick={() => handleConstellationSelect(constellation)}
                className={`py-2 px-3 rounded-lg text-sm transition-all ${selectedConstellation === constellation ? 'bg-primary-light text-text-primary' : 'bg-background-elevated text-text-secondary hover:bg-background-hover'}`}
              >
                {constellation}
              </button>
            ))}
          </div>
        </div>

        {/* 分析结果 */}
        {isLoading ? (
          <div className="text-center py-10">
            <p className="text-text-secondary">分析中...</p>
          </div>
        ) : analysis ? (
          <div className="space-y-6">
            {/* 基本信息 */}
            <div className="glass rounded-xl p-6">
              <h2 className="text-xl font-serif font-semibold mb-4 text-text-primary">
                {analysis.name}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-text-muted">元素</p>
                  <p className="text-sm text-text-secondary">{analysis.element}</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted">守护星</p>
                  <p className="text-sm text-text-secondary">{analysis.planet}</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted">幸运数字</p>
                  <p className="text-sm text-text-secondary">{analysis.luckyInfo.number}</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted">幸运颜色</p>
                  <p className="text-sm text-text-secondary">{analysis.luckyInfo.color}</p>
                </div>
              </div>
            </div>

            {/* 性格分析 */}
            <div className="glass rounded-xl p-6">
              <h3 className="text-sm font-medium text-text-secondary mb-4">
                性格分析
              </h3>
              <p className="text-sm text-text-secondary whitespace-pre-line">
                {analysis.personality}
              </p>
            </div>

            {/* 运势 */}
            <div className="glass rounded-xl p-6">
              <h3 className="text-sm font-medium text-text-secondary mb-4">
                运势
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-text-muted">今日运势</p>
                  <p className="text-sm text-text-secondary">{analysis.horoscope.today.overall}</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted">本周运势</p>
                  <p className="text-sm text-text-secondary">{analysis.horoscope.week}</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted">本月运势</p>
                  <p className="text-sm text-text-secondary">{analysis.horoscope.month}</p>
                </div>
              </div>
            </div>

            {/* 事业分析 */}
            <div className="glass rounded-xl p-6">
              <h3 className="text-sm font-medium text-text-secondary mb-4">
                事业分析
              </h3>
              <p className="text-sm text-text-secondary whitespace-pre-line">
                {analysis.career}
              </p>
            </div>

            {/* 感情分析 */}
            <div className="glass rounded-xl p-6">
              <h3 className="text-sm font-medium text-text-secondary mb-4">
                感情分析
              </h3>
              <p className="text-sm text-text-secondary whitespace-pre-line">
                {analysis.love}
              </p>
            </div>

            {/* 匹配度 */}
            <div className="glass rounded-xl p-6">
              <h3 className="text-sm font-medium text-text-secondary mb-4">
                星座匹配度
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-text-muted">最佳匹配</p>
                  <p className="text-sm text-text-secondary">{analysis.compatibility.bestMatch.join('、')}</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted">需谨慎</p>
                  <p className="text-sm text-text-secondary">{analysis.compatibility.worstMatch.join('、')}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-text-secondary">请选择一个星座开始分析</p>
          </div>
        )}

        {/* 提示信息 */}
        <div className="mt-8 text-center text-sm text-text-muted">
          <p>星座分析结果仅供参考，不能替代实际决策。</p>
          <p className="mt-2">每个人都是独一无二的，星座只是了解自己的一个参考角度。</p>
        </div>
      </div>
    </PageContainer>
  );
};

export default ConstellationPage;