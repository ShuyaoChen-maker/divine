import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background-elevated border-t border-primary-light">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 品牌信息 */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Star className="w-5 h-5 text-starlight" />
              <h2 className="text-lg font-serif font-semibold text-text-primary">玄默</h2>
            </div>
            <p className="text-sm text-text-muted">
              一个沉浸式的命理探索空间，不只是工具，更是与你内心对话的场域。
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="mailto:contact@xuanmo.com" className="text-text-muted hover:text-accent transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <a href="tel:400-123-4567" className="text-text-muted hover:text-accent transition-colors">
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* 功能链接 */}
          <div>
            <h3 className="text-sm font-medium text-text-primary mb-4">功能导航</h3>
            <ul className="space-y-2">
              <li><Link to="/tarot" className="text-sm text-text-muted hover:text-secondary transition-colors">塔罗占卜</Link></li>
              <li><Link to="/liuyao" className="text-sm text-text-muted hover:text-secondary transition-colors">六爻起卦</Link></li>
              <li><Link to="/astrology" className="text-sm text-text-muted hover:text-secondary transition-colors">星盘排盘</Link></li>
              <li><Link to="/constellation" className="text-sm text-text-muted hover:text-secondary transition-colors">星座分析</Link></li>
              <li><Link to="/bazi" className="text-sm text-text-muted hover:text-secondary transition-colors">八字排盘</Link></li>
            </ul>
          </div>

          {/* 信息链接 */}
          <div>
            <h3 className="text-sm font-medium text-text-primary mb-4">关于我们</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm text-text-muted hover:text-secondary transition-colors">关于玄默</Link></li>
              <li><Link to="/disclaimer" className="text-sm text-text-muted hover:text-secondary transition-colors">免责声明</Link></li>
              <li><a href="#" className="text-sm text-text-muted hover:text-secondary transition-colors">隐私政策</a></li>
              <li><a href="#" className="text-sm text-text-muted hover:text-secondary transition-colors">服务条款</a></li>
            </ul>
          </div>
        </div>

        {/* 版权信息 */}
        <div className="mt-8 pt-6 border-t border-primary-light text-center">
          <p className="text-xs text-text-muted">
            © {currentYear} 玄默 - 命理玄学工具平台. 保留所有权利.
          </p>
          <p className="text-xs text-text-muted mt-2">
            本网站内容仅供参考，不构成任何专业建议。
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;