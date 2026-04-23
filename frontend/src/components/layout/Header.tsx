import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Star } from 'lucide-react';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: '首页' },
    { path: '/tarot', label: '塔罗占卜' },
    { path: '/liuyao', label: '六爻起卦' },
    { path: '/astrology', label: '星盘排盘' },
    { path: '/constellation', label: '星座分析' },
    { path: '/bazi', label: '八字排盘' },
  ];

  const auxiliaryItems = [
    { path: '/about', label: '关于我们' },
    { path: '/disclaimer', label: '免责声明' },
  ];

  return (
    <header className="sticky top-0 z-50 glass border-b border-primary-light">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Star className="w-6 h-6 text-starlight twinkle" />
            <h1 className="text-xl font-serif font-semibold text-text-primary">玄默</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${isActive ? 'text-accent hover:text-accent-hover' : 'text-text-secondary hover:text-text-primary'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Auxiliary Links */}
          <div className="hidden md:flex items-center space-x-6">
            {auxiliaryItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-xs text-text-muted hover:text-text-secondary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-text-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-primary-light">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors ${isActive ? 'text-accent' : 'text-text-secondary'}`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
              <div className="pt-4 mt-4 border-t border-primary-light">
                {auxiliaryItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="block text-xs text-text-muted hover:text-text-secondary transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;