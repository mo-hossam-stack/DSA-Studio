import { useState, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import algorithmsMetadata from '../data/algorithmsMetadata';
import { generateBubbleSortSteps } from '../algorithms/bubbleSort';
import { generateSelectionSortSteps } from '../algorithms/selectionSort';
import { generateInsertionSortSteps } from '../algorithms/insertionSort';
import { generateMergeSortSteps } from '../algorithms/mergeSort';
import { generateQuickSortSteps } from '../algorithms/quickSort';
import { generateLinearSearchSteps } from '../algorithms/linearSearch';
import { generateBinarySearchSteps } from '../algorithms/binarySearch';
import useVisualizer from '../hooks/useVisualizer';
import AlgorithmInfoCard from '../components/AlgorithmInfoCard';
import ArrayInput from '../components/ArrayInput';
import VisualizationPanel from '../components/VisualizationPanel';
import Controls from '../components/Controls';
import CodePanel from '../components/CodePanel';
import StepExplanation from '../components/StepExplanation';

const stepGenerators = {
  'bubble-sort': (arr) => generateBubbleSortSteps(arr),
  'selection-sort': (arr) => generateSelectionSortSteps(arr),
  'insertion-sort': (arr) => generateInsertionSortSteps(arr),
  'merge-sort': (arr) => generateMergeSortSteps(arr),
  'quick-sort': (arr) => generateQuickSortSteps(arr),
  'linear-search': (arr, target) => generateLinearSearchSteps(arr, Number(target)),
  'binary-search': (arr, target) => generateBinarySearchSteps(arr, Number(target)),
};

export default function AlgorithmPage() {
  const { slug } = useParams();
  const algoSlug = slug || 'bubble-sort';
  const metadata = algorithmsMetadata[algoSlug];
  const isSearch = metadata?.type === 'searching';

  const [steps, setSteps] = useState([]);
  const [inputArray, setInputArray] = useState([]);
  const [currentTarget, setCurrentTarget] = useState(null);

  const {
    currentStep,
    currentSnapshot,
    totalSteps,
    isPlaying,
    speed,
    goNext,
    goPrev,
    reset,
    togglePlay,
    setSpeed,
  } = useVisualizer(steps);

  const handleVisualize = useCallback((arr, targetStr) => {
    const generator = stepGenerators[algoSlug];
    if (!generator) return;

    setInputArray(arr);
    const target = targetStr ? Number(targetStr) : null;
    setCurrentTarget(target);

    const generatedSteps = generator(arr, target);
    setSteps(generatedSteps);
    reset();
  }, [algoSlug, reset]);

  const handleRandomize = useCallback((arr) => {
    const generator = stepGenerators[algoSlug];
    if (!generator) return;

    setInputArray(arr);
    setCurrentTarget(null);

    const generatedSteps = generator(arr);
    setSteps(generatedSteps);
    reset();
  }, [algoSlug, reset]);

  // Determine visualization state
  const isSearchComplete = useMemo(() => {
    if (!isSearch || !currentSnapshot) return false;
    const expl = currentSnapshot.explanation || '';
    return expl.includes('Found') || expl.includes('not found');
  }, [isSearch, currentSnapshot]);

  const isSorted = useMemo(() => {
    if (isSearch) return false;
    if (!currentSnapshot) return false;
    const expl = currentSnapshot.explanation || '';
    return expl.includes('fully sorted');
  }, [isSearch, currentSnapshot]);

  const isNotFound = useMemo(() => {
    if (!isSearch || !currentSnapshot) return false;
    const expl = currentSnapshot.explanation || '';
    return expl.includes('not found');
  }, [isSearch, currentSnapshot]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          {metadata?.name || 'Algorithm'}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {isSearch ? 'Search' : 'Sort'} visualization — step through the algorithm to see how it works
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left sidebar */}
        <aside className="lg:col-span-1 space-y-4">
          <AlgorithmInfoCard metadata={metadata} />
          <ArrayInput
            isSearch={isSearch}
            onVisualize={handleVisualize}
            onRandomize={handleRandomize}
          />
        </aside>

        {/* Main content */}
        <main className="lg:col-span-3 space-y-4">
          {/* Visualization */}
          <VisualizationPanel
            array={currentSnapshot?.array || inputArray}
            highlights={currentSnapshot?.highlights}
            isSearch={isSearch}
            isSearchComplete={isSearchComplete}
            isSorted={isSorted}
            isNotFound={isNotFound}
          />

          {/* Controls */}
          {steps.length > 0 && (
            <Controls
              currentStep={currentStep}
              totalSteps={totalSteps}
              isPlaying={isPlaying}
              speed={speed}
              onPrev={goPrev}
              onNext={goNext}
              onReset={() => { reset(); }}
              onTogglePlay={togglePlay}
              onSpeedChange={setSpeed}
            />
          )}

          {/* Bottom panels: Code + Explanation side by side on desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-3">
              <CodePanel
                metadata={metadata}
                codeLine={currentSnapshot?.codeLine}
              />
            </div>
            <div className="lg:col-span-2">
              <StepExplanation
                explanation={currentSnapshot?.explanation}
                currentStep={currentStep}
                totalSteps={totalSteps}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
