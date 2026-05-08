export function generateLinearSearchSteps(arr, target) {
  const steps = [];
  const a = [...arr];
  const n = a.length;

  steps.push({
    array: [...a],
    highlights: [],
    explanation: `Starting Linear Search — looking for ${target} in the array.`,
    codeLine: 0,
  });

  for (let i = 0; i < n; i++) {
    steps.push({
      array: [...a],
      highlights: [i],
      explanation: `Checking index ${i}: value = ${a[i]}.`,
      codeLine: 1,
    });

    if (a[i] === target) {
      steps.push({
        array: [...a],
        highlights: [i],
        explanation: `Found ${target} at index ${i}!`,
        codeLine: 2,
      });
      return steps;
    }

    steps.push({
      array: [...a],
      highlights: [i],
      explanation: `${a[i]} ≠ ${target}, moving to next element.`,
      codeLine: 3,
    });
  }

  steps.push({
    array: [...a],
    highlights: [],
    explanation: `${target} was not found in the array.`,
    codeLine: 4,
  });

  return steps;
}
