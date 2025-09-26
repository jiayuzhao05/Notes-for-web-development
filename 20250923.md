// V8是引擎。 浏览器是环境
执行环境-V8浏览器引擎

// 这里是出现的原因
CPU 本地任务（同步）会阻塞进程

// event loop是一种机制
异步任务 通过event loop调度 -宏任务和微任务

// 都是本地代码
执行顺序：本地同步代码（同步任务）->异步代码（ 宏任务，微任务）循环往复



event loop:

Call Stack：同步代码入栈执行

Task Queue：存放异步任务回调


// scripts 不是
宏任务（eventloop中大的阶段性任务，一轮循环中只执行一个）：scripts, setTimeout, setInterval, I/O

// promise.then 不是 .then。 async和await 是一起组合，await后代码放入微任务
微任务（在进入下一个宏任务之前统一清空）：.then, async, await, Promise 回调



```javascript
//  执行结果是？以及宏任务和微任务
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}

async function async2() {
    console.log('async2');
}

console.log('script start');

setTimeout(function() {
    console.log('setTimeout');
}, 0);

async1();

new Promise(function(resolve) {
    console.log('promise1');
    resolve();
}).then(function() {
    console.log('promise2');
});

console.log('script end');
```

顺序：同步-> 异步（放入队列）-> 微-> 宏 (循环)
