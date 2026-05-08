import BarChart from './BarChart';

export default function VisualizationPanel({ array, highlights, isSearch, isSearchComplete, isSorted, isNotFound }) {
  if (!array || array.length === 0) {
    return (
      <div className="card flex items-center justify-center min-h-[250px]">
        <p className="text-gray-400 dark:text-gray-500 text-sm">
          Enter an array and click <strong>Visualize</strong> to begin
        </p>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          {isSearch ? 'Array Visualization' : 'Bar Chart'}
        </h3>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-sm bg-yellow-400" /> Compare
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-sm bg-red-500" /> Swap
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-sm bg-green-500" /> Sorted
          </span>
        </div>
      </div>
      <div className="min-h-[250px] flex items-end">
        <BarChart
          array={array}
          highlights={highlights || []}
          isSearch={isSearch}
          isSearchComplete={isSearchComplete}
          isSorted={isSorted}
          isNotFound={isNotFound}
        />
      </div>
    </div>
  );
}
