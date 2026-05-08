/**
 * Quick Sort step generator (Lomuto partition scheme).
 * Returns array of snapshots: { array, highlights, explanation, codeLine }
 */
export function generateQuickSortSteps(arr) {
  const steps = [];
  const a = [...arr];
  const n = a.length;

  steps.push({
    array: [...a],
    highlights: [],
    explanation: 'Starting Quick Sort — we\'ll pick a pivot, partition around it, and recursively sort each partition.',
    codeLine: 0,
  });

  function partition(low, high) {
    const pivot = a[high];
    let i = low - 1;

    steps.push({
      array: [...a],
      highlights: [high],
      explanation: `Pivot selected: ${pivot} at index ${high}.`,
      codeLine: 1,
    });

    for (let j = low; j < high; j++) {
      steps.push({
        array: [...a],
        highlights: [j, high],
        explanation: `Comparing ${a[j]} at index ${j} with pivot ${pivot}.`,
        codeLine: 2,
      });

      if (a[j] <= pivot) {
        i++;
        [a[i], a[j]] = [a[j], a[i]];
        if (i !== j) {
          steps.push({
            array: [...a],
            highlights: [i, j],
            explanation: `${a[i]} ≤ pivot ${pivot}, swapping elements at indices ${i} and ${j}.`,
            codeLine: 3,
          });
        }
      }
    }

    // Place pivot in correct position
    [a[i + 1], a[high]] = [a[high], a[i + 1]];
    steps.push({
      array: [...a],
      highlights: [i + 1],
      explanation: `Pivot ${pivot} placed at its correct position index ${i + 1}.`,
      codeLine: 4,
    });

    return i + 1;
  }

  function quickSort(low, high) {
    if (low < high) {
      const pi = partition(low, high);
      quickSort(low, pi - 1);
      quickSort(pi + 1, high);
    }
  }

  quickSort(0, n - 1);

  // Final state
  steps.push({
    array: [...a],
    highlights: Array.from({ length: n }, (_, i) => i),
    explanation: 'Array is fully sorted!',
    codeLine: 5,
  });

  return steps;
}
