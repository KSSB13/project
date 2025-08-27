export interface EncryptionTechnique {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'classical' | 'modern' | 'hash';
}

export const ENCRYPTION_TECHNIQUES: EncryptionTechnique[] = [
  {
    id: 'caesar',
    name: 'Caesar Cipher',
    description: 'Classic substitution cipher with alphabet shifting',
    icon: 'Shield',
    category: 'classical'
  },
  {
    id: 'vigenere',
    name: 'Vigenère Cipher',
    description: 'Polyalphabetic substitution using a keyword',
    icon: 'Key',
    category: 'classical'
  },
  {
    id: 'atbash',
    name: 'Atbash Cipher',
    description: 'Simple substitution where A=Z, B=Y, etc.',
    icon: 'RotateCcw',
    category: 'classical'
  },
  {
    id: 'morse',
    name: 'Morse Code',
    description: 'Encode text using dots and dashes',
    icon: 'Radio',
    category: 'classical'
  },
  {
    id: 'base64',
    name: 'Base64 Encoding',
    description: 'Binary-to-text encoding scheme',
    icon: 'Binary',
    category: 'modern'
  },
  {
    id: 'rot13',
    name: 'ROT13',
    description: 'Caesar cipher with fixed shift of 13',
    icon: 'RefreshCw',
    category: 'classical'
  }
];