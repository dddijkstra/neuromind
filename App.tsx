import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import Questionnaire from './pages/Questionnaire';
import Result from './pages/Result';

// Header Component
const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const isHome = location.pathname === '/' || location.pathname === '/questionnaire';

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        <div className="flex items-center gap-3">
           <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-400 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm">
             N
           </div>
           <div className="flex flex-col">
             <h1 className="text-xl font-bold text-gray-800 leading-tight">{t.title}</h1>
             <span className="text-xs text-gray-500 font-medium hidden sm:block">{t.subtitle}</span>
           </div>
        </div>
        
        <div className="flex items-center gap-4">
           {isHome && (
             <div className="hidden md:flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
               <span className="w-2 h-2 rounded-full bg-green-500"></span>
               System Ready
             </div>
           )}
           <button
             onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
             className="px-3 py-1.5 rounded-md text-sm font-semibold text-primary border border-primary hover:bg-blue-50 transition-colors"
           >
             {language === 'en' ? '中文' : 'English'}
           </button>
        </div>
      </div>
    </header>
  );
};

const AppContent = () => {
  return (
    <div className="min-h-screen flex flex-col">
       <Header />
       <main className="flex-grow bg-slate-50 relative">
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none" />
          
          <div className="relative z-10">
            <Routes>
              <Route path="/" element={<Questionnaire />} />
              <Route path="/questionnaire" element={<Questionnaire />} />
              <Route path="/result" element={<Result />} />
            </Routes>
          </div>
       </main>
       
       <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
         <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} NeuroMind Assessment System. For demonstration purposes only. Not a medical device.
         </div>
       </footer>
    </div>
  );
}

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <Router>
        <AppContent />
      </Router>
    </LanguageProvider>
  );
};

export default App;