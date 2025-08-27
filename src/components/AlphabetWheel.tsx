import React from 'react';

interface AlphabetWheelProps {
  shift: number;
}

const AlphabetWheel: React.FC<AlphabetWheelProps> = ({ shift }) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
  const getShiftedLetter = (letter: string, shiftValue: number) => {
    const index = alphabet.indexOf(letter);
    const shiftedIndex = (index + shiftValue) % 26;
    return alphabet[shiftedIndex];
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">
        Alphabet Shift Visualization (Shift: {shift})
      </h3>
      
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Original Alphabet</p>
          <div className="flex flex-wrap justify-center gap-1">
            {alphabet.split('').map((letter, index) => (
              <div
                key={`original-${index}`}
                className="w-8 h-8 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-md flex items-center justify-center text-sm font-medium"
              >
                {letter}
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <div className="w-8 h-8 bg-orange-500 dark:bg-orange-600 text-white rounded-full flex items-center justify-center">
              ↓
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Shifted Alphabet (Encrypted)</p>
          <div className="flex flex-wrap justify-center gap-1">
            {alphabet.split('').map((letter, index) => (
              <div
                key={`shifted-${index}`}
                className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 rounded-md flex items-center justify-center text-sm font-medium transition-all duration-300"
              >
                {getShiftedLetter(letter, shift)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlphabetWheel;