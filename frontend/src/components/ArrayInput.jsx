import { useState, useCallback } from 'react';

export default function ArrayInput({ isSearch, onVisualize, onRandomize }) {
  const [inputValue, setInputValue] = useState('5, 3, 8, 1, 9, 2, 7, 4, 6');
  const [targetValue, setTargetValue] = useState('5');
  const [error, setError] = useState('');

  const parseArray = useCallback((str) => {
    if (!str.trim()) return [];
    return str.split(',')
      .map(s => s.trim())
      .filter(s => s !== '')
      .map(s => {
        const num = Number(s);
        if (num > 100) throw new Error(`"${s}" max value is 100 for visual clarity`);
        if (isNaN(num)) throw new Error(`"${s}" is not a valid number`);
        return num;
      });
  }, []);

  const handleVisualize = () => {
    setError('');
    try {
      const arr = parseArray(inputValue);

      if (arr.length < 2) {
        setError('Please enter at least 2 elements');
        return;
      }

      if (arr.length > 20) {
        setError('Maximum 20 elements allowed for visual clarity');
        return;
      }

      onVisualize(arr, isSearch ? targetValue.trim() : null);
    } catch (e) {
      setError(e.message);
    }
  };

  const handleRandomize = () => {
    setError('');
    const len = Math.floor(Math.random() * 6) + 5; 
    const arr = Array.from({ length: len }, () => Math.floor(Math.random() * 50) + 1);
    setInputValue(arr.join(', '));
    onRandomize(arr);
  };

  return (
    <div className="card space-y-3">
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Array Input</h3>

      <div>
        <label htmlFor="array-input" className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
          Enter numbers separated by commas
        </label>
        <input
          id="array-input"
          type="text"
          value={inputValue}
          onChange={(e) => { setInputValue(e.target.value); setError(''); }}
          placeholder="e.g. 5, 3, 8, 1, 9"
          className="input-field text-sm font-mono"
          aria-label="Array input"
        />
      </div>

      {isSearch && (
        <div>
          <label htmlFor="target-input" className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
            Target value to search
          </label>
          <input
            id="target-input"
            type="text"
            value={targetValue}
            onChange={(e) => setTargetValue(e.target.value)}
            placeholder="e.g. 5"
            className="input-field text-sm font-mono"
            aria-label="Target value"
          />
        </div>
      )}

      {error && (
        <p className="text-sm text-red-500 dark:text-red-400 font-medium" role="alert">
          {error}
        </p>
      )}

      <div className="flex gap-2">
        <button onClick={handleVisualize} className="btn-primary flex-1">
          Visualize
        </button>
        <button onClick={handleRandomize} className="btn-secondary">
          Random
        </button>
      </div>
    </div>
  );
}
