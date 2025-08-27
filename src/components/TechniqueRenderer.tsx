import React from 'react';
import CipherTool from './CipherTool';
import VigenereCipher from './techniques/VigenereCipher';
import AtbashCipher from './techniques/AtbashCipher';
import MorseCode from './techniques/MorseCode';
import Base64Encoding from './techniques/Base64Encoding';
import ROT13Cipher from './techniques/ROT13Cipher';

interface TechniqueRendererProps {
  technique: string;
  shift: number;
  inputText: string;
  onInputChange: (text: string) => void;
  isEncrypting: boolean;
  onModeToggle: () => void;
}

const TechniqueRenderer: React.FC<TechniqueRendererProps> = ({
  technique,
  shift,
  inputText,
  onInputChange,
  isEncrypting,
  onModeToggle
}) => {
  switch (technique) {
    case 'caesar':
      return (
        <CipherTool 
          shift={shift} 
          inputText={inputText}
          onInputChange={onInputChange}
          isEncrypting={isEncrypting}
          onModeToggle={onModeToggle}
        />
      );
    case 'vigenere':
      return (
        <VigenereCipher
          inputText={inputText}
          onInputChange={onInputChange}
          isEncrypting={isEncrypting}
          onModeToggle={onModeToggle}
        />
      );
    case 'atbash':
      return (
        <AtbashCipher
          inputText={inputText}
          onInputChange={onInputChange}
        />
      );
    case 'morse':
      return (
        <MorseCode
          inputText={inputText}
          onInputChange={onInputChange}
          isEncrypting={isEncrypting}
          onModeToggle={onModeToggle}
        />
      );
    case 'base64':
      return (
        <Base64Encoding
          inputText={inputText}
          onInputChange={onInputChange}
          isEncrypting={isEncrypting}
          onModeToggle={onModeToggle}
        />
      );
    case 'rot13':
      return (
        <ROT13Cipher
          inputText={inputText}
          onInputChange={onInputChange}
        />
      );
    default:
      return <div>Technique not found</div>;
  }
};

export default TechniqueRenderer;