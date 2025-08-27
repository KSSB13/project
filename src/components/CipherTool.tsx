import React, { useState, useEffect } from 'react';
import { Copy, RotateCcw, Lock, Unlock } from 'lucide-react';

interface CipherToolProps {
  shift: number;
  inputText: string;
  onInputChange: (text: string) => void;
  isEncrypting: boolean;
  onModeToggle: () => void;
}

const CipherTool: React.FC<CipherToolProps> = ({ 
  shift, 
  inputText, 
  onInputChange, 
  isEncrypting, 
  onModeToggle 
}) => {
  const [outputText, setOutputText] = useState('');
  const [copied, setCopied] = useState(false);

  const caesarCipher = (text: string, shiftValue: number, encrypt: boolean = true) => {
    const actualShift = encrypt ? shiftValue : -shiftValue;
    
    return text
      .split('')
      .map(char => {
        if (char.match(/[a-z]/i)) {
          const isUpperCase = char === char.toUpperCase();
          const baseCode = isUpperCase ? 65 : 97;
          const charCode = char.toUpperCase().charCodeAt(0);
          const shifted = ((charCode - baseCode + actualShift + 26) % 26) + baseCode;
          const result = String.fromCharCode(shifted);
          return isUpperCase ? result : result.toLowerCase();
        }
        return char;
      })
      .join('');
  };

  useEffect(() => {
    if (inputText) {
      const result = caesarCipher(inputText, shift, isEncrypting);
      setOutputText(result);
    } else {
      setOutputText('');
    }
  }, [inputText, shift, isEncrypting]);

  const handleCopy = async () => {
    if (outputText) {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClear = () => {
    onInputChange('');
    setOutputText('');
  };

  const handleToggleMode = () => {
    onModeToggle();
    if (outputText) {
      // Swap input and output when switching modes
      onInputChange(outputText);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Caesar Cipher Tool
        </h3>
        <button
          onClick={handleToggleMode}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            isEncrypting
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800'
              : 'bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-200 dark:hover:bg-emerald-800'
          }`}
        >
          {isEncrypting ? <Lock size={16} /> : <Unlock size={16} />}
          <span>{isEncrypting ? 'Encrypt Mode' : 'Decrypt Mode'}</span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {isEncrypting ? 'Plain Text (Input)' : 'Encrypted Text (Input)'}
          </label>
          <textarea
            value={inputText}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder={`Enter text to ${isEncrypting ? 'encrypt' : 'decrypt'}...`}
            className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {isEncrypting ? 'Encrypted Text (Output)' : 'Plain Text (Output)'}
            </label>
            <div className="flex space-x-2">
              <button
                onClick={handleCopy}
                disabled={!outputText}
                className="flex items-center space-x-1 px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors duration-200"
              >
                <Copy size={14} />
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
              <button
                onClick={handleClear}
                className="flex items-center space-x-1 px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors duration-200"
              >
                <RotateCcw size={14} />
                <span>Clear</span>
              </button>
            </div>
          </div>
          <div className="w-full h-32 p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg overflow-auto">
            <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-words">
              {outputText || 'Output will appear here...'}
            </p>
          </div>
        </div>
      </div>

      {inputText && (
        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong>Example transformation:</strong> With shift {shift}, 
            the letter 'A\' becomes '{String.fromCharCode(((0 + (isEncrypting ? shift : -shift) + 26) % 26) + 65)}'
          </p>
        </div>
      )}
    </div>
  );
};

export default CipherTool;