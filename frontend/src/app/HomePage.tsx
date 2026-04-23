import { Link } from 'react-router-dom';
import { Star, Moon, Sun, BookOpen, Card, Compass } from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';

const HomePage: React.FC = () => {
  const features = [
    {
      title: '塔罗占卜',
      description: '通过卡牌探索内心，获取生活指引',
      icon: <Card className="w-8 h-8 text-accent" />,
      path: '/tarot',
    },
    {
      title: '六爻起卦',
      description: '传统周易预测，洞察事物发展趋势',
      icon: <BookOpen className="w-8 h-8 text-accent" />,
      path: '/liuyao',
    },
    {
      title: '星盘排盘',
      description: '解读星象密码，了解个人特质与运势',
      icon: <Moon className="w-8 h-8 text-accent" />,
      path: '/astrology',
    },
    {
      title: '星座分析',
      description: '探索星座奥秘，了解性格与命运',
      icon: <Compass className="w-8 h-8 text-accent" />,
      path: '/constellation',
    },
    {
      title: '八字排盘',
      description: '传统八字命理，解析人生轨迹',
      icon: <Sun className="w-8 h-8 text-accent" />,
      path: '/bazi',
    },
  ];

  return (
    <PageContainer className="py-12">
      {/* 首屏区域 */}
      <section className="text-center mb-20">
        <div className="mb-6 flex justify-center">
          <Star className="w-12 h-12 text-starlight twinkle" />
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-6 text-text-primary">
          玄默
        </h1>
        <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
          在暗夜中寻找星光，在迷雾中聆听内心
        </p>
        <p className="text-text-muted max-w-2xl mx-auto mb-12">
          一个沉浸式的命理探索空间，不只是工具，更是与你内心对话的场域。
          我们提供专业、客观的测算服务，助你更好地了解自己，探索生活的可能性。
        </p>
      </section>

      {/* 功能模块区 */}
      <section className="mb-16">
        <h2 className="text-2xl font-serif font-semibold text-center mb-12 text-text-primary">
          探索工具
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Link
              key={feature.path}
              to={feature.path}
              className="glass rounded-xl p-6 fortune-card"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-medium mb-2 text-text-primary">
                {feature.title}
              </h3>
              <p className="text-sm text-text-muted">
                {feature.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* 品牌理念 */}
      <section className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-serif font-semibold mb-6 text-text-primary">
          品牌理念
        </h2>
        <p className="text-text-secondary mb-4">
          我们相信，命理不是宿命，而是一种参考和指引。
        </p>
        <p className="text-text-secondary mb-4">
          通过了解自己的特质和潜在趋势，你可以更明智地做出选择，
          创造属于自己的美好人生。
        </p>
        <p className="text-text-muted mt-8">
          所有测算结果仅供参考，命运掌握在自己手中。
        </p>
      </section>
    </PageContainer>
  );
};

export default HomePage;