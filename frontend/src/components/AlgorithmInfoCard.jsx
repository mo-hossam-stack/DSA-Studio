export default function AlgorithmInfoCard({ metadata }) {
  if (!metadata) return null;

  const { name, description, timeComplexity, spaceComplexity, stable, bestUse } = metadata;

  const complexityBadge = (label, value) => (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
      <code className="text-sm font-mono font-medium text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
        {value}
      </code>
    </div>
  );

  return (
    <div className="card space-y-3">
      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">{name}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-3 space-y-1">
        <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
          Complexity
        </h3>
        {complexityBadge('Best', timeComplexity.best)}
        {complexityBadge('Average', timeComplexity.average)}
        {complexityBadge('Worst', timeComplexity.worst)}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-1.5 mt-1.5">
          {complexityBadge('Space', spaceComplexity)}
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-3 space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">Stable</span>
          <span className={`text-sm font-medium ${stable ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
            {stable ? 'Yes' : 'No'}
          </span>
        </div>
        <div>
          <span className="text-sm text-gray-500 dark:text-gray-400">Best for</span>
          <p className="text-sm text-gray-700 dark:text-gray-300 mt-0.5">{bestUse}</p>
        </div>
      </div>
    </div>
  );
}
