export default function Controls({
  currentStep,
  totalSteps,
  isPlaying,
  speed,
  onPrev,
  onNext,
  onReset,
  onTogglePlay,
  onSpeedChange,
}) {
  const progress = totalSteps > 1 ? Math.round((currentStep / (totalSteps - 1)) * 100) : 0;

  return (
    <div className="card space-y-3">
      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-mono text-gray-500 dark:text-gray-400 shrink-0">
          Step {currentStep + 1} / {totalSteps}
        </span>
        <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Control buttons */}
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={onPrev}
          disabled={currentStep === 0}
          className="btn-secondary flex items-center gap-1 text-sm"
          aria-label="Previous step"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Prev
        </button>

        <button
          onClick={onTogglePlay}
          className={`btn-primary flex items-center gap-1 text-sm min-w-[90px] justify-center ${
            isPlaying ? 'bg-yellow-600 hover:bg-yellow-700' : ''
          }`}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
              </svg>
              Pause
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              </svg>
              Auto Play
            </>
          )}
        </button>

        <button
          onClick={onNext}
          disabled={currentStep >= totalSteps - 1}
          className="btn-secondary flex items-center gap-1 text-sm"
          aria-label="Next step"
        >
          Next
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <button
          onClick={onReset}
          className="btn-secondary text-sm"
          aria-label="Reset to beginning"
        >
          Reset
        </button>
      </div>

      {/* Speed control */}
      <div className="flex items-center gap-3">
        <label htmlFor="speed-slider" className="text-xs text-gray-500 dark:text-gray-400">Speed</label>
        <input
          id="speed-slider"
          type="range"
          min="0.25"
          max="3"
          step="0.25"
          value={speed}
          onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
          className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer
                     accent-primary-500"
          aria-label="Playback speed"
        />
        <span className="text-xs font-mono text-gray-500 dark:text-gray-400 min-w-[32px] text-right">
          {speed}x
        </span>
      </div>
    </div>
  );
}
