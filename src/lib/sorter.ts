import type { Statement } from '@/types/statement.type.ts';

export class Sorter {
    private readonly data: Statement[];

    constructor(data: Statement[]) {
        this.data = [...data];
    }

    private measureTime(fn: () => Statement[]) {
        const start = performance.now();
        const sortedArray = fn();
        const end = performance.now();
        return { sortedArray, time: end - start };
    }

    heapSort(): { sortedArray: Statement[]; time: number } {
        return this.measureTime(() => {
            const a = [...this.data];

            const heapify = (arr: Statement[], n: number, i: number) => {
                let largest = i;
                const l = 2 * i + 1;
                const r = 2 * i + 2;

                if (l < n && arr[l].duration > arr[largest].duration) largest = l;
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
        });
    }

    bubbleSort(): { sortedArray: Statement[]; time: number } {
        return this.measureTime(() => {
            const a = [...this.data];
            for (let i = 0; i < a.length - 1; i++) {
                for (let j = 0; j < a.length - 1 - i; j++) {
                    if (a[j].duration > a[j + 1].duration) {
                        [a[j], a[j + 1]] = [a[j + 1], a[j]];
                    }
                }
            }
            return a;
        });
    }

    quickSort(): { sortedArray: Statement[]; time: number } {
        return this.measureTime(() => {
            const quick = (arr: Statement[]): Statement[] => {
                if (arr.length <= 1) return arr;
                const pivot = arr[arr.length - 1];
                const left = arr.filter((x) => x.duration < pivot.duration);
                const right = arr.filter((x) => x.duration > pivot.duration);
                const middle = arr.filter((x) => x.duration === pivot.duration);
                return [...quick(left), ...middle, ...quick(right)];
            };
            return quick(this.data);
        });
    }

    mergeSort(): { sortedArray: Statement[]; time: number } {
        return this.measureTime(() => {
            const merge = (left: Statement[], right: Statement[]): Statement[] => {
                const result: Statement[] = [];
                let i = 0;
                let j = 0;
                while (i < left.length && j < right.length) {
                    if (left[i].duration <= right[j].duration) {
                        result.push(left[i++]);
                    } else {
                        result.push(right[j++]);
                    }
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
        });
    }

    insertionSort(): { sortedArray: Statement[]; time: number } {
        return this.measureTime(() => {
            const a = [...this.data];
            for (let i = 1; i < a.length; i++) {
                const key = a[i];
                let j = i - 1;
                while (j >= 0 && a[j].duration > key.duration) {
                    a[j + 1] = a[j];
                    j--;
                }
                a[j + 1] = key;
            }
            return a;
        });
    }
}
