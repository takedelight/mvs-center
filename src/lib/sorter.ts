import { type Statement } from '../types/statement.type.ts';

type SortKey = 'createdAt' | 'priority';

export class Sorter {
    private readonly data: Statement[];

    constructor(data: Statement[]) {
        this.data = [...data];
    }

    private measureTime(
        fn: (ops: { comparisons: number }) => Statement[],
        complexity: string,
    ): { sortedArray: Statement[]; time: number; comparisons: number; complexity: string } {
        const ops = { comparisons: 0 };
        const start = performance.now();
        const sortedArray = fn(ops);
        const end = performance.now();
        return { sortedArray, time: end - start, comparisons: ops.comparisons, complexity };
    }

    private compare(a: Statement, b: Statement, key: SortKey, ops: { comparisons: number }) {
        ops.comparisons++;

        if (key === 'createdAt') {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return dateA - dateB;
        }

        if (key === 'priority') {
            const order = ['низький', 'середній', 'високий'];
            return order.indexOf(a.priority) - order.indexOf(b.priority);
        }

        return 0;
    }

    heapSort(key: SortKey) {
        return this.measureTime((ops) => {
            const a = [...this.data];

            const heapify = (arr: Statement[], n: number, i: number) => {
                let largest = i;
                const l = 2 * i + 1;
                const r = 2 * i + 2;

                if (l < n && this.compare(arr[l], arr[largest], key, ops) > 0) largest = l;
                if (r < n && this.compare(arr[r], arr[largest], key, ops) > 0) largest = r;

                if (largest !== i) {
                    [arr[i], arr[largest]] = [arr[largest], arr[i]];
                    heapify(arr, n, largest);
                }
            };

            const n = a.length;
            for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(a, n, i);
            for (let i = n - 1; i > 0; i--) {
                [a[0], a[i]] = [a[i], a[0]];
                heapify(a, i, 0);
            }
            return a;
        }, 'O(n log n)');
    }

    bubbleSort(key: SortKey) {
        return this.measureTime((ops) => {
            const a = [...this.data];
            for (let i = 0; i < a.length - 1; i++) {
                for (let j = 0; j < a.length - 1 - i; j++) {
                    if (this.compare(a[j], a[j + 1], key, ops) > 0) {
                        [a[j], a[j + 1]] = [a[j + 1], a[j]];
                    }
                }
            }
            return a;
        }, 'O(n²)');
    }

    quickSort(key: SortKey) {
        return this.measureTime((ops) => {
            const quick = (arr: Statement[]): Statement[] => {
                if (arr.length <= 1) return arr;
                const pivot = arr[arr.length - 1];
                const left: Statement[] = [];
                const right: Statement[] = [];
                const middle: Statement[] = [];

                for (const x of arr) {
                    const cmp = this.compare(x, pivot, key, ops);
                    if (cmp < 0) left.push(x);
                    else if (cmp > 0) right.push(x);
                    else middle.push(x);
                }

                return [...quick(left), ...middle, ...quick(right)];
            };
            return quick(this.data);
        }, 'O(n log n)');
    }

    mergeSort(key: SortKey) {
        return this.measureTime((ops) => {
            const merge = (left: Statement[], right: Statement[]): Statement[] => {
                const result: Statement[] = [];
                let i = 0,
                    j = 0;
                while (i < left.length && j < right.length) {
                    if (this.compare(left[i], right[j], key, ops) <= 0) result.push(left[i++]);
                    else result.push(right[j++]);
                }
                return [...result, ...left.slice(i), ...right.slice(j)];
            };

            const sort = (arr: Statement[]): Statement[] => {
                if (arr.length <= 1) return arr;
                const mid = Math.floor(arr.length / 2);
                const left = sort(arr.slice(0, mid));
                const right = sort(arr.slice(mid));
                return merge(left, right);
            };

            return sort(this.data);
        }, 'O(n log n)');
    }

    insertionSort(key: SortKey) {
        return this.measureTime((ops) => {
            const a = [...this.data];
            for (let i = 1; i < a.length; i++) {
                const keyItem = a[i];
                let j = i - 1;
                while (j >= 0 && this.compare(a[j], keyItem, key, ops) > 0) {
                    a[j + 1] = a[j];
                    j--;
                }
                a[j + 1] = keyItem;
            }
            return a;
        }, 'O(n²)');
    }

    selectionSort(key: SortKey) {
        return this.measureTime((ops) => {
            const a = [...this.data];
            const n = a.length;
            for (let i = 0; i < n - 1; i++) {
                let minIndex = i;
                for (let j = i + 1; j < n; j++) {
                    if (this.compare(a[j], a[minIndex], key, ops) < 0) {
                        minIndex = j;
                    }
                }
                if (minIndex !== i) {
                    [a[i], a[minIndex]] = [a[minIndex], a[i]];
                }
            }
            return a;
        }, 'O(n²)');
    }
}
