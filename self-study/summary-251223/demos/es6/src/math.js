// 2 export methods
//1. export seperate module
//2. export default module overall

export function sum(a,b) {
    return a + b;
}

export function sub(a,b) {
    return a - b;
}

export default function mul(a,b) {
    return a * b;
}

export function sqr(a) {
    return a * a;
    return Math.pow(a,3);
}