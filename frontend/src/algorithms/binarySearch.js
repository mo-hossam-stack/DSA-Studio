
export function generateBinarySearchSteps(arr, target) {
  const steps = [];
  let a = [...arr];
  const wasSorted = a.every((val, i) => i === 0 || val >= a[i - 1]);

  if (!wasSorted) {
    steps.push({
      array: [...a],
      highlights: [],
      explanation: 'Array is not sorted. Binary Search requires a sorted array. Auto-sorting...',
      codeLine: 0,
    });
    a.sort((x, y) => x - y);
    steps.push({
      array: [...a],
      highlights: [],
      explanation: `Array has been sorted: [${a.join(', ')}]. Now searching for ${target}.`,
      codeLine: 0,
    });
  }

  steps.push({
    array: [...a],
    highlights: [],
    explanation: `Starting Binary Search — looking for ${target} in the sorted array.`,
    codeLine: 0,
  });

  let left = 0;
  let right = a.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    steps.push({
      array: [...a],
      highlights: [mid],
      explanation: `Middle index: ${mid}, value: ${a[mid]}. Comparing with target ${target}.`,
      codeLine: 1,
    });

    if (a[mid] === target) {
      steps.push({
        array: [...a],
        highlights: [mid],
        explanation: `Found ${target} at index ${mid}!`,
        codeLine: 2,
      });
      return steps;
    }

    if (a[mid] < target) {
      steps.push({
        array: [...a],
        highlights: Array.from({ length: mid + 1 }, (_, i) => i),
        explanation: `${a[mid]} < ${target}, search right half.`,
        codeLine: 3,
      });
      left = mid + 1;
    } else {
      steps.push({
        array: [...a],
        highlights: Array.from({ length: a.length - mid }, (_, i) => mid + i),
        explanation: `${a[mid]} > ${target}, search left half.`,
        codeLine: 4,
      });
      right = mid - 1;
    }
  }

  steps.push({
    array: [...a],
    highlights: [],
    explanation: `${target} was not found in the array.`,
    codeLine: 5,
  });

  return steps;
}
