import React, { useState, useMemo } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import ExplanationSection from './components/ExplanationSection';
import TechniqueSelector from './components/TechniqueSelector';
import ShiftControls from './components/ShiftControls';
import AlphabetWheel from './components/AlphabetWheel';
import FrequencyAnalysis from './components/FrequencyAnalysis';
import BruteForce from './components/BruteForce';
import TechniqueRenderer from './components/TechniqueRenderer';

// --- VERIFIED Core Cipher Logic ---
const caesarProcess = (text: string, shift: number): string => {
  let output = '';
  for (const char of text) {
    const charCode = char.charCodeAt(0);
    if (char >= 'A' && char <= 'Z') output += String.fromCharCode(((charCode - 65 + shift + 26) % 26) + 65);
    else if (char >= 'a' && char <= 'z') output += String.fromCharCode(((charCode - 97 + shift + 26) % 26) + 97);
    else output += char;
  }
  return output;
};

const atbashProcess = (text: string): string => {
  let output = '';
  for (const char of text) {
    const charCode = char.charCodeAt(0);
    if (char >= 'A' && char <= 'Z') output += String.fromCharCode(90 - (charCode - 65));
    else if (char >= 'a' && char <= 'z') output += String.fromCharCode(122 - (charCode - 97));
    else output += char;
  }
  return output;
};

const vigenereProcess = (text: string, keyword: string, mode: 'encrypt' | 'decrypt'): string => {
  let output = '';
  const cleanKeyword = keyword.toUpperCase().replace(/[^A-Z]/g, '');
  if (!cleanKeyword) return text;
  let keywordIndex = 0;
  for (const char of text) {
    const charCode = char.charCodeAt(0);
    const shift = cleanKeyword.charCodeAt(keywordIndex % cleanKeyword.length) - 65;
    const finalShift = mode === 'encrypt' ? shift : -shift;
    if (char >= 'A' && char <= 'Z') {
        output += String.fromCharCode(((charCode - 65 + finalShift + 26) % 26) + 65);
        keywordIndex++;
    } else if (char >= 'a' && char <= 'z') {
        output += String.fromCharCode(((charCode - 97 + finalShift + 26) % 26) + 97);
        keywordIndex++;
    } else {
        output += char;
    }
  }
  return output;
};

const rot13Process = (text: string): string => caesarProcess(text, 13);

const base64Process = (text: string, toBase64: boolean): string => {
  if (typeof window === 'undefined') return '';
  try {
    if (toBase64) return btoa(unescape(encodeURIComponent(text)));
    return decodeURIComponent(escape(atob(text)));
  } catch (e) {
    return "Invalid Base64 string";
  }
};

const MORSE_CODE_MAP: { [key: string]: string } = { 'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.', ' ': '/' };
const REVERSE_MORSE_MAP = Object.fromEntries(Object.entries(MORSE_CODE_MAP).map(([key, value]) => [value, key]));

const morseProcess = (text: string, toMorse: boolean): string => {
  if (toMorse) {
    return text.toUpperCase().split('').map(char => MORSE_CODE_MAP[char] || '').join(' ').replace(/\s+/g, ' ').trim();
  } else {
    return text.split(' ').map(code => REVERSE_MORSE_MAP[code] || '').join('').replace(/\//g, ' ');
  }
};

function App() {
  const [selectedTechnique, setSelectedTechnique] = useState('caesar');
  const [shift, setShift] = useState(3);
  const [inputText, setInputText] = useState('');
  const [vigenereKeyword, setVigenereKeyword] = useState('LEMON');
  const [isEncrypting, setIsEncrypting] = useState(true);

  const outputText = useMemo(() => {
    const mode = isEncrypting ? 'encrypt' : 'decrypt';
    switch (selectedTechnique) {
      case 'caesar': return caesarProcess(inputText, isEncrypting ? shift : -shift);
      case 'atbash': return atbashProcess(inputText);
      case 'vigenere': return vigenereProcess(inputText, vigenereKeyword, mode);
      case 'rot13': return rot13Process(inputText);
      case 'base64': return base64Process(inputText, isEncrypting);
      case 'morse': return morseProcess(inputText, isEncrypting);
      default: return '';
    }
  }, [inputText, selectedTechnique, shift, vigenereKeyword, isEncrypting]);

  // CRITICAL FIX: This function now correctly handles mode toggling.
  const handleModeToggle = () => {
    setIsEncrypting(prev => !prev); // 1. Flip the mode
    setInputText(outputText);        // 2. Swap the text
  };

  const sharedProps = {
    inputText,
    onInputChange: setInputText,
    outputText,
    isEncrypting,
    onModeToggle: handleModeToggle,
    shift,
    vigenereKeyword,
    onVigenereKeywordChange: setVigenereKeyword,
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-12">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Choose Your Encryption Technique</h2>
            <TechniqueSelector 
              selectedTechnique={selectedTechnique}
              onTechniqueChange={(tech) => { setInputText(''); setIsEncrypting(true); setSelectedTechnique(tech); }}
            />
          </div>
          
          <ExplanationSection technique={selectedTechnique} />
          
          {selectedTechnique === 'caesar' && (
            <div className="grid lg:grid-cols-2 gap-8 my-12">
              <ShiftControls shift={shift} onShiftChange={setShift} />
              <AlphabetWheel shift={shift} />
            </div>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-12">
            <div className="lg:col-span-3">
              <TechniqueRenderer {...sharedProps} technique={selectedTechnique} />
            </div>
            <div className="lg:col-span-2">
                <FrequencyAnalysis text={inputText} />
            </div>
          </div>
          
          {/* CRITICAL FIX: This now correctly renders when in decrypt mode */}
          {selectedTechnique === 'caesar' && !isEncrypting && (
            <BruteForce ciphertext={inputText} />
          )}

        </main>
        
        {/* NEW: Floating Portfolio Link */}
        <div className="portfolio-link">
          Made By <a href="https://portfolio.kssb.space" target="_blank" rel="noopener noreferrer">KSSB</a>
        </div>

        <footer className="bg-gray-800 text-white py-8 mt-16">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="text-gray-400">&copy; {new Date().getFullYear()} • A Modern Cryptography Toolkit</p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;