const algorithmsMetadata = {
    'selection-sort': {
    name: 'Selection Sort',
    slug: 'selection-sort',
    type: 'sorting',
    description: 'Divides the array into a sorted and unsorted region. Repeatedly selects the smallest element from the unsorted region and moves it to the end of the sorted region.',
    timeComplexity: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)',
    stable: false,
    bestUse: 'Small datasets where swapping cost matters.',
    pseudocode: `function selectionSort(arr):
    n = arr.length
    for i = 0 to n-2:
        minIdx = i
        for j = i+1 to n-1:
            if arr[j] < arr[minIdx]:
                minIdx = j
        if minIdx != i:
            swap(arr[i], arr[minIdx])
    return arr`,
    cppCode: `void selectionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx != i) {
            swap(arr[i], arr[minIdx]);
        }
    }
}`,
    cppLines: [
      'void selectionSort(vector<int>& arr) {',
      '    int n = arr.size();',
      '    for (int i = 0; i < n - 1; i++) {',
      '        int minIdx = i;',
      '        for (int j = i + 1; j < n; j++) {',
      '            if (arr[j] < arr[minIdx]) {',
      '                minIdx = j;',
      '            }',
      '        }',
      '        if (minIdx != i) {',
      '            swap(arr[i], arr[minIdx]);',
      '        }',
      '    }',
      '}',
    ],
    bsmjaCode: `void selectionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++)
        swap(*min_element(arr.begin() + i, arr.end()), arr[i]);
}`,
    bsmjaLines: [
      'void selectionSort(vector<int>& arr) {',
      '    int n = arr.size();',
      '    for (int i = 0; i < n - 1; i++)',
      '        swap(*min_element(arr.begin() + i, arr.end()), arr[i]);',
      '}',
    ],
  },

    'insertion-sort': {
    name: 'Insertion Sort',
    slug: 'insertion-sort',
    type: 'sorting',
    description: 'Builds the final sorted array one element at a time. Takes each element and inserts it into its correct position among the previously sorted elements.',
    timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)',
    stable: true,
    bestUse: 'Small or nearly sorted datasets; online sorting (streaming data).',
    pseudocode: `function insertionSort(arr):
    n = arr.length
    for i = 1 to n-1:
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j+1] = arr[j]
            j--
        arr[j+1] = key
    return arr`,
    cppCode: `void insertionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
    cppLines: [
      'void insertionSort(vector<int>& arr) {',
      '    int n = arr.size();',
      '    for (int i = 1; i < n; i++) {',
      '        int key = arr[i];',
      '        int j = i - 1;',
      '        while (j >= 0 && arr[j] > key) {',
      '            arr[j + 1] = arr[j];',
      '            j--;',
      '        }',
      '        arr[j + 1] = key;',
      '    }',
      '}',
    ],
    bsmjaCode: `void insertionSort(vector<int>& arr) {
    for (auto it = arr.begin(); it != arr.end(); it++)
        rotate(upper_bound(arr.begin(), it, *it), it, it + 1);
}`,
    bsmjaLines: [
      'void insertionSort(vector<int>& arr) {',
      '    for (auto it = arr.begin(); it != arr.end(); it++)',
      '        rotate(upper_bound(arr.begin(), it, *it), it, it + 1);',
      '}',
    ],
  },

    'merge-sort': {
    name: 'Merge Sort',
    slug: 'merge-sort',
    type: 'sorting',
    description: 'A divide-and-conquer algorithm that splits the array into halves, recursively sorts each half, then merges the sorted halves back together.',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    spaceComplexity: 'O(n)',
    stable: true,
    bestUse: 'Large datasets where consistent O(n log n) performance is needed.',
    pseudocode: `function mergeSort(arr, left, right):
    if left < right:
        mid = (left + right) / 2
        mergeSort(arr, left, mid)
        mergeSort(arr, mid+1, right)
        merge(arr, left, mid, right)

