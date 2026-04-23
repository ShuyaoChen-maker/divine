import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Copy, Save, Share2, RefreshCw } from 'lucide-react';
import PageContainer from '../../components/layout/PageContainer';

const ResultPage: React.FC = () => {
  const { type, id } = useParams<{ type: string; id: string }>();
  const navigate = useNavigate();
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);

  // 获取结果数据
  useEffect(() => {
    if (id) {
      fetchResult();
    }
  }, [id]);

  const fetchResult = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/v1/fortune/result/${id}`);
      if (response.ok) {
        const data = await response.json();
        setResult(data.data);
      } else {
        const error = await response.json();
        alert(error.error.message);
        navigate('/');
      }
    } catch (error) {
      alert('网络错误，请稍后重试');
      navigate('/');
    } finally {
      setIsLoading(false);
    }
  };

  // 复制结果
  const handleCopyResult = () => {
    if (result) {
      let text = '';
      switch (type) {
        case 'tarot':
          text = `塔罗占卜结果\n\n问题：${result.question || '无'}\n牌阵：${result.spreadType}\n\n`;
          result.cards.forEach((card: any, index: number) => {
            text += `${index + 1}. ${card.position}\n`;
            text += `   卡牌：${card.card.name}${card.isReversed ? '（逆位）' : ''}\n`;
            text += `   解读：${card.interpretation}\n\n`;
          });
          text += `综合解读：${result.interpretation}`;
          break;
        case 'liuyao':
          text = `六爻起卦结果\n\n问题：${result.question || '无'}\n\n`;
          text += `本卦：${result.originalHexagram.name}（${result.originalHexagram.number}）\n`;
          text += `变卦：${result.changedHexagram.name}（${result.changedHexagram.number}）\n`;
          text += `动爻：${result.movingLines.join(', ')}\n\n`;
          text += `解读：${result.interpretation}`;
          break;
        case 'astrology':
          text = `星盘排盘结果\n\n`;
          text += `出生信息：\n`;
          text += `   日期：${result.birthInfo.date}\n`;
          text += `   时间：${result.birthInfo.time}\n`;
          text += `   地点：${result.birthInfo.place}\n\n`;
          text += `太阳星座：${result.interpretation.sunSign}\n`;
          text += `月亮星座：${result.interpretation.moonSign}\n`;
          text += `上升星座：${result.interpretation.risingSign}\n\n`;
          text += `性格分析：${result.interpretation.personality}\n\n`;
          text += `事业分析：${result.interpretation.career}\n\n`;
          text += `感情分析：${result.interpretation.relationships}`;
          break;
        case 'bazi':
          text = `八字排盘结果\n\n`;
          text += `出生信息：\n`;
          text += `   日期：${result.birthInfo.date}\n`;
          text += `   时间：${result.birthInfo.time}\n`;
          text += `   性别：${result.birthInfo.gender === 'male' ? '男' : '女'}\n`;
          text += `   地点：${result.birthInfo.place}\n`;
          text += `   农历：${result.birthInfo.lunarDate}\n`;
          text += `   生肖：${result.birthInfo.zodiacYear}\n\n`;
          text += `八字：\n`;
          text += `   年：${result.bazi.year.heavenly}${result.bazi.year.earthly}\n`;
          text += `   月：${result.bazi.month.heavenly}${result.bazi.month.earthly}\n`;
          text += `   日：${result.bazi.day.heavenly}${result.bazi.day.earthly}\n`;
          text += `   时：${result.bazi.hour.heavenly}${result.bazi.hour.earthly}\n\n`;
          text += `五行：\n`;
          text += `   年：${result.fiveElements.year}\n`;
          text += `   月：${result.fiveElements.month}\n`;
          text += `   日：${result.fiveElements.day}\n`;
          text += `   时：${result.fiveElements.hour}\n\n`;
          text += `十神：\n`;
          text += `   年：${result.tenGods.year}\n`;
          text += `   月：${result.tenGods.month}\n`;
          text += `   日：${result.tenGods.day}\n`;
          text += `   时：${result.tenGods.hour}\n\n`;
          text += `解读：${result.interpretation.personality}\n\n`;
          text += `事业：${result.interpretation.career}\n\n`;
          text += `感情：${result.interpretation.relationships}\n\n`;
          text += `大运：${result.interpretation.fortune}`;
          break;
        default:
          text = JSON.stringify(result, null, 2);
      }
      navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  // 分享结果
  const handleShare = () => {
    if (result && result.shareCode) {
      const url = `${window.location.origin}/result/share/${result.shareCode}`;
      if (navigator.share) {
        navigator.share({ url });
      } else {
        navigator.clipboard.writeText(url);
        alert('分享链接已复制到剪贴板');
      }
    }
  };

  // 重新测算
  const handleRetry = () => {
    navigate(`/${type}`);
  };

  if (isLoading) {
    return (
      <PageContainer className="py-8">
        <div className="max-w-3xl mx-auto text-center py-20">
          <p className="text-text-secondary">加载中...</p>
        </div>
      </PageContainer>
    );
  }

  if (!result) {
    return (
      <PageContainer className="py-8">
        <div className="max-w-3xl mx-auto text-center py-20">
          <p className="text-text-secondary">结果不存在</p>
          <Link to="/" className="mt-4 inline-block text-accent hover:text-accent-hover">
            返回首页
          </Link>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-serif font-semibold text-center mb-8 text-text-primary">
          {type === 'tarot' && '塔罗占卜结果'}
          {type === 'liuyao' && '六爻起卦结果'}
          {type === 'astrology' && '星盘排盘结果'}
          {type === 'bazi' && '八字排盘结果'}
        </h1>

        {/* 操作按钮 */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={handleCopyResult}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-background-elevated text-text-secondary hover:bg-background-hover transition-colors"
          >
            <Copy className="w-4 h-4" />
            <span>{copySuccess ? '已复制' : '复制结果'}</span>
          </button>
          <button
            onClick={handleShare}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-background-elevated text-text-secondary hover:bg-background-hover transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>分享</span>
          </button>
          <button
            onClick={handleRetry}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-background-elevated text-text-secondary hover:bg-background-hover transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>重新测算</span>
          </button>
        </div>

        {/* 结果内容 */}
        <div className="space-y-6">
          {/* 塔罗结果 */}
          {type === 'tarot' && (
            <div className="space-y-6">
              {result.question && (
                <div className="glass rounded-xl p-6">
                  <h3 className="text-sm font-medium text-text-secondary mb-2">
                    问题
                  </h3>
                  <p className="text-sm text-text-secondary">{result.question}</p>
                </div>
              )}
              <div className="glass rounded-xl p-6">
                <h3 className="text-sm font-medium text-text-secondary mb-4">
                  牌阵：{result.spreadType}
                </h3>
                <div className="space-y-4">
                  {result.cards.map((card: any, index: number) => (
                    <div key={index} className="border-b border-primary-light pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-sm font-medium text-text-primary">
                          {index + 1}. {card.position}
                        </h4>
                        {card.isReversed && (
                          <span className="text-xs text-text-muted">逆位</span>
                        )}
                      </div>
                      <div className="flex items-center mb-2">
                        <div className="w-16 h-24 bg-background-elevated rounded mr-4 flex items-center justify-center">
                          <span className="text-xs text-text-muted">{card.card.name}</span>
                        </div>
                        <div>
                          <p className="text-sm text-text-secondary">{card.card.name}</p>
                          <p className="text-xs text-text-muted">{card.card.nameEn}</p>
                        </div>
                      </div>
                      <p className="text-sm text-text-secondary whitespace-pre-line">
                        {card.interpretation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass rounded-xl p-6">
                <h3 className="text-sm font-medium text-text-secondary mb-4">
                  综合解读
                </h3>
                <p className="text-sm text-text-secondary whitespace-pre-line">
                  {result.interpretation}
                </p>
              </div>
            </div>
          )}

          {/* 六爻结果 */}
          {type === 'liuyao' && (
            <div className="space-y-6">
              {result.question && (
                <div className="glass rounded-xl p-6">
                  <h3 className="text-sm font-medium text-text-secondary mb-2">
                    问题
                  </h3>
                  <p className="text-sm text-text-secondary">{result.question}</p>
                </div>
              )}
              <div className="glass rounded-xl p-6">
                <h3 className="text-sm font-medium text-text-secondary mb-4">
                  卦象
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-text-muted">本卦</p>
                    <p className="text-sm text-text-secondary">
                      {result.originalHexagram.name}（{result.originalHexagram.number}）
                    </p>
                    <p className="text-xs text-text-muted mt-1">
                      {result.originalHexagram.text}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">变卦</p>
                    <p className="text-sm text-text-secondary">
                      {result.changedHexagram.name}（{result.changedHexagram.number}）
                    </p>
                    <p className="text-xs text-text-muted mt-1">
                      {result.changedHexagram.text}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">动爻</p>
                    <p className="text-sm text-text-secondary">
                      {result.movingLines.join(', ')}
                    </p>
                  </div>
                </div>
              </div>
              <div className="glass rounded-xl p-6">
                <h3 className="text-sm font-medium text-text-secondary mb-4">
                  解读
                </h3>
                <p className="text-sm text-text-secondary whitespace-pre-line">
                  {result.interpretation}
                </p>
              </div>
            </div>
          )}

          {/* 星盘结果 */}
          {type === 'astrology' && (
            <div className="space-y-6">
              <div className="glass rounded-xl p-6">
                <h3 className="text-sm font-medium text-text-secondary mb-4">
                  出生信息
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-text-muted">日期</p>
                    <p className="text-sm text-text-secondary">{result.birthInfo.date}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">时间</p>
                    <p className="text-sm text-text-secondary">{result.birthInfo.time}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">地点</p>
                    <p className="text-sm text-text-secondary">{result.birthInfo.place}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">时区</p>
                    <p className="text-sm text-text-secondary">{result.birthInfo.timezone}</p>
                  </div>
                </div>
              </div>
              <div className="glass rounded-xl p-6">
                <h3 className="text-sm font-medium text-text-secondary mb-4">
                  基本星座
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-text-muted">太阳星座</p>
                    <p className="text-sm text-text-secondary">{result.interpretation.sunSign}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">月亮星座</p>
                    <p className="text-sm text-text-secondary">{result.interpretation.moonSign}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">上升星座</p>
                    <p className="text-sm text-text-secondary">{result.interpretation.risingSign}</p>
                  </div>
                </div>
              </div>
              <div className="glass rounded-xl p-6">
                <h3 className="text-sm font-medium text-text-secondary mb-4">
                  性格分析
                </h3>
                <p className="text-sm text-text-secondary whitespace-pre-line">
                  {result.interpretation.personality}
                </p>
              </div>
              <div className="glass rounded-xl p-6">
                <h3 className="text-sm font-medium text-text-secondary mb-4">
                  事业分析
                </h3>
                <p className="text-sm text-text-secondary whitespace-pre-line">
                  {result.interpretation.career}
                </p>
              </div>
              <div className="glass rounded-xl p-6">
                <h3 className="text-sm font-medium text-text-secondary mb-4">
                  感情分析
                </h3>
                <p className="text-sm text-text-secondary whitespace-pre-line">
                  {result.interpretation.relationships}
                </p>
              </div>
            </div>
          )}

          {/* 八字结果 */}
          {type === 'bazi' && (
            <div className="space-y-6">
              <div className="glass rounded-xl p-6">
                <h3 className="text-sm font-medium text-text-secondary mb-4">
                  出生信息
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-text-muted">日期</p>
                    <p className="text-sm text-text-secondary">{result.birthInfo.date}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">时间</p>
                    <p className="text-sm text-text-secondary">{result.birthInfo.time}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">性别</p>
                    <p className="text-sm text-text-secondary">{result.birthInfo.gender === 'male' ? '男' : '女'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">地点</p>
                    <p className="text-sm text-text-secondary">{result.birthInfo.place}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">农历</p>
                    <p className="text-sm text-text-secondary">{result.birthInfo.lunarDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">生肖</p>
                    <p className="text-sm text-text-secondary">{result.birthInfo.zodiacYear}</p>
                  </div>
                </div>
              </div>
              <div className="glass rounded-xl p-6">
                <h3 className="text-sm font-medium text-text-secondary mb-4">
                  八字
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-text-muted">年</p>
                    <p className="text-sm text-text-secondary">
                      {result.bazi.year.heavenly}{result.bazi.year.earthly}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">月</p>
                    <p className="text-sm text-text-secondary">
                      {result.bazi.month.heavenly}{result.bazi.month.earthly}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">日</p>
                    <p className="text-sm text-text-secondary">
                      {result.bazi.day.heavenly}{result.bazi.day.earthly}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">时</p>
                    <p className="text-sm text-text-secondary">
                      {result.bazi.hour.heavenly}{result.bazi.hour.earthly}
                    </p>
                  </div>
                </div>
              </div>
              <div className="glass rounded-xl p-6">
                <h3 className="text-sm font-medium text-text-secondary mb-4">
                  五行
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-text-muted">年</p>
                    <p className="text-sm text-text-secondary">{result.fiveElements.year}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">月</p>
                    <p className="text-sm text-text-secondary">{result.fiveElements.month}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">日</p>
                    <p className="text-sm text-text-secondary">{result.fiveElements.day}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">时</p>
                    <p className="text-sm text-text-secondary">{result.fiveElements.hour}</p>
                  </div>
                </div>
              </div>
              <div className="glass rounded-xl p-6">
                <h3 className="text-sm font-medium text-text-secondary mb-4">
                  十神
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-text-muted">年</p>
                    <p className="text-sm text-text-secondary">{result.tenGods.year}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">月</p>
                    <p className="text-sm text-text-secondary">{result.tenGods.month}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">日</p>
                    <p className="text-sm text-text-secondary">{result.tenGods.day}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-muted">时</p>
                    <p className="text-sm text-text-secondary">{result.tenGods.hour}</p>
                  </div>
                </div>
              </div>
              <div className="glass rounded-xl p-6">
                <h3 className="text-sm font-medium text-text-secondary mb-4">
                  解读
                </h3>
                <p className="text-sm text-text-secondary whitespace-pre-line mb-4">
                  {result.interpretation.personality}
                </p>
                <p className="text-sm text-text-secondary whitespace-pre-line mb-4">
                  {result.interpretation.career}
                </p>
                <p className="text-sm text-text-secondary whitespace-pre-line mb-4">
                  {result.interpretation.relationships}
                </p>
                <p className="text-sm text-text-secondary whitespace-pre-line">
                  {result.interpretation.fortune}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 提示信息 */}
        <div className="mt-8 text-center text-sm text-text-muted">
          <p>结果仅供参考，不能替代实际决策。</p>
          <p className="mt-2">命运掌握在自己手中，积极面对生活的挑战。</p>
        </div>
      </div>
    </PageContainer>
  );
};

export default ResultPage;