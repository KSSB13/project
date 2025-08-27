import React from 'react';
import { Shield, Key, RotateCcw, Radio, Binary, RefreshCw, BookOpen, History, Lightbulb } from 'lucide-react';

interface ExplanationSectionProps {
  technique: string;
}

const ExplanationSection: React.FC<ExplanationSectionProps> = ({ technique }) => {
  const getExplanationContent = () => {
    switch (technique) {
      case 'caesar':
        return {
          title: 'Caesar Cipher',
          icon: Shield,
          description: 'A substitution cipher where each letter is shifted by a fixed number of positions in the alphabet.',
          history: 'Named after Julius Caesar, who used it with a shift of 3 to protect military communications around 50 BC. It\'s one of the earliest known encryption techniques.',
          howItWorks: [
            'Choose a shift value (1-25)',
            'Replace each letter with the letter that many positions ahead in the alphabet',
            'Wrap around to the beginning when reaching Z',
            'Non-alphabetic characters remain unchanged'
          ],
          example: 'With shift 3: "HELLO" becomes "KHOOR"',
          strength: 'Very weak - only 25 possible keys, easily broken by frequency analysis',
          color: 'blue'
        };

      case 'vigenere':
        return {
          title: 'Vigenère Cipher',
          icon: Key,
          description: 'A polyalphabetic substitution cipher using a repeating keyword to determine shift values.',
          history: 'Described by Giovan Battista Bellaso in 1553, later misattributed to Blaise de Vigenère. Called "le chiffre indéchiffrable" (the indecipherable cipher) for 300 years.',
          howItWorks: [
            'Choose a keyword (e.g., "KEY")',
            'Repeat the keyword to match your text length',
            'Each letter is shifted by the corresponding keyword letter value',
            'A=0, B=1, C=2, etc. for shift amounts'
          ],
          example: 'Keyword "KEY" with "HELLO": H+K=R, E+E=I, L+Y=J, L+K=V, O+E=S → "RIJVS"',
          strength: 'Much stronger than Caesar - resists frequency analysis, but vulnerable to Kasiski examination',
          color: 'purple'
        };

      case 'atbash':
        return {
          title: 'Atbash Cipher',
          icon: RotateCcw,
          description: 'A simple substitution cipher where the alphabet is reversed: A↔Z, B↔Y, C↔X, etc.',
          history: 'Originally used for the Hebrew alphabet around 500-600 BC. The name comes from the first, last, second, and second-to-last Hebrew letters.',
          howItWorks: [
            'Map each letter to its opposite in the alphabet',
            'A becomes Z, B becomes Y, and so on',
            'The transformation is its own inverse',
            'Apply the same process to both encrypt and decrypt'
          ],
          example: '"HELLO" becomes "SVOOL" (H→S, E→V, L→O, L→O, O→L)',
          strength: 'Very weak - only one possible key, easily recognizable pattern',
          color: 'orange'
        };

      case 'morse':
        return {
          title: 'Morse Code',
          icon: Radio,
          description: 'A method of encoding text using sequences of dots and dashes to represent letters and numbers.',
          history: 'Developed by Samuel Morse and Alfred Vail in the 1830s for telegraph communication. Revolutionized long-distance communication.',
          howItWorks: [
            'Each letter/number has a unique dot-dash pattern',
            'Dots are short signals, dashes are long signals',
            'Letters are separated by spaces',
            'Words are separated by forward slashes (/)'
          ],
          example: '"HELLO" becomes ".... . .-.. .-.. ---"',
          strength: 'Not encryption but encoding - easily decoded with a reference table',
          color: 'green'
        };

      case 'base64':
        return {
          title: 'Base64 Encoding',
          icon: Binary,
          description: 'A binary-to-text encoding scheme that represents binary data using 64 ASCII characters.',
          history: 'Developed in the 1980s for encoding binary data in systems that only handle text. Widely used in email (MIME) and web technologies.',
          howItWorks: [
            'Convert text to binary representation',
            'Group binary digits into 6-bit chunks',
            'Map each chunk to one of 64 characters (A-Z, a-z, 0-9, +, /)',
            'Add padding with = characters if needed'
          ],
          example: '"HELLO" becomes "SEVMTE8=" (increases size by ~33%)',
          strength: 'Not encryption but encoding - easily reversible, provides no security',
          color: 'indigo'
        };

      case 'rot13':
        return {
          title: 'ROT13 Cipher',
          icon: RefreshCw,
          description: 'A special case of Caesar cipher with a fixed shift of 13 positions.',
          history: 'Became popular in early internet forums and Usenet in the 1980s for hiding spoilers and potentially offensive content.',
          howItWorks: [
            'Shift every letter by exactly 13 positions',
            'A becomes N, B becomes O, etc.',
            'The cipher is its own inverse (applying twice returns original)',
            'Only affects letters, numbers and symbols unchanged'
          ],
          example: '"HELLO" becomes "URYYB" - applying ROT13 again gives "HELLO"',
          strength: 'Very weak - trivially broken, used only for obfuscation, not security',
          color: 'cyan'
        };

      default:
        return null;
    }
  };

  const content = getExplanationContent();
  if (!content) return null;

  const IconComponent = content.icon;
  const colorClasses = {
    blue: 'from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 border-blue-200 dark:border-blue-700 text-blue-800 dark:text-blue-200',
    purple: 'from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 border-purple-200 dark:border-purple-700 text-purple-800 dark:text-purple-200',
    orange: 'from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800 border-orange-200 dark:border-orange-700 text-orange-800 dark:text-orange-200',
    green: 'from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 border-green-200 dark:border-green-700 text-green-800 dark:text-green-200',
    indigo: 'from-indigo-50 to-indigo-100 dark:from-indigo-900 dark:to-indigo-800 border-indigo-200 dark:border-indigo-700 text-indigo-800 dark:text-indigo-200',
    cyan: 'from-cyan-50 to-cyan-100 dark:from-cyan-900 dark:to-cyan-800 border-cyan-200 dark:border-cyan-700 text-cyan-800 dark:text-cyan-200'
  };

  return (
    <div className={`bg-gradient-to-r ${colorClasses[content.color as keyof typeof colorClasses]} border rounded-xl p-6 mb-8`}>
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-white bg-opacity-50 dark:bg-black dark:bg-opacity-30 rounded-full flex items-center justify-center mr-4">
          <IconComponent size={24} />
        </div>
        <div>
          <h3 className="text-2xl font-bold">{content.title}</h3>
          <p className="text-lg opacity-90">{content.description}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-white bg-opacity-30 dark:bg-black dark:bg-opacity-20 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <History size={18} className="mr-2" />
              <h4 className="font-semibold">Historical Background</h4>
            </div>
            <p className="text-sm opacity-90">{content.history}</p>
          </div>

          <div className="bg-white bg-opacity-30 dark:bg-black dark:bg-opacity-20 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Lightbulb size={18} className="mr-2" />
              <h4 className="font-semibold">Example</h4>
            </div>
            <p className="text-sm opacity-90 font-mono">{content.example}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white bg-opacity-30 dark:bg-black dark:bg-opacity-20 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <BookOpen size={18} className="mr-2" />
              <h4 className="font-semibold">How It Works</h4>
            </div>
            <ol className="text-sm opacity-90 space-y-1">
              {content.howItWorks.map((step, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-5 h-5 bg-white bg-opacity-50 dark:bg-black dark:bg-opacity-30 rounded-full text-xs flex items-center justify-center mr-2 mt-0.5 font-medium">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div className="bg-white bg-opacity-30 dark:bg-black dark:bg-opacity-20 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Shield size={18} className="mr-2" />
              <h4 className="font-semibold">Security Strength</h4>
            </div>
            <p className="text-sm opacity-90">{content.strength}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplanationSection;