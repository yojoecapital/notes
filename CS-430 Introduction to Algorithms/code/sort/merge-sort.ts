import { testSort } from "./utilities";

// mutates original array
export namespace Example1 {
    function merge(A: number[], start: number, middle: number, end: number) {
        // create 2 arrays with extra slot
        const L = new Array(middle - start + 1); 
        const R = new Array(end - middle + 1);
        // copy elements to subarrays
        for (let l = 0; l < L.length - 1; l++) L[l] = A[start + l];
        for (let r = 0; r < R.length - 1; r++) R[r] = A[middle + r];
        // fill extra slot with sentinal
        L[L.length - 1] = Number.MAX_VALUE;
        R[R.length - 1] = Number.MAX_VALUE;
        let l = 0;
        let r = 0;
        // compare elements to order original array
        for (let i = start; i < end; i++) {
            if (L[l] < R[r]) {
                A[i] = L[l];
                l++;
            } else {
                A[i] = R[r];
                r++;
            }
        }
    }

    export function mergeSort(A: number[], start: number, end: number) {
        if (start < end - 1) {
            let middle = Math.floor((start + end) / 2);
            mergeSort(A, start, middle);
            mergeSort(A, middle, end);
            merge(A, start, middle, end);
        }
    }
}

// does not mutate original array
namespace Example2 {
    export function merge(L: number[], R: number[]) {
        let l = 0, r = 0;
        const A: number[] = [];
        while (l < L.length && r < R.length) {
            if (L[l] < R[r]) {
                A.push(L[l]);
                l++;
            } else {
                A.push(R[r]);
                r++;
            }
        }
        return A.concat(L.slice(l)).concat(R.slice(r));
    }

    export function mergeSort(A: number[]) {
        if (A.length <= 1) return A;
        // get middle
        const m = Math.floor(A.length / 2);
        // merge sort 1st half
        const L = mergeSort(A.slice(0, m));
        // merge sort 2nd half
        const R = mergeSort(A.slice(m));
        return merge(L, R);
    }
}

testSort(A => Example1.mergeSort(A, 0, A.length));
testSort(A => {
    const B = Example2.mergeSort(A);
    for (let i = 0; i < A.length; i++) A[i] = B[i];
});