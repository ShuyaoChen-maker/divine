import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../../components/layout/PageContainer';

// 表单验证模式
const liuyaoFormSchema = z.object({
  question: z.string().optional(),
});

type LiuYaoFormData = z.infer<typeof liuyaoFormSchema>;

const LiuYaoPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // 处理表单提交
  const handleSubmit = async (data: LiuYaoFormData) => {
    setIsLoading(true);
    try {
      // 调用 API
      const response = await fetch('/api/v1/fortune/liuyao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: data.question,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        navigate(`/result/liuyao/${result.data.id}`);
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
  const { register, handleSubmit: formHandleSubmit, formState: { errors } } = useForm<LiuYaoFormData>({
    resolver: zodResolver(liuyaoFormSchema),
    defaultValues: {
      question: '',
    },
  });

  return (
    <PageContainer className="py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-serif font-semibold text-center mb-8 text-text-primary">
          六爻起卦
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
              placeholder="例如：我近期的财运如何？"
            />
          </div>

          {/* 起卦说明 */}
          <div className="glass rounded-xl p-6">
            <h3 className="text-sm font-medium text-text-secondary mb-4">
              起卦说明
            </h3>
            <p className="text-sm text-text-muted mb-2">
              六爻起卦是一种传统的周易预测方法，通过卦象来分析事物的发展趋势。
            </p>
            <p className="text-sm text-text-muted">
              系统会自动生成卦象，包括本卦、变卦和动爻，为您提供参考。
            </p>
          </div>

          {/* 提交按钮 */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isLoading}
              className="btn-fortune px-8 py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? '起卦中...' : '开始起卦'}
            </button>
          </div>
        </form>

        {/* 提示信息 */}
        <div className="mt-8 text-center text-sm text-text-muted">
          <p>六爻起卦结果仅供参考，不能替代实际决策。</p>
          <p className="mt-2">命运掌握在自己手中，积极面对生活的挑战。</p>
        </div>
      </div>
    </PageContainer>
  );
};

export default LiuYaoPage;