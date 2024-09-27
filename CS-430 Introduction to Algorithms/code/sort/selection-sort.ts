import { testSort, swap } from "./utilities";

function selectionSort(A: number[]) {
    for (let i = 0; i < A.length; i++) {
        // find index of minimum element
        let min = i;
        for (let j = i; j < A.length; j++) {
            if (A[j] < A[min]) min = j;
        }
        // swap with front of sorted subarray
        swap(A, i, min);
    }
}

testSort(selectionSort);