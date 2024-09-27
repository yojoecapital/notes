export class Random {
    constructor(private seed = 0) { }

    get value(): number {
        const maxInt32 = 0x7fffffff;
        const a = 1664525;
        const c = 1013904223;

        this.seed = (a * this.seed + c) & maxInt32;

        return this.seed / maxInt32;
    }

    public between(min: number, max: number) {
        return Math.floor(this.value * (max - min)) + min;
    }
}

export function generateRandomList(length: number, min = 0, max = 100, seed = 0) {
    const random = new Random(seed);
    const l: number[] = [];
    for (let i = 0; i < length; i++) {
        l.push(random.between(min, max));
    }
    return l;
}

function isSorted(A: number[]) {
    for (let i = 0; i < A.length - 1; i++) {
        if (A[i] > A[i + 1]) return false;
    }
    return true;
}

export function testSort(fn: (A: number[]) => void, iterations = 100, length = 20, min = 0, max = 100) {
    console.time("Total sort time");
    for (let i = 0; i < iterations; i++) {
        const A = generateRandomList(length, min, max);
        fn(A);
        if (!isSorted(A)) {
            console.log(`Failed iteration ${i + 1} of ${iterations}.`);
            return;
        }
    }
    console.log(`Passed ${iterations} iterations.`);
    console.timeEnd("Total sort time");
}

export function swap(A: number[], i: number, j: number) {
    const tmp = A[i];
    A[i] = A[j];
    A[j] = tmp;
}

export function copyArray<T>(A: T[], B: T[]) {
    for (let i = 0; i < A.length; i++) B[i] = A[i];
}

export function shuffle(list: any[]) {
    const copy = [...list];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]]; // Swap elements at positions i and j
    }
    return copy;
}