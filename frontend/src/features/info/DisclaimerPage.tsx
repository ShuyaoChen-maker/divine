import React from 'react';
import PageContainer from '../../components/layout/PageContainer';

const DisclaimerPage: React.FC = () => {
  return (
    <PageContainer className="py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-serif font-semibold text-center mb-8 text-text-primary">
          免责声明
        </h1>

        <div className="glass rounded-xl p-6 space-y-4">
          <p className="text-sm text-text-secondary">
            欢迎使用玄默（以下简称"本平台"）提供的命理玄学工具服务。在使用本平台前，请您仔细阅读并理解本免责声明。
          </p>

          <h3 className="text-sm font-medium text-text-secondary mt-6 mb-2">
            1. 信息仅供参考
          </h3>
          <p className="text-sm text-text-secondary">
            本平台提供的所有测算结果、分析和建议仅供参考，不构成任何专业建议或预测。命理玄学属于传统文化范畴，其准确性和科学性尚未得到现代科学的充分验证。
          </p>

          <h3 className="text-sm font-medium text-text-secondary mt-4 mb-2">
            2. 不承担责任
          </h3>
          <p className="text-sm text-text-secondary">
            本平台不对用户因使用本平台服务而产生的任何直接或间接损失承担责任。用户应根据自身情况，谨慎对待测算结果，独立做出决策。
          </p>

          <h3 className="text-sm font-medium text-text-secondary mt-4 mb-2">
            3. 非医疗或法律建议
          </h3>
          <p className="text-sm text-text-secondary">
            本平台提供的服务不构成医疗、法律、财务或任何其他专业领域的建议。如有相关需求，用户应咨询专业人士。
          </p>

          <h3 className="text-sm font-medium text-text-secondary mt-4 mb-2">
            4. 内容更新
          </h3>
          <p className="text-sm text-text-secondary">
            本平台可能会不定期更新服务内容和免责声明，用户应定期查看最新版本。
          </p>

          <h3 className="text-sm font-medium text-text-secondary mt-4 mb-2">
            5. 适用法律
          </h3>
          <p className="text-sm text-text-secondary">
            本免责声明适用中华人民共和国法律。如发生争议，双方应通过友好协商解决；协商不成的，任何一方均有权向有管辖权的人民法院提起诉讼。
          </p>

          <p className="text-sm text-text-secondary mt-6">
            您使用本平台的服务，即表示您已阅读并同意本免责声明的全部内容。
          </p>
        </div>
      </div>
    </PageContainer>
  );
};

export default DisclaimerPage;