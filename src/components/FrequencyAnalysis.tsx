import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '../contexts/ThemeContext';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

type FrequencyAnalysisProps = {
  text: string;
};

const FrequencyAnalysis: React.FC<FrequencyAnalysisProps> = ({ text }) => {
  const { isDarkMode } = useTheme();

  const data = useMemo(() => {
    const counts = ALPHABET.reduce((acc, letter) => ({ ...acc, [letter]: 0 }), {} as Record<string, number>);
    let totalLetters = 0;

    for (const char of text.toUpperCase()) {
      if (ALPHABET.includes(char)) {
        counts[char]++;
        totalLetters++;
      }
    }

    if (totalLetters === 0) {
      return ALPHABET.map(letter => ({ name: letter, frequency: 0 }));
    }

    return ALPHABET.map(letter => ({
      name: letter,
      frequency: (counts[letter] / totalLetters) * 100,
    }));
  }, [text]);

  return (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 h-full flex flex-col">
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
        Letter Frequency Analysis
      </h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <XAxis dataKey="name" stroke={isDarkMode ? "#6b7280" : "#9ca3af"} tick={{ fontSize: 12 }} />
            <YAxis stroke={isDarkMode ? "#6b7280" : "#9ca3af"} tickFormatter={(tick) => `${tick.toFixed(0)}%`} />
            <Tooltip
              cursor={{ fill: 'rgba(150, 150, 150, 0.1)' }}
              contentStyle={{
                backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                borderColor: isDarkMode ? '#374151' : '#e5e7eb',
                borderRadius: '0.5rem',
                color: isDarkMode ? '#e5e7eb' : '#1f2937'
              }}
              formatter={(value: number) => [`${value.toFixed(2)}%`, 'Frequency']}
            />
            <Bar dataKey="frequency" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FrequencyAnalysis;