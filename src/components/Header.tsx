import React from 'react';
import { Stethoscope, Shield, Zap, Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export const Header: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-slate-900 shadow-sm border-b border-slate-200 dark:border-slate-700 transition-colors duration-300">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-blue-600 to-teal-600 dark:from-blue-500 dark:to-teal-500 p-2 rounded-xl">
              <Stethoscope className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                MedGPT-X
                <span className="text-sm font-normal text-teal-600 dark:text-teal-400 ml-3">
                  Clinical Edition
                </span>
              </h1>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                CheXNet-level AI • Clinical-grade accuracy • Fully offline
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-300">
                <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span>Clinical-grade AI</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-300">
                <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>CheXNet accuracy</span>
              </div>
            </div>
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200"
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};