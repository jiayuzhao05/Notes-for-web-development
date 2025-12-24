// es6 import module
// 1. import overall
//2. import seperate module

import { sum, sub, sqr } from '../math.js';
import user from '../lib/user.js';

// import directly
const rs1 = sub(1,2);
const rs2 = sqr(3);

console.log('rs1', rs1, 'rs2', rs2);

// index babel index.js (terminal)
// npx babel src/index.js --out-file script-compiled.js
