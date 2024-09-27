import { copyArray, testSort } from "./utilities";

function countingSort(A: number[], max: number) {
    const C = new Array(max), B = new Array(A.length);
    for (let i = 0; i < C.length; i++) C[i] = 0; 
    // count occurrences of each value
    for (let i = 0; i < A.length; i++) C[A[i]]++;
    // accumulate
    for (let i = 1; i < max; i++) C[i] = C[i] + C[i - 1];
    for (let i = A.length - 1; i > 0; i--) {
        B[C[A[i]]] = A[i];
        C[A[i]]--;
    }
    return B;
}

const max = 10;
testSort(A => {
    const B = countingSort(A, max);
    copyArray(B, A);
}, undefined, undefined, undefined, max);