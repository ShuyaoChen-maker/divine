import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../../components/layout/PageContainer';

// 表单验证模式
const astrologyFormSchema = z.object({
  birthDate: z.string().required('请输入出生日期'),
  birthTime: z.string().required('请输入出生时间'),
  birthPlace: z.string().required('请输入出生地点'),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

type AstrologyFormData = z.infer<typeof astrologyFormSchema>;

const AstrologyPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSynastry, setIsSynastry] = useState(false); // 是否合盘

  // 处理表单提交
  const handleSubmit = async (data: AstrologyFormData) => {
    setIsLoading(true);
    try {
      // 调用 API
      const response = await fetch('/api/v1/fortune/astrology', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        navigate(`/result/astrology/${result.data.id}`);
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
  const { register, handleSubmit: formHandleSubmit, formState: { errors } } = useForm<AstrologyFormData>({
    resolver: zodResolver(astrologyFormSchema),
    defaultValues: {
      birthDate: '',
      birthTime: '',
      birthPlace: '',
    },
  });

  return (
    <PageContainer className="py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-serif font-semibold text-center mb-8 text-text-primary">
          星盘排盘
        </h1>

        {/* 合盘切换 */}
        <div className="text-center mb-6">
          <button
            type="button"
            onClick={() => setIsSynastry(!isSynastry)}
            className="text-sm text-accent hover:text-accent-hover transition-colors"
          >
            {isSynastry ? '切换到个人星盘' : '切换到合盘分析'}
          </button>
        </div>

        <form onSubmit={formHandleSubmit(handleSubmit)} className="space-y-8">
          {/* 出生信息输入 */}
          <div className="glass rounded-xl p-6">
            <h3 className="text-sm font-medium text-text-secondary mb-4">
              {isSynastry ? '个人信息（A）' : '出生信息'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-text-muted mb-1">
                  出生日期
                </label>
                <input
                  type="date"
                  {...register('birthDate')}
                  className="w-full input-fortune rounded-lg p-2"
                />
                {errors.birthDate && (
                  <p className="text-xs text-red-400 mt-1">{errors.birthDate.message}</p>
                )}
              </div>
              <div>
                <label className="block text-xs text-text-muted mb-1">
                  出生时间
                </label>
                <input
                  type="time"
                  {...register('birthTime')}
                  className="w-full input-fortune rounded-lg p-2"
                />
                {errors.birthTime && (
                  <p className="text-xs text-red-400 mt-1">{errors.birthTime.message}</p>
                )}
              </div>
              <div>
                <label className="block text-xs text-text-muted mb-1">
                  出生地点
                </label>
                <input
                  type="text"
                  {...register('birthPlace')}
                  className="w-full input-fortune rounded-lg p-2"
                  placeholder="例如：北京市"
                />
                {errors.birthPlace && (
                  <p className="text-xs text-red-400 mt-1">{errors.birthPlace.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* 合盘信息（如果启用） */}
          {isSynastry && (
            <div className="glass rounded-xl p-6">
              <h3 className="text-sm font-medium text-text-secondary mb-4">
                个人信息（B）
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-text-muted mb-1">
                    出生日期
                  </label>
                  <input
                    type="date"
                    className="w-full input-fortune rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="block text-xs text-text-muted mb-1">
                    出生时间
                  </label>
                  <input
                    type="time"
                    className="w-full input-fortune rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="block text-xs text-text-muted mb-1">
                    出生地点
                  </label>
                  <input
                    type="text"
                    className="w-full input-fortune rounded-lg p-2"
                    placeholder="例如：上海市"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 提交按钮 */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isLoading}
              className="btn-fortune px-8 py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? '排盘中...' : '开始排盘'}
            </button>
          </div>
        </form>

        {/* 提示信息 */}
        <div className="mt-8 text-center text-sm text-text-muted">
          <p>星盘排盘需要准确的出生时间和地点，时间精度越高，结果越准确。</p>
          <p className="mt-2">结果仅供参考，不能替代实际决策。</p>
        </div>
      </div>
    </PageContainer>
  );
};

export default AstrologyPage;