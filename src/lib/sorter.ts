import { type Statement } from '../types/statement.type.ts';

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

    heapSort() {
        return this.measureTime((ops) => {
            const a = [...this.data];

            const heapify = (arr: Statement[], n: number, i: number) => {
                let largest = i;
                const l = 2 * i + 1;
                const r = 2 * i + 2;

                ops.comparisons++;
                if (l < n && arr[l].duration > arr[largest].duration) largest = l;
                ops.comparisons++;
                if (r < n && arr[r].duration > arr[largest].duration) largest = r;

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

    bubbleSort() {
        return this.measureTime((ops) => {
            const a = [...this.data];
            for (let i = 0; i < a.length - 1; i++) {
                for (let j = 0; j < a.length - 1 - i; j++) {
                    ops.comparisons++;
                    if (a[j].duration > a[j + 1].duration) {
                        [a[j], a[j + 1]] = [a[j + 1], a[j]];
                    }
                }
            }
            return a;
        }, 'O(n^2)');
    }

    quickSort() {
        return this.measureTime((ops) => {
            const quick = (arr: Statement[]): Statement[] => {
                if (arr.length <= 1) return arr;
                const pivot = arr[arr.length - 1];
                const left: Statement[] = [];
                const right: Statement[] = [];
                const middle: Statement[] = [];

                for (const x of arr) {
                    ops.comparisons++;
                    if (x.duration < pivot.duration) left.push(x);
                    else if (x.duration > pivot.duration) right.push(x);
                    else middle.push(x);
                }

                return [...quick(left), ...middle, ...quick(right)];
            };
            return quick(this.data);
        }, 'O(n log n) average');
    }

    mergeSort() {
        return this.measureTime((ops) => {
            const merge = (left: Statement[], right: Statement[]): Statement[] => {
                const result: Statement[] = [];
                let i = 0,
                    j = 0;
                while (i < left.length && j < right.length) {
                    ops.comparisons++;
                    if (left[i].duration <= right[j].duration) result.push(left[i++]);
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

    insertionSort() {
        return this.measureTime((ops) => {
            const a = [...this.data];
            for (let i = 1; i < a.length; i++) {
                const key = a[i];
                let j = i - 1;
                while (j >= 0) {
                    ops.comparisons++;
                    if (a[j].duration <= key.duration) break;
                    a[j + 1] = a[j];
                    j--;
                }
                a[j + 1] = key;
            }
            return a;
        }, 'O(n^2)');
    }
}
