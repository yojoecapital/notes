import { swap, testSort } from "./utilities";

const parent = (i: number) => Math.floor(i / 2) + 1;
const left = (i: number) => 2 * i + 1;
const right = (i: number) => 2 * i + 2;

function maxHeapify(A: number[], i: number, size: number) {
    const l = left(i);
    const r = right(i);
    let largest: number;
    // find the largest tree
    if (l < size && A[l] > A[i]) largest = l;
    else largest = i;
    if (r < size && A[r] > A[largest]) largest = r;
    if (largest !==i) {
        // swap
        swap(A, i, largest);
        // recurse
        maxHeapify(A, largest, size);
    }
}

function buildMaxHeap(A: number[]) {
    for (let i = parent(A.length - 1); i >= 0; i--) {
        maxHeapify(A, i, A.length);
    }
    return A.length;
}

function heapSort(A: number[]) {
    let size = buildMaxHeap(A);
    for (let i = A.length - 1; i > 0; i--) {
        swap(A, 0, i);
        size--;
        maxHeapify(A, 0, size);
    }
}

testSort(heapSort);