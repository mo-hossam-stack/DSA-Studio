export function generateBubbleSortSteps(arr) {
  const steps = [];
  const a = [...arr];
  const n = a.length;

  steps.push({
    array: [...a],
    highlights: [],
    explanation: 'Starting Bubble Sort — we\'ll compare adjacent elements and swap if they\'re in the wrong order.',
    codeLine: 0,
  });

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      steps.push({
        array: [...a],
        highlights: [j, j + 1],
        explanation: `Comparing ${a[j]} and ${a[j + 1]} at indices ${j} and ${j + 1}.`,
        codeLine: 1,
      });

      if (a[j] > a[j + 1]) {
        // Swap
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        steps.push({
          array: [...a],
          highlights: [j, j + 1],
          explanation: `${a[j + 1]} > ${a[j]}, so we swap them.`,
          codeLine: 2,
        });
      }
    }
    const sortedIdx = n - 1 - i;
    steps.push({
      array: [...a],
      highlights: [sortedIdx],
      explanation: `Element ${a[sortedIdx]} is now in its correct sorted position at index ${sortedIdx}.`,
      codeLine: 3,
    });
  }

  steps.push({
    array: [...a],
    highlights: Array.from({ length: n }, (_, i) => i),
    explanation: 'Array is fully sorted!',
    codeLine: 4,
  });

  return steps;
}