function merge(arr, left, mid, right):
    leftArr = arr[left..mid]
    rightArr = arr[mid+1..right]
    i = j = 0, k = left
    while i < len(leftArr) and j < len(rightArr):
        if leftArr[i] <= rightArr[j]:
            arr[k++] = leftArr[i++]
        else:
            arr[k++] = rightArr[j++]
    // Copy remaining elements`,
    cppCode: `void merge(vector<int>& arr, int left, int mid, int right) {
    vector<int> L(arr.begin() + left, arr.begin() + mid + 1);
    vector<int> R(arr.begin() + mid + 1, arr.begin() + right + 1);
    int i = 0, j = 0, k = left;
    while (i < L.size() && j < R.size()) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < L.size()) arr[k++] = L[i++];
    while (j < R.size()) arr[k++] = R[j++];
}

void mergeSort(vector<int>& arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}`,
    cppLines: [
      'void merge(vector<int>& arr, int left, int mid, int right) {',
      '    vector<int> L(arr.begin() + left, arr.begin() + mid + 1);',
      '    vector<int> R(arr.begin() + mid + 1, arr.begin() + right + 1);',
      '    int i = 0, j = 0, k = left;',
      '    while (i < L.size() && j < R.size()) {',
      '        if (L[i] <= R[j]) arr[k++] = L[i++];',
      '        else arr[k++] = R[j++];',
      '    }',
      '    while (i < L.size()) arr[k++] = L[i++];',
      '    while (j < R.size()) arr[k++] = R[j++];',
      '}',
      '',
      'void mergeSort(vector<int>& arr, int left, int right) {',
      '    if (left < right) {',
      '        int mid = left + (right - left) / 2;',
      '        mergeSort(arr, left, mid);',
      '        mergeSort(arr, mid + 1, right);',
      '        merge(arr, left, mid, right);',
      '    }',
      '}',
    ],
    bsmjaCode: `void mergeSort(vector<int>& arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        inplace_merge(arr.begin() + left, arr.begin() + mid + 1, arr.begin() + right + 1);
    }
}`,
    bsmjaLines: [
      'void mergeSort(vector<int>& arr, int left, int right) {',
      '    if (left < right) {',
      '        int mid = left + (right - left) / 2;',
      '        mergeSort(arr, left, mid);',
      '        mergeSort(arr, mid + 1, right);',
      '        inplace_merge(arr.begin() + left, arr.begin() + mid + 1, arr.begin() + right + 1);',
      '    }',
      '}',
    ],
  },

    'quick-sort': {
    name: 'Quick Sort',
    slug: 'quick-sort',
    type: 'sorting',
    description: 'A divide-and-conquer algorithm that selects a pivot, partitions the array around it, and recursively sorts the partitions. Fastest comparison-based sort on average.',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
    spaceComplexity: 'O(log n)',
    stable: false,
    bestUse: 'Large datasets where average-case performance matters.',
    pseudocode: `function quickSort(arr, low, high):
    if low < high:
        pi = partition(arr, low, high)
        quickSort(arr, low, pi - 1)
        quickSort(arr, pi + 1, high)

function partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j = low to high-1:
        if arr[j] <= pivot:
            i++
            swap(arr[i], arr[j])
    swap(arr[i+1], arr[high])
    return i + 1`,
    cppCode: `int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,
    cppLines: [
      'int partition(vector<int>& arr, int low, int high) {',
      '    int pivot = arr[high];',
      '    int i = low - 1;',
      '    for (int j = low; j < high; j++) {',
      '        if (arr[j] <= pivot) {',
      '            i++;',
      '            swap(arr[i], arr[j]);',
      '        }',
      '    }',
      '    swap(arr[i + 1], arr[high]);',
      '    return i + 1;',
      '}',
      '',
      'void quickSort(vector<int>& arr, int low, int high) {',
      '    if (low < high) {',
      '        int pi = partition(arr, low, high);',
      '        quickSort(arr, low, pi - 1);',
      '        quickSort(arr, pi + 1, high);',
      '    }',
      '}',
    ],
    bsmjaCode: `void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pivot = arr[high], i = low - 1;
        for (int j = low; j < high; j++)
            if (arr[j] <= pivot) swap(arr[++i], arr[j]);
        swap(arr[i + 1], arr[high]);
        int pi = i + 1;
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,
    bsmjaLines: [
      'void quickSort(vector<int>& arr, int low, int high) {',
      '    if (low < high) {',
      '        int pivot = arr[high], i = low - 1;',
      '        for (int j = low; j < high; j++)',
      '            if (arr[j] <= pivot) swap(arr[++i], arr[j]);',
      '        swap(arr[i + 1], arr[high]);',
      '        int pi = i + 1;',
      '        quickSort(arr, low, pi - 1);',
      '        quickSort(arr, pi + 1, high);',
      '    }',
      '}',
    ],
  },

    'linear-search': {
    name: 'Linear Search',
    slug: 'linear-search',
    type: 'searching',
    description: 'Sequentially checks each element of the array until a match is found or the end is reached. The simplest search algorithm — works on any array, sorted or unsorted.',
    timeComplexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(1)',
    stable: true,
    bestUse: 'Small datasets or unsorted arrays where binary search cannot be applied.',
    pseudocode: `function linearSearch(arr, target):
    for i = 0 to n-1:
        if arr[i] == target:
            return i
    return -1`,
    cppCode: `int linearSearch(vector<int>& arr, int target) {
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] == target) {
            return i;  // Found
        }
    }
    return -1;  // Not found
}`,
    cppLines: [
      'int linearSearch(vector<int>& arr, int target) {',
      '    for (int i = 0; i < arr.size(); i++) {',
      '        if (arr[i] == target) {',
      '            return i;  // Found',
      '        }',
      '    }',
      '    return -1;  // Not found',
      '}',
    ],
    bsmjaCode: `int linearSearch(vector<int>& arr, int target) {
    auto it = find(arr.begin(), arr.end(), target);
    return it != arr.end() ? it - arr.begin() : -1;
}`,
    bsmjaLines: [
      'int linearSearch(vector<int>& arr, int target) {',
      '    auto it = find(arr.begin(), arr.end(), target);',
      '    return it != arr.end() ? it - arr.begin() : -1;',
      '}',
    ],
  },

    'binary-search': {
    name: 'Binary Search',
    slug: 'binary-search',
    type: 'searching',
    description: 'Efficiently finds a target in a sorted array by repeatedly dividing the search interval in half. Requires a sorted array — if the input is unsorted, it will be auto-sorted.',
    timeComplexity: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
    spaceComplexity: 'O(1)',
    stable: true,
    bestUse: 'Large sorted datasets where fast lookup is critical.',
    pseudocode: `function binarySearch(arr, target):
    left = 0, right = n-1
    while left <= right:
        mid = (left + right) / 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,
    cppCode: `int binarySearch(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) {
            return mid;  // Found
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;  // Not found
}`,
    cppLines: [
      'int binarySearch(vector<int>& arr, int target) {',
      '    int left = 0, right = arr.size() - 1;',
      '    while (left <= right) {',
      '        int mid = left + (right - left) / 2;',
      '        if (arr[mid] == target) {',
      '            return mid;  // Found',
      '        } else if (arr[mid] < target) {',
      '            left = mid + 1;',
      '        } else {',
      '            right = mid - 1;',
      '        }',
      '    }',
      '    return -1;  // Not found',
      '}',
    ],
    bsmjaCode: `int binarySearch(vector<int>& arr, int target) {
    auto it = lower_bound(arr.begin(), arr.end(), target);
    return (it != arr.end() && *it == target) ? it - arr.begin() : -1;
}`,
    bsmjaLines: [
      'int binarySearch(vector<int>& arr, int target) {',
      '    auto it = lower_bound(arr.begin(), arr.end(), target);',
      '    return (it != arr.end() && *it == target) ? it - arr.begin() : -1;',
      '}',
    ],
  },
};

export const algorithmList = Object.values(algorithmsMetadata).map(({ name, slug, type, description }) => ({
  name, slug, type, description,
}));

export default algorithmsMetadata;
