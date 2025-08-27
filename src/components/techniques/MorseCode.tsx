import React, { useState, useEffect } from 'react';
import { Copy, RotateCcw, Radio, Volume2 } from 'lucide-react';

interface MorseCodeProps {
  inputText: string;
  onInputChange: (text: string) => void;
  isEncrypting: boolean;
  onModeToggle: () => void;
}

const MORSE_CODE_MAP: { [key: string]: string } = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
  '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
  '8': '---..', '9': '----.', ' ': '/'
};

const REVERSE_MORSE_MAP = Object.fromEntries(
  Object.entries(MORSE_CODE_MAP).map(([key, value]) => [value, key])
);

const MorseCode: React.FC<MorseCodeProps> = ({
  inputText,
  onInputChange,
  isEncrypting,
  onModeToggle
}) => {
  const [outputText, setOutputText] = useState('');
  const [copied, setCopied] = useState(false);

  const textToMorse = (text: string): string => {
    return text
      .toUpperCase()
      .split('')
      .map(char => MORSE_CODE_MAP[char] || char)
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const morseToText = (morse: string): string => {
    return morse
      .split(' ')
      .map(code => REVERSE_MORSE_MAP[code] || code)
      .join('')
      .replace(/\//g, ' ');
  };

  useEffect(() => {
    if (inputText) {
      const result = isEncrypting ? textToMorse(inputText) : morseToText(inputText);
      setOutputText(result);
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
  };

  const playMorse = () => {
    if (!outputText || !isEncrypting) return;
    
    // Simple audio feedback for morse code
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    let time = audioContext.currentTime;
    
    outputText.split('').forEach(char => {
      if (char === '.') {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.frequency.value = 600;
        oscillator.start(time);
        gainNode.gain.setValueAtTime(0.3, time);
        gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.1);
        oscillator.stop(time + 0.1);
        time += 0.15;
      } else if (char === '-') {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.frequency.value = 600;
        oscillator.start(time);
        gainNode.gain.setValueAtTime(0.3, time);
        gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.3);
        oscillator.stop(time + 0.3);
        time += 0.35;
      } else if (char === ' ') {
        time += 0.2;
      } else if (char === '/') {
        time += 0.4;
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Morse Code Reference */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4">
        <div className="flex items-center mb-3">
          <Radio className="text-green-600 mr-2" size={20} />
          <h4 className="text-lg font-semibold text-gray-800">Morse Code Reference</h4>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 text-sm">
          {Object.entries(MORSE_CODE_MAP).slice(0, 26).map(([letter, morse]) => (
            <div key={letter} className="flex justify-between bg-white rounded px-2 py-1">
              <span className="font-medium">{letter}</span>
              <span className="font-mono text-green-600">{morse}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mode Toggle */}
      <div className="flex justify-center">
        <button
          onClick={onModeToggle}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
            isEncrypting
              ? 'bg-green-100 text-green-800 hover:bg-green-200'
              : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
          }`}
        >
          <Radio size={20} />
          <span>{isEncrypting ? 'Text to Morse' : 'Morse to Text'}</span>
        </button>
      </div>

      {/* Input/Output */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {isEncrypting ? 'Text Input' : 'Morse Code Input'}
          </label>
          <textarea
            value={inputText}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder={isEncrypting ? 'Enter text to convert...' : 'Enter morse code (use spaces between letters, / for word breaks)...'}
            className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700">
              {isEncrypting ? 'Morse Code Output' : 'Text Output'}
            </label>
            <div className="flex space-x-2">
              {isEncrypting && outputText && (
                <button
                  onClick={playMorse}
                  className="flex items-center space-x-1 px-3 py-1 text-sm bg-green-100 hover:bg-green-200 rounded-md transition-colors duration-200"
                >
                  <Volume2 size={14} />
                  <span>Play</span>
                </button>
              )}
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
            <p className={`text-gray-800 whitespace-pre-wrap break-words ${isEncrypting ? 'font-mono' : ''}`}>
              {outputText || 'Output will appear here...'}
            </p>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 bg-green-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>Tips:</strong> Use dots (.) and dashes (-) for morse code. 
          Spaces separate letters, and forward slashes (/) represent word breaks.
          {isEncrypting && outputText && ' Click "Play" to hear the morse code!'}
        </p>
      </div>
    </div>
  );
};

export default MorseCode;