import { testSort, swap } from "./utilities";

function bubbleSort(A: number[]) {
    for (let i = A.length; i > 0; i--) {
        let noSwap = true;
        // compare adjacent elements
        // bubbles float to surface
        for (let j = 0; j < i - 1; j++) {
            if (A[j] > A[j + 1]) {
                noSwap = false;
                swap(A, j, j + 1);
            }
        }
        if (noSwap) break;
    }
}

testSort(bubbleSort);