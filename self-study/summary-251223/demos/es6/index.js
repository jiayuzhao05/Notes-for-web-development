// es6 import module
// 1. import overall
//2. import seperate module

import { sub, sqr } from './math.js';

// import directly
const rs1 = sub(1,2);
const rs2 = sqr(3);

console.log('rs1', rs1, 'rs2', rs2);