import React, { useState, useEffect } from 'react';
import { Copy, RotateCcw, RefreshCw } from 'lucide-react';

interface ROT13CipherProps {
  inputText: string;
  onInputChange: (text: string) => void;
}

const ROT13Cipher: React.FC<ROT13CipherProps> = ({ inputText, onInputChange }) => {
  const [outputText, setOutputText] = useState('');
  const [copied, setCopied] = useState(false);

  const rot13Transform = (text: string): string => {
    return text
      .split('')
      .map(char => {
        if (char.match(/[A-Za-z]/)) {
          const isUpperCase = char === char.toUpperCase();
          const baseCode = isUpperCase ? 65 : 97;
          const charCode = char.charCodeAt(0);
          const shifted = ((charCode - baseCode + 13) % 26) + baseCode;
          return String.fromCharCode(shifted);
        }
        return char;
      })
      .join('');
  };

  useEffect(() => {
    if (inputText) {
      const result = rot13Transform(inputText);
      setOutputText(result);
    } else {
      setOutputText('');
    }
  }, [inputText]);

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

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const rot13Alphabet = 'NOPQRSTUVWXYZABCDEFGHIJKLM';

  return (
    <div className="space-y-6">
      {/* ROT13 Visualization */}
      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-4">
        <div className="flex items-center mb-3">
          <RefreshCw className="text-cyan-600 mr-2" size={20} />
          <h4 className="text-lg font-semibold text-gray-800">ROT13 Alphabet Shift</h4>
        </div>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-600 mb-1">Original Alphabet:</p>
            <div className="flex flex-wrap gap-1">
              {alphabet.split('').map((letter, index) => (
                <div
                  key={`orig-${index}`}
                  className="w-8 h-8 bg-blue-100 text-blue-800 rounded flex items-center justify-center text-sm font-medium"
                >
                  {letter}
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-8 h-8 bg-cyan-500 text-white rounded-full flex items-center justify-center">
              ↻
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">ROT13 (Shift +13):</p>
            <div className="flex flex-wrap gap-1">
              {rot13Alphabet.split('').map((letter, index) => (
                <div
                  key={`rot13-${index}`}
                  className="w-8 h-8 bg-cyan-100 text-cyan-800 rounded flex items-center justify-center text-sm font-medium"
                >
                  {letter}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Input/Output */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Input Text
          </label>
          <textarea
            value={inputText}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder="Enter text to transform with ROT13..."
            className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              ROT13 Output
            </label>
            <div className="flex space-x-2">
              <button
                onClick={handleCopy}
                disabled={!outputText}
                className="flex items-center space-x-1 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors duration-200"
              >
                <Copy size={14} />
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
              <button
                onClick={handleClear}
                className="flex items-center space-x-1 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200"
              >
                <RotateCcw size={14} />
                <span>Clear</span>
              </button>
            </div>
          </div>
          <div className="w-full h-32 p-3 bg-gray-50 border border-gray-200 rounded-lg overflow-auto">
            <p className="text-gray-800 whitespace-pre-wrap break-words">
              {outputText || 'Output will appear here...'}
            </p>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 bg-cyan-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>ROT13 Facts:</strong> ROT13 is its own inverse - applying it twice returns the original text. 
          It's commonly used in online forums to hide spoilers or potentially offensive content.
        </p>
      </div>
    </div>
  );
};

export default ROT13Cipher;