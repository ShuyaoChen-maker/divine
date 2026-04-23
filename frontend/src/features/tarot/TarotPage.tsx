import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../../components/layout/PageContainer';

// 表单验证模式
const tarotFormSchema = z.object({
  question: z.string().optional(),
  spreadType: z.enum(['ONE_CARD', 'THREE_CARDS', 'Celtic_CROSS']),
  draws: z.array(
    z.object({
      number: z.number().min(1).max(78),
      positionIndex: z.number().min(0),
      isReversed: z.boolean(),
    })
  ),
});

type TarotFormData = z.infer<typeof tarotFormSchema>;

const TarotPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSpread, setSelectedSpread] = useState<'ONE_CARD' | 'THREE_CARDS' | 'Celtic_CROSS'>('ONE_CARD');
  const [draws, setDraws] = useState<{ number: number; positionIndex: number; isReversed: boolean }[]>([
    { number: 0, positionIndex: 0, isReversed: false },
  ]);

  // 牌阵配置
  const spreads = {
    ONE_CARD: { name: '单牌占卜', positions: 1, description: '简单直接的问题解答' },
    THREE_CARDS: { name: '三牌占卜', positions: 3, description: '过去、现在、未来' },
    Celtic_CROSS: { name: '凯尔特十字', positions: 10, description: '全面的问题分析' },
  };

  // 处理牌阵变化
  const handleSpreadChange = (spread: 'ONE_CARD' | 'THREE_CARDS' | 'Celtic_CROSS') => {
    setSelectedSpread(spread);
    const newDraws = Array.from({ length: spreads[spread].positions }, (_, i) => ({
      number: 0,
      positionIndex: i,
      isReversed: false,
    }));
    setDraws(newDraws);
  };

  // 处理卡牌数字变化
  const handleCardNumberChange = (index: number, value: number) => {
    const newDraws = [...draws];
    newDraws[index].number = value;
    setDraws(newDraws);
  };

  // 处理逆位变化
  const handleReversedChange = (index: number, value: boolean) => {
    const newDraws = [...draws];
    newDraws[index].isReversed = value;
    setDraws(newDraws);
  };

  // 处理表单提交
  const handleSubmit = async (data: TarotFormData) => {
    setIsLoading(true);
    try {
      // 调用 API
      const response = await fetch('/api/v1/fortune/tarot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: data.question,
          spreadType: selectedSpread,
          draws: draws,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        navigate(`/result/tarot/${result.data.id}`);
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

  // 表单控制
  const { register, handleSubmit: formHandleSubmit, formState: { errors } } = useForm<TarotFormData>({
    resolver: zodResolver(tarotFormSchema),
    defaultValues: {
      question: '',
      spreadType: selectedSpread,
      draws: draws,
    },
  });

  return (
    <PageContainer className="py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-serif font-semibold text-center mb-8 text-text-primary">
          塔罗占卜
        </h1>

        <form onSubmit={formHandleSubmit(handleSubmit)} className="space-y-8">
          {/* 问题输入 */}
          <div className="glass rounded-xl p-6">
            <label className="block text-sm font-medium text-text-secondary mb-2">
              请输入您的问题（可选）
            </label>
            <textarea
              {...register('question')}
              className="w-full input-fortune rounded-lg p-4 h-24 resize-none"
              placeholder="例如：我的事业会如何发展？"
            />
          </div>

          {/* 牌阵选择 */}
          <div className="glass rounded-xl p-6">
            <label className="block text-sm font-medium text-text-secondary mb-4">
              选择牌阵
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {Object.entries(spreads).map(([key, spread]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleSpreadChange(key as any)}
                  className={`p-4 rounded-lg transition-all ${selectedSpread === key ? 'bg-primary-light text-text-primary' : 'bg-background-elevated text-text-secondary hover:bg-background-hover'}`}
                >
                  <h3 className="font-medium mb-1">{spread.name}</h3>
                  <p className="text-xs text-text-muted">{spread.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* 卡牌选择 */}
          <div className="glass rounded-xl p-6">
            <label className="block text-sm font-medium text-text-secondary mb-4">
              请输入 1-78 的数字选择卡牌
            </label>
            <div className="space-y-4">
              {draws.map((draw, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="flex-1">
                    <label className="block text-xs text-text-muted mb-1">
                      位置 {index + 1}
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="78"
                      value={draw.number}
                      onChange={(e) => handleCardNumberChange(index, parseInt(e.target.value) || 0)}
                      className="w-full input-fortune rounded-lg p-2"
                      placeholder="输入 1-78"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`reversed-${index}`}
                      checked={draw.isReversed}
                      onChange={(e) => handleReversedChange(index, e.target.checked)}
                      className="mr-2"
                    />
                    <label htmlFor={`reversed-${index}`} className="text-sm text-text-secondary">
                      逆位
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 提交按钮 */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isLoading || draws.some(d => d.number === 0)}
              className="btn-fortune px-8 py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? '占卜中...' : '开始占卜'}
            </button>
          </div>
        </form>

        {/* 提示信息 */}
        <div className="mt-8 text-center text-sm text-text-muted">
          <p>每张塔罗牌都有其独特的含义，选择你直觉指引的数字。</p>
          <p className="mt-2">结果仅供参考，命运掌握在自己手中。</p>
        </div>
      </div>
    </PageContainer>
  );
};

export default TarotPage;