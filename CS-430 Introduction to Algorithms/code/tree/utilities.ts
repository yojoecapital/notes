function repeat(input: string, count: number) {
    let acc = "";
    for (let i = 0; i < count; i++) acc += input;
    return acc;
}

const colorMap = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
};

export type Color = keyof typeof colorMap;

export type TreeNode = {
    key: any,
    color?: Color,
    children: TreeNode[],
    parent?: TreeNode,
}

export function count(root: TreeNode): number {
    let a = 1;
    for (const child of root.children) {
        a += count(child);
    }
    return a;
}

function format(tree?: TreeNode) {
    let color = tree?.color ?? "reset";
    return `${colorMap[color]}${tree?.key ?? "?"}${colorMap.reset}`;
}

export function logTree(tree?: TreeNode, depth = 0) {
    if(depth === 0) console.log(format(tree));
    else if (depth === 1) console.log(`|${repeat("────", depth)} ${format(tree)}`);
    else console.log(`|${repeat("    ", depth - 1)} |──── ${format(tree)}`);
    tree?.children.forEach(child => logTree(child, depth + 1));
}

export class BSTNode implements TreeNode {
    public color?: "reset" | "red" | "green" | "yellow" | "blue" | "magenta" | "cyan" | "white";
    public children: BSTNode[] = [undefined, undefined];
    public parent?: BSTNode;

    constructor(public key: number) {}

    public get left(): BSTNode {
        return this.children[0];
    }
    public get right(): BSTNode {
        return this.children[1];
    }
    public set left(value: BSTNode) {
        this.children[0] = value;
    }
    public set right(value: BSTNode) {
        this.children[1] = value;
    }
    public get length() {
        let count = 0;
        for (const child of this.children) {
            if (child) count++;
        }
        return count;
    }
};

export function isBST(tree: TreeNode) {
    const b = tree.key;
    if (typeof b !== "number") return false;
    const left = tree.children[0];
    const right = tree.children[1];
    if (left) {
        const a = left.key;
        if (typeof a !== "number") return false;
        if (b < a) return false;
    } 
    if (right) {
        const c = left.key;
        if (typeof c !== "number") return false;
        if (b > c) return false;
    }
    return (left === undefined || isBST(left)) && (right === undefined || isBST(right));
}