import { reactive } from './reactive.js';
const arr = [1, 2, 3, 4, 5, 6];
const state = reactive(arr);

state.shift();
// Object.defineProperty(state, 'abc', {
//   value: 6,
// });
console.log(arr);

// function fn() {
//   var i = state.includes(obj);
//   console.log(i);
// }
// console.log(state[1], arr[1]);
// state.includes = ()=>{}

// fn();
// state1.abc = 0;

// state.a++;
