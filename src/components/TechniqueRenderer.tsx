import React, { useState } from 'react';
import { Copy, RotateCcw, Lock, Unlock } from 'lucide-react';

// This is the correct, combined interface for all props.
interface RendererProps {
  technique: string;
  inputText: string;
  outputText: string;
  onInputChange: (text: string) => void;
  isEncrypting: boolean;
  onModeToggle: (() => void) | null;
  vigenereKeyword: string;
  onVigenereKeywordChange: (keyword: string) => void;
  copied: boolean;
  onCopy: () => void;
}

// A unified tool UI to be used by multiple techniques
const UnifiedTool: React.FC<any> = (props) => {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 h-full flex flex-col">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{props.title}</h3>
          {props.onModeToggle && (
            <button onClick={props.onModeToggle} className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${props.isEncrypting ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' : 'bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200'}`}>
              {props.isEncrypting ? <Lock size={16} /> : <Unlock size={16} />}
              <span>{props.isEncrypting ? 'Encrypt Mode' : 'Decrypt Mode'}</span>
            </button>
          )}
        </div>
        
        {props.children}
        
        {/* This grid now grows and contains the new alignment structure */}
        <div className="grid md:grid-cols-2 gap-6 mt-6 flex-grow">
          {/* ----- INPUT COLUMN ----- */}
          {/* This inner grid forces perfect row alignment */}
          <div className="grid grid-rows-[auto_1fr] gap-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Input</label>
            <textarea 
              value={props.inputText} 
              onChange={(e) => props.onInputChange(e.target.value)} 
              placeholder="Enter text..." 
              className="w-full h-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" 
            />
          </div>

          {/* ----- OUTPUT COLUMN ----- */}
          {/* This inner grid forces perfect row alignment */}
          <div className="grid grid-rows-[auto_1fr] gap-2">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Output</label>
              <div className="flex space-x-2">
                <button onClick={props.onCopy} disabled={!props.outputText} className="flex items-center space-x-1 px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 rounded-md">
                  <Copy size={14} /> <span>{props.copied ? 'Copied!' : 'Copy'}</span>
                </button>
                <button onClick={() => props.onInputChange('')} className="flex items-center space-x-1 px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md">
                  <RotateCcw size={14} /> <span>Clear</span>
                </button>
              </div>
            </div>
            <div className="w-full h-full p-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-600 rounded-lg overflow-auto">
              <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-words font-mono">{props.outputText || '...'}</p>
            </div>
          </div>
        </div>
      </div>
    );
};

const TechniqueRenderer: React.FC<RendererProps> = (props) => {
  const { technique, vigenereKeyword, onVigenereKeywordChange } = props;
  
  switch (technique) {
    case 'caesar':
      return <UnifiedTool title="Caesar Cipher Tool" {...props} />;
    case 'atbash':
      return <UnifiedTool title="Atbash Cipher Tool" {...props} onModeToggle={null} />;
    case 'rot13':
      return <UnifiedTool title="ROT13 Cipher Tool" {...props} onModeToggle={null} />;
    case 'vigenere':
      return (
        <UnifiedTool title="Vigenère Cipher Tool" {...props}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Keyword</label>
            <input
              type="text"
              value={vigenereKeyword}
              onChange={(e) => onVigenereKeywordChange(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </UnifiedTool>
      );
    case 'base64':
       return <UnifiedTool title="Base64 Encoder/Decoder" {...props} />;
    case 'morse':
        return <UnifiedTool title="Morse Code" {...props} />;
    default:
      return <div>Technique not found</div>;
  }
};

export default TechniqueRenderer;