import React, { useState } from 'react';

type BruteForceResult = {
  shift: number;
  score: number;
  text: string;
};

type BruteForceProps = {
  ciphertext: string;
};

let dictionary: Set<string> | null = null;
const loadDictionary = async () => {
  if (dictionary) return dictionary;
  try {
    const response = await fetch('/dictionary.txt');
    const text = await response.text();
    dictionary = new Set(text.split('\n').map(word => word.trim().toLowerCase()));
    return dictionary;
  } catch (err) {
    console.error('Failed to load dictionary:', err);
    return new Set();
  }
};

const caesarProcess = (text: string, shift: number) => {
  let output = '';
  for (const char of text) {
      const charCode = char.charCodeAt(0);
      if (char >= 'A' && char <= 'Z') output += String.fromCharCode(((charCode - 65 + shift + 26) % 26) + 65);
      else if (char >= 'a' && char <= 'z') output += String.fromCharCode(((charCode - 97 + shift + 26) % 26) + 97);
      else output += char;
  }
  return output;
};

const BruteForce: React.FC<BruteForceProps> = ({ ciphertext }) => {
  const [results, setResults] = useState<BruteForceResult[] | null>(null);
  const [bestGuess, setBestGuess] = useState<BruteForceResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleBruteForce = async () => {
    if (!ciphertext) return;
    setIsLoading(true);
    setResults(null);
    setBestGuess(null);
    
    const dict = await loadDictionary();
    let topGuess: BruteForceResult = { shift: 0, score: -1, text: '' };
    const allResults: BruteForceResult[] = [];

    for (let shift = 1; shift <= 25; shift++) {
      const decryptedText = caesarProcess(ciphertext, -shift);
      const words = decryptedText.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/);
      const score = words.reduce((acc, word) => acc + (dict.has(word) ? 1 : 0), 0);
      
      allResults.push({ shift, score, text: decryptedText });
      if (score > topGuess.score) {
        topGuess = { shift, score, text: decryptedText };
      }
    }
    
    setBestGuess(topGuess);
    setResults(allResults.sort((a, b) => b.score - a.score));
    setIsLoading(false);
  };

  return (
    <div className="mt-8">
      <button
        onClick={handleBruteForce}
        disabled={isLoading || !ciphertext}
        className="w-full px-6 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? 'Analyzing...' : 'Perform Brute Force Analysis'}
      </button>

      {bestGuess && results && (
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Analysis Complete</h3>
          <div className="bg-green-100 dark:bg-green-900/50 border border-green-300 dark:border-green-700 rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-green-800 dark:text-green-200">Best Guess (Shift: {bestGuess.shift})</h4>
            <p className="text-lg text-green-900 dark:text-green-100 font-mono mt-1 break-all">{bestGuess.text}</p>
          </div>
          <details>
            <summary className="cursor-pointer font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
              Show all 25 possibilities
            </summary>
            <div className="mt-2 space-y-2 pt-2 border-t dark:border-gray-700 max-h-60 overflow-y-auto">
              {results.map(res => (
                <p key={res.shift} className="font-mono text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-semibold text-gray-900 dark:text-white">Shift {res.shift} (Score: {res.score}):</span> {res.text}
                </p>
              ))}
            </div>
          </details>
        </div>
      )}
    </div>
  );
};

export default BruteForce;