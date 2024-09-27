import { generateRandomList, shuffle } from "../sort/utilities";
import { BSTNode, isBST, logTree } from "./utilities";

export function search(x: BSTNode, value: number) {
    if (x.key === value) return x;
    else if (value > x.key) {
        if (x.right) return search(x.right, value);
    }
    else if (x.left) return search(x.left, value);
}

export function max(x: BSTNode) {
    while (x.right) {
        x = x.right;
    }
    return x;
}

export function min(x: BSTNode) {
    while (x.right) {
        x = x.right;
    }
    return x;
}

export function successor(x: BSTNode) {
    if (x.right) return min(x.right);
    let y = x.parent;
    while (y && x === y.right) {
        x = y;
        y = y.parent;
    }
    return y;
}

export function insert(T: { root: BSTNode }, z: BSTNode) {
    let y: BSTNode, x = T.root;
    while (x) {
        y = x;
        if (z.key < x.key) x = x.left;
        else x = x.right;
    }
    z.parent = y;
    if (!y) T.root = z;
    else if (z.key < y.key) y.left = z;
    else y.right = z;
}

export function leftRotate(y: BSTNode) {
    if (!y || !y.left) return y;
    const x = y.right;
    y.right = x.left;
    x.left = y;
    return y;
}

export function rightRotate(x: BSTNode) {
    if (!x || !x.left) return x;
    const y = x.left;
    x.left = y.right;
    y.right = x;
    return x;
}

// replace u with v in T
export function transplant(T: { root: BSTNode }, u: BSTNode, v: BSTNode) {
    if (u.parent === undefined) {
        T.root = v;
    } else if (u === u.parent.left) {
        u.parent.left = v;
    } else {
        u.parent.right = v;
    }
    if (v !== undefined) v.parent = u.parent;
}

export function remove(T: { root: BSTNode }, z: BSTNode) {
    // z has no left child
    if (z.left === undefined) transplant(T, z, z.right);
    // z has left child, but no right child
    else if (z.right === undefined) transplant(T, z, z.left);
    // z has 2 children
    else {
        // get the successor of z
        let y = min(z.right);
        // if y is not the right child of z
        if (y.parent !== z) {
            // replace y with its right child
            transplant(T, y, y.right);
            // update the right child of y to be z's right child
            y.right = z.right;
            y.right.parent = y;
        }
        // replace z with y
        transplant(T, z, y);
        // update the left child of y to be z's left child
        y.left = z.left;
        y.left.parent = y;
    }
}

function test(iterations = 100, length = 20, min = 0, max = 100) {
    console.time("Total sort time");
    for (let i = 0; i < iterations; i++) {
        const A = generateRandomList(length, min, max);
        const T = { root: undefined };
        for (const x of A) {
            insert(T, new BSTNode(x));
        }
        if (!isBST(T.root)) {
            console.log(`Failed iteration ${i + 1} of ${iterations}.`);
            return;
        }
        const B = shuffle(A);
        for (const x of B) {

        }
    }
    console.log(`Passed ${iterations} iterations.`);
    console.timeEnd("Total sort time");
}

test(100);