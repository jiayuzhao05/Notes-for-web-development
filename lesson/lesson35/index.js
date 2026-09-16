function addFunc(a, b) {
  return a + b;
}

let count = 0;

function nonPureAddFunc(a, b) {
  count++;
  console.log(a + b);
  return a + b;
}
