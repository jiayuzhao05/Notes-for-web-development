import { reactive } from './reactive.js';
const obj = {
  a: 0,
  b: 2,
  c: {
    d: 3,
  },
};

const state1 = reactive(obj);

function fn() {
  // for (const key in state1) {
  // }
  // Object.keys(state1);
  1 / state1.a;
}

fn();
state1.abc = 0;

// state.a++;
