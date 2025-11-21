//Currying 是思想 设计模式 高规格函数中都有 把函数参数当做步骤 可以分解 每次操作可以变种 得到没有结果的函数，等所有元素到齐 才能得到最后结果
//普通函数会把参数混在一起

// 偏函数 技术 思想 模式 像非严格curry

const partial1 = function (fn, ...preset) {
  return function (...rest) {
    console.log(preset, rest)
    return fn(...preset, ...rest);
  };
};

const partial =  //partial 本体
  (fn, ...preset) =>
  (...rest) =>
    fn(...preset, ...rest);
const add1 = partial1((a, b) => a + b, 1); //add1 变体
add1(4); // 5

//...args ...kwargs
//下节课工程体系化 
// 作业：做小项目 vite + react。to do list


