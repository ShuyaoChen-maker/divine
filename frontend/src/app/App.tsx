import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PageContainer from '../components/layout/PageContainer';

// 页面组件
import HomePage from './HomePage';
import TarotPage from '../features/tarot/TarotPage';
import LiuYaoPage from '../features/liuyao/LiuYaoPage';
import AstrologyPage from '../features/astrology/AstrologyPage';
import ConstellationPage from '../features/constellation/ConstellationPage';
import BaziPage from '../features/bazi/BaziPage';
import ResultPage from '../features/result/ResultPage';
import AboutPage from '../features/info/AboutPage';
import DisclaimerPage from '../features/info/DisclaimerPage';

// 临时占位组件（后续会实现）

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <PageContainer>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/tarot" element={<TarotPage />} />
              <Route path="/liuyao" element={<LiuYaoPage />} />
              <Route path="/astrology" element={<AstrologyPage />} />
              <Route path="/constellation" element={<ConstellationPage />} />
              <Route path="/bazi" element={<BaziPage />} />
              <Route path="/result/:type/:id" element={<ResultPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/disclaimer" element={<DisclaimerPage />} />
            </Routes>
          </PageContainer>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;