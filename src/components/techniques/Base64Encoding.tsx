import React, { useState, useEffect } from 'react';
import { Copy, RotateCcw, Binary, Lock, Unlock } from 'lucide-react';

interface Base64EncodingProps {
  inputText: string;
  onInputChange: (text: string) => void;
  isEncrypting: boolean;
  onModeToggle: () => void;
}

const Base64Encoding: React.FC<Base64EncodingProps> = ({
  inputText,
  onInputChange,
  isEncrypting,
  onModeToggle
}) => {
  const [outputText, setOutputText] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const base64Encode = (text: string): string => {
    try {
      return btoa(unescape(encodeURIComponent(text)));
    } catch (e) {
      throw new Error('Failed to encode text');
    }
  };

  const base64Decode = (encoded: string): string => {
    try {
      return decodeURIComponent(escape(atob(encoded)));
    } catch (e) {
      throw new Error('Invalid Base64 string');
    }
  };

  useEffect(() => {
    setError('');
    if (inputText) {
      try {
        const result = isEncrypting ? base64Encode(inputText) : base64Decode(inputText);
        setOutputText(result);
      } catch (e) {
        setError((e as Error).message);
        setOutputText('');
      }
    } else {
      setOutputText('');
    }
  }, [inputText, isEncrypting]);

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
    setError('');
  };

  return (
    <div className="space-y-6">
      {/* Base64 Info */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4">
        <div className="flex items-center mb-3">
          <Binary className="text-indigo-600 mr-2" size={20} />
          <h4 className="text-lg font-semibold text-gray-800">Base64 Encoding</h4>
        </div>
        <p className="text-sm text-gray-600">
          Base64 is a binary-to-text encoding scheme that represents binary data in ASCII format. 
          It's commonly used for encoding data in email, URLs, and web applications.
        </p>
      </div>

      {/* Mode Toggle */}
      <div className="flex justify-center">
        <button
          onClick={onModeToggle}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
            isEncrypting
              ? 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200'
              : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
          }`}
        >
          {isEncrypting ? <Lock size={20} /> : <Unlock size={20} />}
          <span>{isEncrypting ? 'Encode Mode' : 'Decode Mode'}</span>
        </button>
      </div>

      {/* Input/Output */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {isEncrypting ? 'Plain Text (Input)' : 'Base64 Encoded (Input)'}
          </label>
          <textarea
            value={inputText}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder={isEncrypting ? 'Enter text to encode...' : 'Enter Base64 string to decode...'}
            className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              {isEncrypting ? 'Base64 Encoded (Output)' : 'Plain Text (Output)'}
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
            {error ? (
              <p className="text-red-600 text-sm">{error}</p>
            ) : (
              <p className="text-gray-800 whitespace-pre-wrap break-all font-mono text-sm">
                {outputText || 'Output will appear here...'}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Character Count */}
      {inputText && (
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
          <div className="bg-gray-50 rounded-lg p-3">
            <span className="font-medium">Input length:</span> {inputText.length} characters
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <span className="font-medium">Output length:</span> {outputText.length} characters
          </div>
        </div>
      )}

      {/* Info */}
      <div className="p-4 bg-indigo-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>Note:</strong> Base64 encoding increases the size of data by approximately 33%. 
          It uses A-Z, a-z, 0-9, +, and / characters, with = for padding.
        </p>
      </div>
    </div>
  );
};

export default Base64Encoding;