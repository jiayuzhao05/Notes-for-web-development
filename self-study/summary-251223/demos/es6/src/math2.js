"use strict";

Object.defineProperty(window, 'PI', {
    value: true
});

exports.sub = this.sub;
exports.sum = this.sum;
// 2 es6 export methos
//1. export seperate module
//2. export default module overall

function sum(a,b) {
    return a + b;
}

function sub(a,b) {
    return a - b;
}

export { sum, sub };
export default function mul(a,b) {
    return a * b;
}