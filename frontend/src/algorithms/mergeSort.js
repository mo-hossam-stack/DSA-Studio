export function generateMergeSortSteps(arr) {
  const steps = [];
  const a = [...arr];
  const n = a.length;

  steps.push({
    array: [...a],
    highlights: [],
    explanation: 'Starting Merge Sort — we\'ll divide the array into halves, sort each, then merge them back together divied and conquer style.',
    codeLine: 0,
  });

  const sortedRanges = [];

  function merge(left, mid, right) {
    const leftArr = a.slice(left, mid + 1);
    const rightArr = a.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;

    const leftIndices = Array.from({ length: mid - left + 1 }, (_, idx) => left + idx);
    const rightIndices = Array.from({ length: right - mid }, (_, idx) => mid + 1 + idx);

    steps.push({
      array: [...a],
      highlights: [...leftIndices, ...rightIndices],
      explanation: `Merging segments [${left}..${mid}] and [${mid + 1}..${right}].`,
      codeLine: 1,
    });

    while (i < leftArr.length && j < rightArr.length) {
      steps.push({
        array: [...a],
        highlights: [k, ...leftIndices, ...rightIndices],
        explanation: `Comparing ${leftArr[i]} and ${rightArr[j]}.`,
        codeLine: 2,
      });

      if (leftArr[i] <= rightArr[j]) {
        a[k] = leftArr[i];
        i++;
        steps.push({
          array: [...a],
          highlights: [k],
          explanation: `Placed ${a[k]} at index ${k}.`,
          codeLine: 3,
        });
      } else {
        a[k] = rightArr[j];
        j++;
        steps.push({
          array: [...a],
          highlights: [k],
          explanation: `Placed ${a[k]} at index ${k}.`,
          codeLine: 4,
        });
      }
      k++;
    }

    while (i < leftArr.length) {
      a[k] = leftArr[i];
      steps.push({
        array: [...a],
        highlights: [k],
        explanation: `Placed remaining element ${a[k]} at index ${k}.`,
        codeLine: 5,
      });
      i++;
      k++;
    }

    while (j < rightArr.length) {
      a[k] = rightArr[j];
      steps.push({
        array: [...a],
        highlights: [k],
        explanation: `Placed remaining element ${a[k]} at index ${k}.`,
        codeLine: 6,
      });
      j++;
      k++;
    }
  }

  for (let size = 1; size < n; size *= 2) {
    for (let left = 0; left < n - size; left += 2 * size) {
      const mid = left + size - 1;
      const right = Math.min(left + 2 * size - 1, n - 1);
      merge(left, mid, right);
    }
  }

  steps.push({
    array: [...a],
    highlights: Array.from({ length: n }, (_, i) => i),
    explanation: 'Array is fully sorted!',
    codeLine: 7,
  });

  return steps;
}
