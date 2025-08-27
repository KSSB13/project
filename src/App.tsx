import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import ExplanationSection from './components/ExplanationSection';
import TechniqueSelector from './components/TechniqueSelector';
import ShiftControls from './components/ShiftControls';
import AlphabetWheel from './components/AlphabetWheel';
import TechniqueRenderer from './components/TechniqueRenderer';

function App() {
  const [selectedTechnique, setSelectedTechnique] = useState('caesar');
  const [shift, setShift] = useState(3);
  const [inputText, setInputText] = useState('');
  const [isEncrypting, setIsEncrypting] = useState(true);

  const handleModeToggle = () => {
    setIsEncrypting(!isEncrypting);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 transition-colors duration-300">
        <Header />
        
        <main className="max-w-6xl mx-auto px-4 py-12">
          {/* Technique Selector */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Choose Your Encryption Technique</h2>
            <TechniqueSelector 
              selectedTechnique={selectedTechnique}
              onTechniqueChange={setSelectedTechnique}
            />
          </div>
          
          {/* Technique Explanation */}
          <ExplanationSection technique={selectedTechnique} />
          
          {/* Caesar Cipher specific controls */}
          {selectedTechnique === 'caesar' && (
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <div>
                <ShiftControls shift={shift} onShiftChange={setShift} />
              </div>
              <div>
                <AlphabetWheel shift={shift} />
              </div>
            </div>
          )}
          
          {/* Technique Tool */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <TechniqueRenderer
              technique={selectedTechnique}
              shift={shift}
              inputText={inputText}
              onInputChange={setInputText}
              isEncrypting={isEncrypting}
              onModeToggle={handleModeToggle}
            />
          </div>
        </main>

        <footer className="bg-gray-800 dark:bg-gray-900 text-white py-8 mt-16">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="text-gray-400 dark:text-gray-500">
              Built with React and Tailwind CSS • Multi-technique encryption & decryption tool
            </p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;