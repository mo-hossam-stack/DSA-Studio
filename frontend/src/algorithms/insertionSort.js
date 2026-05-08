export function generateInsertionSortSteps(arr) {
  const steps = [];
  const a = [...arr];
  const n = a.length;

  steps.push({
    array: [...a],
    highlights: [],
    explanation: 'Starting Insertion Sort — we\'ll build the sorted array one element at a time.',
    codeLine: 0,
  });

  for (let i = 1; i < n; i++) {
    const key = a[i];
    let j = i - 1;

    steps.push({
      array: [...a],
      highlights: [i],
      explanation: `Picking element ${key} at index ${i} to insert into the sorted portion.`,
      codeLine: 1,
    });

    while (j >= 0 && a[j] > key) {
      steps.push({
        array: [...a],
        highlights: [j, j + 1],
        explanation: `${a[j]} > ${key}, shifting ${a[j]} to the right.`,
        codeLine: 2,
      });

      a[j + 1] = a[j];
      j--;

      steps.push({
        array: [...a],
        highlights: [j + 1],
        explanation: `Shifted ${a[j + 1]} to index ${j + 1}.`,
        codeLine: 3,
      });
    }

    a[j + 1] = key;

    steps.push({
      array: [...a],
      highlights: [j + 1],
      explanation: `Inserted ${key} at index ${j + 1}.`,
      codeLine: 4,
    });

    steps.push({
      array: [...a],
      highlights: Array.from({ length: i + 1 }, (_, k) => k),
      explanation: `First ${i + 1} elements are now sorted.`,
      codeLine: 5,
    });
  }

  steps.push({
    array: [...a],
    highlights: Array.from({ length: n }, (_, i) => i),
    explanation: 'Array is fully sorted!',
    codeLine: 6,
  });

  return steps;
}
