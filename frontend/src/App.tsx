import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import HistoryPage from './pages/History';
import ThemeToggle from './components/ThemeToggle';
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen flex flex-col">
      <header className="absolute top-0 left-0 w-full flex items-center justify-between px-8 py-6 z-10">
        <nav className="flex items-center space-x-8">
          <Link to="/" className="text-3xl font-extrabold text-white drop-shadow-md hover:underline">
            WinkXMissis
          </Link>
          <Link to="/history" className="text-lg text-white hover:underline">
            История
          </Link>
        </nav>
        <ThemeToggle />
      </header>
      <main className="flex-1 flex items-start justify-center pt-32 pb-16 px-4">
        <div className="w-full max-w-4xl">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<HistoryPage />} />
          </Routes>
        </div>
      </main>
      <footer className="text-center text-xs text-white/70 dark:text-gray-400 pb-4">
        © {new Date().getFullYear()} Wink x Misis
      </footer>
    </div>
  );
};

export default App;