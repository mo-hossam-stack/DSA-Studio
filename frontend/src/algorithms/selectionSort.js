/**
 * Selection Sort step generator.
 * Returns array of snapshots: { array, highlights, explanation, codeLine }
 */
export function generateSelectionSortSteps(arr) {
  const steps = [];
  const a = [...arr];
  const n = a.length;

  steps.push({
    array: [...a],
    highlights: [],
    explanation: 'Starting Selection Sort — we\'ll find the minimum element and place it at the front.',
    codeLine: 0,
  });

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    steps.push({
      array: [...a],
      highlights: [i],
      explanation: `Starting at index ${i} with value ${a[i]}. Looking for a smaller element in the rest of the array.`,
      codeLine: 1,
    });

    for (let j = i + 1; j < n; j++) {
      steps.push({
        array: [...a],
        highlights: [j, minIdx],
        explanation: `Comparing ${a[j]} at index ${j} with current minimum ${a[minIdx]} at index ${minIdx}.`,
        codeLine: 2,
      });

      if (a[j] < a[minIdx]) {
        minIdx = j;
        steps.push({
          array: [...a],
          highlights: [minIdx],
          explanation: `New minimum found: ${a[minIdx]} at index ${minIdx}.`,
          codeLine: 3,
        });
      }
    }

    if (minIdx !== i) {
      [a[i], a[minIdx]] = [a[minIdx], a[i]];
      steps.push({
        array: [...a],
        highlights: [i, minIdx],
        explanation: `Swapped ${a[i]} (index ${i}) with ${a[minIdx]} (index ${minIdx}).`,
        codeLine: 4,
      });
    }

    // Mark sorted
    steps.push({
      array: [...a],
      highlights: [i],
      explanation: `Element ${a[i]} is now in its correct sorted position at index ${i}.`,
      codeLine: 5,
    });
  }

  // Final state — all sorted
  steps.push({
    array: [...a],
    highlights: Array.from({ length: n }, (_, i) => i),
    explanation: 'Array is fully sorted!',
    codeLine: 6,
  });

  return steps;
}
