import { useMemo } from 'react';

const COLORS = {
  default: 'bg-gray-300 dark:bg-gray-600',
  comparing: 'bg-yellow-400 dark:bg-yellow-500',
  swapping: 'bg-red-500 dark:bg-red-400',
  sorted: 'bg-green-500 dark:bg-green-400',
  found: 'bg-green-500 dark:bg-green-400',
  notFound: 'bg-red-500 dark:bg-red-400',
};


function getBarColor(index, highlights, isSearch, isSearchComplete, isSorted, isNotFound) {
  if (isSorted || isSearchComplete) return COLORS.sorted;
  if (isNotFound) return COLORS.notFound;

  if (!highlights || highlights.length === 0) return COLORS.default;

  if (highlights.length === 2) {
    return COLORS.comparing;
  }

  if (highlights.includes(index)) {
    if (isSearch) return COLORS.comparing;
    return COLORS.comparing;
  }

  return COLORS.default;
}

export default function BarChart({ array, highlights, isSearch, isSearchComplete, isSorted, isNotFound }) {
  const maxVal = useMemo(() => Math.max(...array, 1), [array]);
  const n = array.length;

  const barGap = Math.max(2, Math.min(4, 40 / n));
  const barWidth = Math.max(20, Math.min(60, (800 - (n - 1) * barGap) / n));

  return (
    <div className="flex items-end justify-center gap-1 sm:gap-[3px] w-full h-full min-h-[200px] px-2 py-4">
      {array.map((value, index) => {
        const heightPercent = (value / maxVal) * 100;
        const color = getBarColor(index, highlights, isSearch, isSearchComplete, isSorted, isNotFound);

        return (
          <div
            key={index}
            className="flex flex-col items-center bar-transition"
            style={{ width: `${barWidth}px` }}
          >
            <span className="text-[10px] sm:text-xs font-mono font-medium text-gray-700 dark:text-gray-300 mb-1">
              {value}
            </span>
            <div
              className={`w-full rounded-t-sm bar-transition ${color}`}
              style={{ height: `${heightPercent}%`, minHeight: '4px' }}
              role="img"
              aria-label={`Value ${value} at index ${index}`}
            />
            <span className="text-[9px] sm:text-[10px] font-mono text-gray-400 dark:text-gray-500 mt-1">
              {index}
            </span>
          </div>
        );
      })}
    </div>
  );
}
