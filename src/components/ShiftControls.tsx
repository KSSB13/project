import React from 'react';
import { RotateCw, Minus, Plus } from 'lucide-react';

interface ShiftControlsProps {
  shift: number;
  onShiftChange: (shift: number) => void;
}

const ShiftControls: React.FC<ShiftControlsProps> = ({ shift, onShiftChange }) => {
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onShiftChange(parseInt(e.target.value));
  };

  const incrementShift = () => {
    if (shift < 25) onShiftChange(shift + 1);
  };

  const decrementShift = () => {
    if (shift > 1) onShiftChange(shift - 1);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-center justify-center mb-4">
        <RotateCw className="text-orange-500 mr-2" size={24} />
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Shift Control</h3>
      </div>
      
      <div className="space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center bg-orange-100 dark:bg-orange-900 rounded-full px-6 py-3">
            <span className="text-2xl font-bold text-orange-800 dark:text-orange-200">
              Shift: {shift}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={decrementShift}
            disabled={shift <= 1}
            className="w-10 h-10 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-colors duration-200"
          >
            <Minus size={16} />
          </button>
          
          <div className="flex-1 relative">
            <input
              type="range"
              min="1"
              max="25"
              value={shift}
              onChange={handleSliderChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #f97316 0%, #f97316 ${((shift - 1) / 24) * 100}%, #e5e7eb ${((shift - 1) / 24) * 100}%, #e5e7eb 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>1</span>
              <span>13</span>
              <span>25</span>
            </div>
          </div>
          
          <button
            onClick={incrementShift}
            disabled={shift >= 25}
            className="w-10 h-10 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-colors duration-200"
          >
            <Plus size={16} />
          </button>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {[3, 7, 11, 13, 17, 19, 23].map((commonShift) => (
            <button
              key={commonShift}
              onClick={() => onShiftChange(commonShift)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                shift === commonShift
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {commonShift}
            </button>
          ))}
        </div>
        
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Popular shift values: Caesar used 3, ROT13 uses 13
        </p>
      </div>
    </div>
  );
};

export default ShiftControls;