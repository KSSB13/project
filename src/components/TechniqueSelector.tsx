import React from 'react';
import { Shield, Key, RotateCcw, Radio, Binary, RefreshCw, ChevronDown } from 'lucide-react';
import { EncryptionTechnique, ENCRYPTION_TECHNIQUES } from '../types/encryption';

interface TechniqueSelectorProps {
  selectedTechnique: string;
  onTechniqueChange: (technique: string) => void;
}

const iconMap = {
  Shield,
  Key,
  RotateCcw,
  Radio,
  Binary,
  RefreshCw
};

const TechniqueSelector: React.FC<TechniqueSelectorProps> = ({ 
  selectedTechnique, 
  onTechniqueChange 
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const selectedTech = ENCRYPTION_TECHNIQUES.find(t => t.id === selectedTechnique);
  const IconComponent = selectedTech ? iconMap[selectedTech.icon as keyof typeof iconMap] : Shield;

  const groupedTechniques = ENCRYPTION_TECHNIQUES.reduce((acc, technique) => {
    if (!acc[technique.category]) {
      acc[technique.category] = [];
    }
    acc[technique.category].push(technique);
    return acc;
  }, {} as Record<string, EncryptionTechnique[]>);

  const categoryLabels = {
    classical: 'Classical Ciphers',
    modern: 'Modern Encoding',
    hash: 'Hash Functions'
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 flex items-center justify-between hover:border-blue-400 dark:hover:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center">
            <IconComponent size={16} />
          </div>
          <div className="text-left">
            <p className="font-medium text-gray-900 dark:text-gray-100">{selectedTech?.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{selectedTech?.description}</p>
          </div>
        </div>
        <ChevronDown 
          size={20} 
          className={`text-gray-400 dark:text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {Object.entries(groupedTechniques).map(([category, techniques]) => (
            <div key={category} className="p-2">
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {categoryLabels[category as keyof typeof categoryLabels]}
              </div>
              {techniques.map((technique) => {
                const TechIconComponent = iconMap[technique.icon as keyof typeof iconMap];
                return (
                  <button
                    key={technique.id}
                    onClick={() => {
                      onTechniqueChange(technique.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-3 py-3 rounded-md text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 ${
                      selectedTechnique === technique.id ? 'bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-500' : ''
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      selectedTechnique === technique.id 
                        ? 'bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-400' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}>
                      <TechIconComponent size={16} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">{technique.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{technique.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TechniqueSelector;