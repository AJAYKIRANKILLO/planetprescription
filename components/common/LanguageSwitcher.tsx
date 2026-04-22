
import React, { useState } from 'react';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  onLanguageChange: (language: string) => void;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'French' },
    { code: 'hi', name: 'Hindi' },
  ];

  const handleSelect = (code: string) => {
    setSelectedLanguage(code);
    onLanguageChange(code);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex items-center gap-2 text-slate-500 hover:text-teal-600 transition-colors"
      >
        <Globe className="w-5 h-5" />
        <span className="text-sm font-medium">{languages.find(l => l.code === selectedLanguage)?.name}</span>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl z-50">
          <ul className="py-1">
            {languages.map(lang => (
              <li key={lang.code}>
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); handleSelect(lang.code); }} 
                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                >
                  {lang.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
