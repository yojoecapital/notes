import { testSort } from "./utilities";

function insertionSort(A: number[]) {
	for(let j = 1; j < A.length; j++) {
		const key = A[j];
		// insert A[j] into the sorted sequence A.slice(0, j - 1)
		let i = j - 1;
		while (i >= 0 && A[i] > key) {
			A[i + 1] = A[i];
			i--;
		}
		A[i + 1] = key;
	}
}

testSort(insertionSort);