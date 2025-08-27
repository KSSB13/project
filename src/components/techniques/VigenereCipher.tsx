import React, { useState, useEffect } from 'react';
import { Copy, RotateCcw, Lock, Unlock, Key } from 'lucide-react';

interface VigenereCipherProps {
  inputText: string;
  onInputChange: (text: string) => void;
  isEncrypting: boolean;
  onModeToggle: () => void;
}

const VigenereCipher: React.FC<VigenereCipherProps> = ({
  inputText,
  onInputChange,
  isEncrypting,
  onModeToggle
}) => {
  const [keyword, setKeyword] = useState('KEY');
  const [outputText, setOutputText] = useState('');
  const [copied, setCopied] = useState(false);

  const vigenereEncrypt = (text: string, key: string): string => {
    if (!key) return text;
    
    const cleanKey = key.toUpperCase().replace(/[^A-Z]/g, '');
    if (!cleanKey) return text;
    
    let result = '';
    let keyIndex = 0;
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      
      if (char.match(/[A-Za-z]/)) {
        const isUpperCase = char === char.toUpperCase();
        const charCode = char.toUpperCase().charCodeAt(0) - 65;
        const keyChar = cleanKey[keyIndex % cleanKey.length].charCodeAt(0) - 65;
        
        const shift = isEncrypting ? keyChar : -keyChar;
        const newCharCode = (charCode + shift + 26) % 26;
        const newChar = String.fromCharCode(newCharCode + 65);
        
        result += isUpperCase ? newChar : newChar.toLowerCase();
        keyIndex++;
      } else {
        result += char;
      }
    }
    
    return result;
  };

  useEffect(() => {
    if (inputText && keyword) {
      const result = vigenereEncrypt(inputText, keyword);
      setOutputText(result);
    } else {
      setOutputText('');
    }
  }, [inputText, keyword, isEncrypting]);

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

  return (
    <div className="space-y-6">
      {/* Keyword Input */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4">
        <div className="flex items-center mb-3">
          <Key className="text-purple-600 mr-2" size={20} />
          <h4 className="text-lg font-semibold text-gray-800">Encryption Key</h4>
        </div>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value.replace(/[^A-Za-z]/g, ''))}
          placeholder="Enter keyword (letters only)"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        <p className="text-sm text-gray-600 mt-2">
          The keyword will be repeated to match the length of your text. Only letters are used.
        </p>
      </div>

      {/* Mode Toggle */}
      <div className="flex justify-center">
        <button
          onClick={onModeToggle}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
            isEncrypting
              ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
              : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
          }`}
        >
          {isEncrypting ? <Lock size={20} /> : <Unlock size={20} />}
          <span>{isEncrypting ? 'Encrypt Mode' : 'Decrypt Mode'}</span>
        </button>
      </div>

      {/* Input/Output */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {isEncrypting ? 'Plain Text (Input)' : 'Encrypted Text (Input)'}
          </label>
          <textarea
            value={inputText}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder={`Enter text to ${isEncrypting ? 'encrypt' : 'decrypt'}...`}
            className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              {isEncrypting ? 'Encrypted Text (Output)' : 'Plain Text (Output)'}
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

      {/* Example */}
      {inputText && keyword && (
        <div className="mt-4 p-4 bg-purple-50 rounded-lg">
          <p className="text-sm text-gray-600">
            <strong>How it works:</strong> Each letter is shifted by the corresponding letter in the keyword "{keyword}". 
            The keyword repeats to match your text length.
          </p>
        </div>
      )}
    </div>
  );
};

export default VigenereCipher;