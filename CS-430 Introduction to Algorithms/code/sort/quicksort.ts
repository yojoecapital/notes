import { testSort, swap, Random, generateRandomList } from "./utilities";

namespace Example1 {
    export function quicksort(A: number[], p: number, r: number) {
        if (p < r - 1) {
            const q = partition(A, p, r);
            quicksort(A, p, q);
            quicksort(A, q + 1, r);
        }
    }
    
    export function partition(A: number[], p: number, r: number): number {
        const x = A[r - 1];
        let i = p - 1;
        for (let j = p; j < r - 1; j++) {
            if (A[j] < x) {
                i++;
                swap(A, i , j);
            }
        }
        // return the pivot's index
        swap(A, i + 1, r - 1);
        return i + 1;
    }
}

namespace Example2 {
    const random = new Random();

    export function quicksort(A: number[], p: number, r: number) {
        if (p < r - 1) {
            const q = partition(A, p, r);
            quicksort(A, p, q);
            quicksort(A, q + 1, r);
        }
    }
    
    export function partition(A: number[], p: number, r: number): number {
        const i = random.between(p, r);
        swap(A, i, r - 1);
        return Example1.partition(A, p, r)
    }
}

testSort((A) => Example1.quicksort(A, 0, A.length));
testSort((A) => Example2.quicksort(A, 0, A.length));