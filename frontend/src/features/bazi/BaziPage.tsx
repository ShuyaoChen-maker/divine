import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../../components/layout/PageContainer';

// 表单验证模式
const baziFormSchema = z.object({
  birthDate: z.string().required('请输入出生日期'),
  birthTime: z.string().required('请输入出生时间'),
  gender: z.enum(['male', 'female'], { required_error: '请选择性别' }),
  birthPlace: z.string().optional(),
});

type BaziFormData = z.infer<typeof baziFormSchema>;

const BaziPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // 处理表单提交
  const handleSubmit = async (data: BaziFormData) => {
    setIsLoading(true);
    try {
      // 调用 API
      const response = await fetch('/api/v1/fortune/bazi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        navigate(`/result/bazi/${result.data.id}`);
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
  const { register, handleSubmit: formHandleSubmit, formState: { errors } } = useForm<BaziFormData>({
    resolver: zodResolver(baziFormSchema),
    defaultValues: {
      birthDate: '',
      birthTime: '',
      gender: 'male',
      birthPlace: '',
    },
  });

  return (
    <PageContainer className="py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-serif font-semibold text-center mb-8 text-text-primary">
          八字排盘
        </h1>

        <form onSubmit={formHandleSubmit(handleSubmit)} className="space-y-8">
          {/* 出生信息输入 */}
          <div className="glass rounded-xl p-6">
            <h3 className="text-sm font-medium text-text-secondary mb-4">
              出生信息
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
                  性别
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="male"
                      {...register('gender')}
                      className="mr-2"
                    />
                    <span className="text-sm text-text-secondary">男</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="female"
                      {...register('gender')}
                      className="mr-2"
                    />
                    <span className="text-sm text-text-secondary">女</span>
                  </label>
                </div>
                {errors.gender && (
                  <p className="text-xs text-red-400 mt-1">{errors.gender.message}</p>
                )}
              </div>
              <div>
                <label className="block text-xs text-text-muted mb-1">
                  出生地点（可选）
                </label>
                <input
                  type="text"
                  {...register('birthPlace')}
                  className="w-full input-fortune rounded-lg p-2"
                  placeholder="例如：北京市"
                />
              </div>
            </div>
          </div>

          {/* 排盘说明 */}
          <div className="glass rounded-xl p-6">
            <h3 className="text-sm font-medium text-text-secondary mb-4">
              排盘说明
            </h3>
            <p className="text-sm text-text-muted mb-2">
              八字排盘是一种传统的命理方法，通过出生时间来分析个人的命运走势。
            </p>
            <p className="text-sm text-text-muted">
              系统会生成八字命盘，包括天干地支、五行、十神等信息，并提供基础分析。
            </p>
          </div>

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
          <p>八字排盘需要准确的出生时间，时间精度越高，结果越准确。</p>
          <p className="mt-2">结果仅供参考，不能替代实际决策。</p>
        </div>
      </div>
    </PageContainer>
  );
};

export default BaziPage;