export default function StepExplanation({ explanation, currentStep, totalSteps }) {
  if (!explanation) {
    return (
      <div className="card flex items-center justify-center min-h-[60px]">
        <p className="text-gray-400 dark:text-gray-500 text-sm">
          Click <strong>Visualize</strong> to see step-by-step explanations
        </p>
      </div>
    );
  }

  return (
    <div className="card space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Step Explanation</h3>
        {totalSteps > 0 && (
          <span className="text-xs font-mono text-gray-400 dark:text-gray-500">
            {currentStep + 1} / {totalSteps}
          </span>
        )}
      </div>

      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          {explanation}
        </p>
      </div>

      {/* Mini progress dots */}
      {totalSteps > 1 && (
        <div className="flex items-center gap-1 flex-wrap">
          {Array.from({ length: Math.min(totalSteps, 30) }, (_, i) => {
            const isActive = i === currentStep;
            const isPast = i < currentStep;
            const step = Math.floor(totalSteps / 30);
            if (totalSteps > 30 && i % step !== 0 && i !== currentStep && i !== totalSteps - 1) return null;
            return (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${
                  isActive
                    ? 'bg-primary-500 scale-125'
                    : isPast
                      ? 'bg-primary-300 dark:bg-primary-700'
                      : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
