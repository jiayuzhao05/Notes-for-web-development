//Currying 是思想 设计模式 高规格函数中都有 把函数参数当做步骤 可以分解 每次操作可以变种 得到没有结果的函数，等所有元素到齐 才能得到最后结果
//普通函数会把参数混在一起








// 偏函数
const partial = (fn, ...preset) => (...rest) => fn(...preset, ...rest);
const add1 = partial((a,b)=>a+b, 1);
add1(4); // 5
