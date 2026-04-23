import React from 'react';
import { Star } from 'lucide-react';
import PageContainer from '../../components/layout/PageContainer';

const AboutPage: React.FC = () => {
  return (
    <PageContainer className="py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-serif font-semibold text-center mb-8 text-text-primary">
          关于我们
        </h1>

        <div className="glass rounded-xl p-6 mb-8">
          <div className="flex justify-center mb-6">
            <Star className="w-12 h-12 text-starlight" />
          </div>
          <h2 className="text-xl font-serif font-semibold text-center mb-4 text-text-primary">
            玄默
          </h2>
          <p className="text-sm text-text-secondary text-center mb-6">
            一个沉浸式的命理探索空间
          </p>
          <div className="space-y-4">
            <p className="text-sm text-text-secondary">
              玄默是一个专注于命理玄学工具的平台，我们致力于为用户提供专业、客观、有参考价值的测算服务。
            </p>
            <p className="text-sm text-text-secondary">
              我们相信，命理不是宿命，而是一种参考和指引。通过了解自己的特质和潜在趋势，你可以更明智地做出选择，创造属于自己的美好人生。
            </p>
            <p className="text-sm text-text-secondary">
              我们的团队由热爱玄学文化的专业人士组成，致力于将传统玄学与现代科技相结合，为用户提供优质的测算体验。
            </p>
            <p className="text-sm text-text-secondary">
              我们承诺，所有测算结果仅供参考，不能替代实际决策。命运掌握在自己手中，积极面对生活的挑战，才是最正确的选择。
            </p>
          </div>
        </div>

        <div className="glass rounded-xl p-6 mb-8">
          <h3 className="text-sm font-medium text-text-secondary mb-4">
            我们的愿景
          </h3>
          <p className="text-sm text-text-secondary">
            成为用户首选的在线玄学工具平台，通过科技与传统玄学的结合，为用户提供有价值的参考信息，帮助用户更好地了解自己，探索生活的可能性。
          </p>
        </div>

        <div className="glass rounded-xl p-6">
          <h3 className="text-sm font-medium text-text-secondary mb-4">
            联系我们
          </h3>
          <div className="space-y-2">
            <p className="text-sm text-text-secondary">
              邮箱：contact@xuanmo.com
            </p>
            <p className="text-sm text-text-secondary">
              电话：400-123-4567
            </p>
            <p className="text-sm text-text-secondary">
              地址：北京市朝阳区建国路88号
            </p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default AboutPage;