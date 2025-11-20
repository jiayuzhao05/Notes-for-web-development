/** TODO:有一些可能有错或者不够全面 */
// 去重
class Remove {
  //set
  set (arr) {
    return [...new Set(arr)]
  }

  // filter
  filter (arr) {
    return arr.filter((item, index, self) => self.indexOf(item) === index)
  }

  // reduce
  reduce (arr) {
    return arr.reduce((pre, cur) => {
      if (!pre.includes(cur)) {
        pre.push(cur)
      }
      return pre
    }, [])
  }
}

// 扁平化
class Flat {
    myFlat (arr) {
    if (!arr.length || !arr) return arr
    let res = []
    for (let item of arr) {
      if (Array.isArray(item)) {
        res = [...res, ...myFlat717(item)]
      }else {
        res.push(item)
      }
    }
    return res
  }

  myFlatReduce (arr) {
    return arr.reduce((acc, cur) => {
      if (Array.isArray(cur)) {
        acc = [...acc, ...myFlatReduce717(cur)]
      }else {
        acc.push(cur)
      }
      return acc
    }, [])
  }
}

// this
class This {
  call (ctx, ...args) {
    if (!ctx) {
      ctx = typeof window === 'undefined' ? global : window
    }

    const fn = new Symbol()
    ctx[fn] = this
    const res = ctx[fn](...args)

    delete ctx[fn]
    return res
  }

  apply (ctx, args) {
    if (!ctx) {
      ctx = typeof window === 'undefined' ? global : window
    }

    const fn = new Symbol()
    ctx[fn] = this
    const res = args ? ctx[fn](...args) : ctx[fn]()
    delete ctx[fn]

    return res
  }

  bind(ctx, ...args) {
    const fn = this
    return function (...newArgs) {
      return fn.apply(ctx, [...args, ...newArgs])
    }
  }
}

// clone
class Clone {
  shallow (obj) {
    const res = {}

    for (let key in obj) {
      res[key] = obj[key]
    }

    return res
  }

  deep (obj, map = new WeakMap()) {
    if (!obj) return obj

    if (map.has(obj)) {
      return map.get(obj)
    }

    const res = {}
    map.set(obj, res)

    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] && typeof obk[key] === 'object') {
          res[key] = this.deep(obj[key], map)
        }else {
          res[key] = obj[key]
        }
      }
    }
    return res
  }
}

// 柯里化
const myCurry = (fn) => {
  const curried = (...args) => {
    if (args.length >= fn.length) {
      return fn(...args)
    }else return (...newArgs) => curried(this, [...args, ...newArgs])
  }
  return curried
}

// 防抖节流
const myDebounce = (fn, delay) => {
  let timer 
  return function () {
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      fn()
    }, delay)
  }
}

const myThrottle = (fn, delay) => {
  let timer
  return function () {
    if (!timer){
      timer = setTimeout(() => {
        fn()
        clearTimeout(timer)
      }, delay)
    }
  }
}

// instanceOf
const myInstance = (obj, fn) => {
  proto = getPrototypeOf(obj)

  while (proto) {
    if (proto === fn.prototype) {
      return true
    }
    proto = getPrototypeOf(proto)
  }
  return false
}

// 定时器
class Time {
  timeout (fn, delay) {
    let timer = setInterval(() => {
      fn()
      clearInterval(timer)
    }, delay)
  }

  interval (fn, delay) {
    const loop = () => {
      fn()
      setTimeout(loop, delay)
    }
    setTimeout(loop, delay)
  }
}

// new
const myNew = (fn, args) => {
  const obj = {}
  obj.__proto__ = fn.prototype

  const res = fn.apply(obj, args)
  return res instanceof Object ? res : obj
}

// promise
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
class myPromise {
  constructor (exe) {
    this.value = undefined
    this.reason = undefined
    this.status = PENDING

    this.onFulfilledCbs = []
    this.onRejectedCbs = []

    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = value

        this.onFulfilledCbs.forEach(cb => cb(value))
      }
    }
        const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason

        this.onRejectedCbs.forEach(cb => cb(reason))
      }
    }

    try {
      exe(resolve, reject)
    }catch (err) {
      reject(err)
    }
  }

  then (onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : err => {throw err}

    return new myPromise((resolve, reject) => {
      const handleFulfilled = () => {
        queueMicrotask(() => {
          const res = onFulfilled(this.value)
          myPromise.resolvePromise(res, resolve, reject)
        })
      }

      const handleRejected = () => {
        queueMicrotask(() => {
          const res = onRejected(this.reason)
          myPromise.resolvePromise(res, resolve, reject)
        })
      }

      if (this.status === FULFILLED) {
        handleFulfilled()
      }

      if (this.status === REJECTED) {
        handleRejected()
      }

      if (this.status === PENDING) {
        this.onFulfilledCbs.push(() => handleFulfilled)
        this.onRejectedCbs.push(() => handleRejected)
      }
    })
  }

  catch (onRejected) {
    return this.then(null, onRejected)
  }

  finally (cb) {
    return this.then(
      value => myPromise.resolve(cb()).then(() => value),
      reason => myPromise.reject(cb()).then(() => reason)
    )
  }

  static resolve (value) {
    return new myPromise((resolve) => resolve(value))
  }

  static reject (reason) {
    return new myPromise((_, reject) => reject(reason))
  }

  static race (promises) {
    return new myPromise((resolve, reject) => {
      promises.forEach(promise => {
        myPromise.resolve(promise).then(res => {
          resolve(res)
        }, reject)
      })
    })
  }

  static all (promises) {
    const results =[]
    let count = 0
    return new myPromise((resolve, reject) => {
      promises.forEach((promise, idx) => {
        myPromise.resolve(promise).then(res => {
          results[idx] = res
          count++
          if (count === promise.length) {
            resolve(results)
          }
        }, reject)
      })
    })
  }

  static allSettled (promise) {
    const results =[]
    let count =0
    return new myPromise((resolve) => {
      promises.forEach((promise, idx) => {
        myPromise.resolve(promise).then(value => {
          results[idx] = {
            status: FULFILLED,
            value
          }
          count++
        }, reason => {
          results[idx] = {
            status: REJECTED,
            reason
          }
          count++
        }).finally(() => {
          if (count === promises.length) {
            resolve(results)
          }
        })
      })
    })
  }

  static resolvePromise (res, resolve, reject) {
    if (res instanceof myPromise) {
      res.then(resolve, reject)
    }else {
      resolve(res)
    }
  }
}

// 并发数量
const concurrent = (reqs, max) => {
  let running = 0
  let count = 0
  const results = []
  return new Promise((resolve, reject) => {
    const next = () => {
      if (!running && count >= reqs.length) {
        resolve(results)
        return
      }
      while (running < max && count < reqs.length) {
        const req = reqs.shift()
        running++
        Promise.resolve(req()).then(res => {
          // results.push(res)
          results[count] = res
        }).catch(err => {
          results[count] = err
        }).finally(() => {
          running--
          next()
        })
      }
    }
    next()
  })
}

// 排序
class Sort {
  bubble (arr) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i+1]] = [arr[i+1], arr[i]]
      }
    }
    return arr
  }

  quick (arr) {
    const len = arr.length
    if (len<=1) return arr
    const left = [], right = []
    const pivot = arr[len - 1]
    for (let i = 0; i < len - 1; i++) {
      if (pivot >= arr[i]) {
        left.push(arr[i])
      }else {
        right.push(arr[i])
      }
    }
    return [...this.quick(left), pivot, ...this.quick(right)]
  }

  insert (arr) {
    const len = arr.length
    if (len < 2) return arr
    for (let i = 1; i < len; i++) {
      const cur = arr[i]
      let j = i - 1
      while (j>=0 && arr[j] < cur) {
        arr[j + 1] = arr[j]
        j--
      }
      arr[j + 1] = cur
    }
    return arr
  }

  select (arr) {
    const len = arr.length
    if (len <= 1) return arr
    for (let i = 0; i < len - 1; i++) {
      let min = i
      for (let j = i + 1; j < len; j++) {
        if (arr[j] < arr[min]) {
          min = j
        }
      }
      if (min !== i) {
        [arr[i], arr[min]] = [arr[min], arr[j]]
      }
    }
    return arr
  }

  merge (arr) {
    const len = arr.length
    if (len < 2) return arr
    const mid = Math.floor(arr.length / 2)
    const left = this.merge(arr.slice(0, mid))
    const right = this.merge(arr.slice(mid))

    const mergeSort = (leftArr, rightArr) => {
      const res = []
      let i = 0, j = 0
      while (i < leftArr.length && j < rightArr.length) {
        if (leftArr[i] <= rightArr[j]) {
          res.push(leftArr[i])
          i++
        }else {
          res.push(rightArr[j])
          j++
        }
      }
      return [...res, ...leftArr.slice(i), ...rightArr.slice(j)]
    }
    return mergeSort(left, right)
  }


}

// 对象
class Object {
  // 对象转为树
  arrayToTree (arr) {
    const map = {}
    const tree = []

    for (let item of arr) {
      map[item.id] = { ...item, children: [] }
    }

    for (let item of arr) {
      const node = map[item.id]
      if (item.parentId === null) {
        tree.push(node)
      }else {
        const parent = map[node.parentId]
        if (parent) {
          parent.children.push(node)
        }
      }
    }
    return tree
  }

  deepEqual (a, b) {
    if (a === b) return true

    if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) return false

    if (Array.isArray(a) !== Array.isArray(b)) return false

    const keysA = Object.keys(a)
    const keysB = Object.keys(b)

    if (keysA.length !== keysB.length) return false
    for (let key in keysA) {
      if (!keysB.includes(key)) return false

      if (!deepEqual(a[key], b[key])) return false
    }
    return true
  }

  // 小驼峰转下划线
  camel (obj) {
    const res = {}
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        const snakeKey = key.replace(/[A-Z]]/g, letter => '_' + letter.toLowerCase())
        res[snakeKey] = obj[key]
      }
    }
    return res
  }

  // 下划线转小驼峰
  snake (obj) {
    const res = {}
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        const camelKey = key.replace(/_[a-z]/g, (_, letter) => letter.toUpperCase())
        res[camelKey] = obj[key]
      }
    }
    return res
  }

  // 扁平
  flatten (obj, pre = '') {
    const res = {}
    for (let key in obj) {
      const newKey = pre ? `${pre}.${key}` : key
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        // res[newKey] = this.flatten(obj[key], key)
        Object.assign(res, this.flatten(obj[key], newKey))
      }else {
        res[newKey] =obj[key]
      }
    }
    return res
  }

    // 反扁平
  unflatten (obj) {
    const res = {}
    for (let key in obj) {
      const keys = key.split('.')
      let cur = res
      for (let i = 0; i < keys.length; i++) {
        if (i === keys.length - 1) {
          cur[keys[i]] = obj[key]
        }

        if (!cur[keys[i]]) {
          cur[keys[i]] = {}
        }

        cur = cur[keys[i]]
      }
    }
  }
}

// ajax
const myAjax = (options) => {
  const xhr = new XMLHttpRequest()

  const defaultOptions = {
    url: 'www.google.com',
    method: 'GET',
    data: null,
    success () {},
    error () {},
    timeout: 10000,
  }

  const config = {...defaultOptions, ...options}
  // let params = config.data ? Object.keys(config.data).forEach(key => `${decodeURIComponent(config.data[key])}`).join('') : ''
  let params = config.data ? Object.keys(config.data).map(key => `${decodeURIComponent(config.data[key])}`).join('&') : ''

  if (config.method.toUpperCase() === 'GET') {
    config.url+=params
  }

  // xhr.open()
  xhr.open(url, method, true)
  xhr.setRequestHeader('Content-Type', 'application/x-www-urlencoded')

  xhr.timeout = config.timeout
  xhr.ontimeout = function () {
    console.log('timeout')
    // config.error(new Error('timeout'))
    config.error(() => new Error('timeout'))
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        config.success(xhr.responseText)
      }else {
        config.error(() => new Error('failed'))
      }
    }
  }

  if (config.method.toUpperCase() === 'POST') {
    xhr.send(params)
  }else {
    xhr.send()
  }
}

// axios 封装
{
  myAxios: {
    const http = new axios({
      baseURL: 'www.baidu.com',
      timeout: 10000,
    })

    class InterceptorHandler {
      constructor () {
        this.actions = []
      }

      add (act) {
        this.actions.push(act)
      }

      handleAllActions (value) {
        let newVal = value
        this.actions.forEach(act => {
          const res = act(newVal)
          if (res.checkHandle) {
            newVal = res.value()
          }
        })
        return newVal
      }
    }

    const requestInterceptor = (request) => {
      const requestInstance = new InterceptorHandler()
      requestInstance
        .add(paramsHandler)
        .add(headerHandler)
      return requestInstance.handleAllActions(request)
    }

    const responseInterceptor = (response) => {
      const responseInstance = new InterceptorHandler()
      responseInstance
        .add(dataHandler)
        .add(sentryHandler)
      return responseInstance.handleAllActions(response)
    }

    http.interceptors.use(requestInterceptor, err => {throw err})
    http.interceptors.use(responseInterceptor, err => {throw err})
  }

  const headerHandler = (request) => {
    const handler = () => {
      request.header = request.header || {}
      const token = localStorage.getItem('token') 
      if (token) {
        request.header['token'] = token
      }
    }

    let checkHandle = true
    if (...) { // 业务场景决定
      checkHandle = false
    }
    return {checkHandle, value: handler}
  }
}

// 订阅发布
class EB {
  constructor() {
    this.tasks = {}
  }

  add (type, fn) {
    if (!this.tasks[type]) {
      this.tasks[type] = []
    }
    this.tasks[type].push(fn)
  }

  off (type, fn) {
    this.tasks[type] = this.tasks[type].filter(tsk => tsk !== fn)
  }

  emit (type, ...args) {
    this.tasks[type].forEach(tsk => {
      tsk(...args)
    })
  }

  once (type, fn) {
    const f = () => {
      fn()
      this.off(type, f)
    }
    this.on(type, f)
  }
}

// webpack
{
  const path = require('path')
  modules.export = {
    entry: './src/main.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'output.js'
    },
    resolve: {
      alias: { '@': './src' }
    },
    module: {
      rules: [],
    },
    plugins: [

    ],
    mode: 'dev',
    devServer: {
      proxy: {
        '/api': {
          changeOrigin: true,
          target: 'www.baidu.com',
          pathWritten: { '/api' : ''}
        }
      }
    }
  }
}

// 继承
class Succession {
  // 原型链继承
  prototypeS () {
    function Animal () {
      this.name = 'animals'
    }
    Animal.prototype.bite = function () {
      console.log('hello')
    }

    function Dog () {
      this.age = 3
    }

    Dog.prototype = new Animal()

    const dog1 = new Dog
    console.log(dog1.name)
    dog1.bite()
  }

  // 构造函数继承

  functionS () {
    function Animal () {
      this.name = 'animals'
    }
    Animal.prototype.bite = function () {
      console.log('hello')
    }

    function Dog () {
      Animal.call(this)
      this.age = 3
    }

    const dog1 = new Dog()
    console.log(dog1.name)
    dog1.bite()
  }

  // 组合继承
  comboS () {
        function Animal () {
      this.name = 'animals'
    }
    Animal.prototype.bite = function () {
      console.log('hello')
    }

    function Dog () {
      Animal.call(this)
      this.age = 3
    }

    Dog.prototype = new Animal()
    Dog.prototype.constructor = Dog

    const dog1 = new Dog()
    console.log(dog1.name)
    dog1.bite()
  }

  // 寄生组合继承
  ParasiticComboS() {
            function Animal () {
      this.name = 'animals'
    }
    Animal.prototype.bite = function () {
      console.log('hello')
    }

    function Dog () {
      Animal.call(this)
      this.age = 3
    }

    Dog.prototype = Object.create(Animal.prototype)
    Dog.prototype.constructor = Dog

    const dog1 = new Dog()
    console.log(dog1.name)
    dog1.bite()
  }
}

// 简易响应式实现
{
  class Vue {
    constructor(options) {
      this.$data = options.data;
      this.observe(this.$data);
    }
    
    // 数据劫持方法
    observe(data) {
      if (!data || typeof data !== 'object') return;
      
      Object.keys(data).forEach(key => {
        this.defineReactive(data, key, data[key]);
        // 代理data属性到Vue实例上
        this.proxyData(key);
      });
    }
    
    // 定义响应式
    defineReactive(obj, key, val) {
      const dep = new Dep(); // 每个属性都有自己的dep
      
      // 递归处理嵌套对象
      this.observe(val);
      
      Object.defineProperty(obj, key, {
        get() {
          Dep.target && dep.addSub(Dep.target); // 收集依赖
          return val;
        },
        set(newVal) {
          if (newVal === val) return;
          val = newVal;
          // 新值是对象的话继续劫持
          this.observe(newVal);
          dep.notify(); // 通知更新
        }
      });
    }
    
    // 代理data属性到Vue实例
    proxyData(key) {
      Object.defineProperty(this, key, {
        get() {
          return this.$data[key];
        },
        set(newVal) {
          this.$data[key] = newVal;
        }
      });
    }
  }

  // 依赖收集器
  class Dep {
    constructor() {
      this.subs = [];
    }
    
    addSub(sub) {
      this.subs.push(sub);
    }
    
    notify() {
      this.subs.forEach(sub => sub.update());
    }
  }

  // 观察者
  class Watcher {
    constructor(vm, key, cb) {
      this.vm = vm;
      this.key = key;
      this.cb = cb;
      
      Dep.target = this;
      this.vm[this.key]; // 触发getter，收集依赖
      Dep.target = null;
    }
    
    update() {
      this.cb.call(this.vm, this.vm[this.key]);
    }
  }
}

// pinia
const useUserStore = defineStore({
  state : () => {
    age: 0;
    useName: '';
  },

  getters: {
    nextAge: (state) => state.age + 1
  },

  actions: {
    increment () {
      this.age++
    },

    incrementAsync () {
      await new Promise(resolve => setTimeout(resolve, 1000))
      this.increment()
    }
  }
})

// promise.race失败重传
{
  const retryableRace = (promiseFactories, maxRetries = 3) => {
    const controllers = new Set();
    const promises = promiseFactories.map(factory => 
      tryRunWithRetry(factory, maxRetries, controllers)
    );

    return Promise.race(promises).finally(() => {
      controllers.forEach(c => c.abort());
      controllers.clear();
    });
  };

  async function tryRunWithRetry(factory, retriesLeft, controllers) {
    const controller = new AbortController();
    controllers.add(controller);
    
    try {
      return await factory(controller.signal);
    } catch (error) {
      if (retriesLeft > 0) {
        return tryRunWithRetry(factory, retriesLeft - 1, controllers);
      }
      throw error; // 重试耗尽时传播错误
    } finally {
      controllers.delete(controller);
    }
  }
}

// fetch实现超时
function fetchWithTimeout(url, options = {}, timeout = 5000) {
  // 创建AbortController实例用于取消请求
  const controller = new AbortController();
  const { signal } = controller;
  
  // 设置fetch请求
  const fetchPromise = fetch(url, {
    ...options,
    signal // 将signal传递给fetch
  });
  
  // 设置超时Promise
  const timeoutPromise = new Promise((_, reject) => {
    const timer = setTimeout(() => {
      controller.abort(); // 超时后取消请求
      reject(new Error('Request timeout'));
    }, timeout);
    
    // 请求完成后清除定时器
    fetchPromise.finally(() => clearTimeout(timer));
  });
  
  // 使用Promise.race竞争请求和超时
  return Promise.race([fetchPromise, timeoutPromise]);
}

// 串行promise
function promiseSeries(tasks, retryTimes) {
  // 内部函数，用于执行单个任务，并重试指定次数
  function runTask(task, retryCount) {
    return new Promise((resolve, reject) => {
      task()
        .then(resolve)
        .catch((error) => {
          if (retryCount > 0) {
            console.log(`任务失败，正在重试... 剩余重试次数：${retryCount - 1}`);
            runTask(task, retryCount - 1).then(resolve).catch(reject);
          } else {
            reject(error);
          }
        });
    });
  }
  // 串行执行任务
  let result = Promise.resolve();
  tasks.forEach((task) => {
    result = result.then(() => runTask(task, retryTimes));
  });
  return result;
}

// 封装一个函数能最快返回传入的promise参数是不是pending状态
function isPromisePending(p) {
    if (!(p instanceof Promise)) {
      return false;
    }

    let isPending = true;
    
    // 创建一个竞争Promise，无论p是resolve还是reject都会执行
    Promise.race([
      p,
      Promise.resolve() // 立即resolve的Promise
    ])
    .then(() => {
      isPending = false;
    })
    .catch(() => {
      isPending = false;
    });

    // 由于then/catch是异步的，这里会立即返回
    return isPending;
}

// 改造promise.all，无论成功失败，都返回每一个promise的结果信息
const importPromiseAll = (promises) => {
  const importedPromises = promises.map(p => {
    Promise.resolve(p)
      .then(res => ({status: 'fulfilled', value: res}))
      .catch(err => ({status: 'rejected', reason: err}))
  })

  return Promise.all(importedPromises)
}

// fetchWithLimit
async function fetchWithLimit(urls, limit) {
  const results = [];
  const executing = new Set();
  
  for (const url of urls) {
    // 如果当前执行的请求数达到限制，等待其中一个完成
    if (executing.size >= limit) {
      await Promise.race(executing);
    }
    
    const promise = fetch(url)
      .then(response => response.json())
      .then(data => {
        results.push(data);
        executing.delete(promise);
      });
    
    executing.add(promise);
  }
  
  // 等待所有剩余请求完成
  await Promise.all(executing);
  return results;
}

// 统计一段文字中出现最多的单词及次数
{
  function findMostFrequentWord(text) {
    // 1. 将文本转换为小写并分割成单词数组
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    
    // 2. 统计每个单词出现的次数
    const frequencyMap = {};
    words.forEach(word => {
      frequencyMap[word] = (frequencyMap[word] || 0) + 1;
    });
    
    // 3. 找出出现次数最多的单词
    let maxCount = 0;
    let mostFrequentWord = '';
    
    for (const word in frequencyMap) {
      if (frequencyMap[word] > maxCount) {
        maxCount = frequencyMap[word];
        mostFrequentWord = word;
      }
    }
    
    return {
      word: mostFrequentWord,
      count: maxCount
    };
  }

  // 示例用法
  const text = "Hello world hello JavaScript world world";
  const result = findMostFrequentWord(text);
  console.log(`出现最多的单词是: "${result.word}", 出现了 ${result.count} 次`);
}

// 倒计时器
class CountDown {
  constructor (count, options = {}) {
    this.initialCount = count
    this.count = count
    this.timer = null
    this.status = 'idle' // 'idle','running','paused','ended'

    this.interval = options.interval || 1000
    this.onTick = options.onTick || (() => {})
    this.onComplete = options.onComplete || (() => {})
  }

  start () {
    if (this.status === 'running') return
    this.status = 'running'
    this._decrement()
  }

  _decrement () {
    if (this.count <= 0) {
      this._complete()
      return
    }

    this.onTick(this.count)

    console.log(this.count--)

    this.timer = setTimeout(() => {
      this._decrement()
    },this.interval)

  }

  _complete () {
    clearTimeout(this.timer)
    this.timer = null
    this.status = 'ended'
    this.count = 0
    this.onComplete()
  }

  pause () {
    if (this.status !== 'running') {
      console.log('')
      return
    }
    this.status = 'paused'
    clearTimeout(this.timer)
    this.timer = null
  }

  resume () {
    if (this.status !== 'paused') {
      console.log('')
      return
    }
    this.status = 'running'
    this._decrement()
  }

  restart () {
    this.destroy()
    this.count = this.initialCount
    this.status === 'idle'
    this.start
  }

  destroy() {      
    clearTimeout(this.timer)
    this.timer = null
    this.status = 'ended'
    this.count = 0
  }

  getState() {
    return {
      count: this.count,
      initialCount: this.initialCount,
      status: this.status,
      progress: `${((this.initialCount - this.count) / this.initialCount) / 100}%` 
    }
  }
}

// compile函数 模板替换
function compile(template) {
  const regex = /\{\{([^}]+)\}\}/g;
  return function(data) {
    return template.replace(regex, (match, path) => {
      const keys = path.trim().split('.');
      return keys.reduce((obj, key) => obj?.[key], data) || '';
    });
  };
}

// class 关键字实现
{
  function inheritPrototype(subClass, superClass) {
    // 复制一份父类的原型
    var p = copy(superClass.prototype);
    // 修正构造函数
    p.constructor = subClass;
    // 设置子类原型
    subClass.prototype = p;
  }

  function Parent(name, id){
    this.id = id;
    this.name = name;
    this.list = ['a'];
    this.printName = function(){
      console.log(this.name);
    }
  }
  Parent.prototype.sayName = function(){
    console.log(this.name);
  };
  function Child(name, id){
    Parent.call(this, name, id);
    // Parent.apply(this, arguments);
  }
  inheritPrototype(Child, Parent);

}

// 劫持appendChild
{
  const containerEle = document.getElementById('container')
  const originalAppendChild = containerEle.appendChild
  containerEle.appendChild = (iframeEle) => {
    iframeEle.setAttribute('allowfullscreen', 'true')
    return originalAppendChild.call(containerEle, iframeEle)
  }
}

// 图片懒加载
{
  document.addEventListener("DOMContentLoaded", () => {
    const lazyImages = document.querySelectorAll('img.lazy');

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src; // 加载真实图片
            img.classList.remove('lazy');
            observer.unobserve(img); // 停止观察已加载的图片
          }
        });
      });

      lazyImages.forEach(img => {
        observer.observe(img);
      });
    } else {
      // 不支持 IntersectionObserver，回退为直接加载
      lazyImages.forEach(img => {
        img.src = img.dataset.src;
        img.classList.remove('lazy');
      });
    }
  });
}

// 矩阵旋转90度
{
  function rotate(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const res = [];

    for (let i = 0; i < cols; i++) {
      res[i] = [];
      for (let j = rows - 1; j >= 0; j--) {
        res[i].push(matrix[j][i]);
      }
    }

    return res;
  }
}

// 手写三角形
{
  // .triangle {
  //   height: 0;
  //   width: 0;
  //   border-left: 50px solid transparent;
  //   border-right: 50px solid transparent;
  //   border-bottom: 100px solid red;
  // }

}

// 实现一个 parseQuery 函数,输入一个 query 字符串(例如:?name=Alice&age-20&city-Beijing),返回一个对象{name: 'Alice',age:"20',city:'Beijing*}.如果 query 参数中出现重复的key,value 变成数组.
function parseQuery(queryString) {
  // 移除开头的问号(如果有)
  const query = queryString.startsWith('?') ? queryString.slice(1) : queryString;
  
  // 如果字符串为空，返回空对象
  if (!query) return {};
  
  const result = {};
  
  // 分割参数对
  const pairs = query.split('&');
  
  for (const pair of pairs) {
    // 分割键值对
    const [key, value] = pair.split('=');
    
    // 如果键已存在
    if (result.hasOwnProperty(key)) {
      // 如果已经是数组，直接push新值
      if (Array.isArray(result[key])) {
        result[key].push(value);
      } else {
        // 如果不是数组，转换为数组
        result[key] = [result[key], value];
      }
    } else {
      // 键不存在，直接赋值
      result[key] = value;
    }
  }
  
  return result;
}

/**
 * Scheduler实现 字节和快手都考了
 * const scheduler = new Scheduler(2);
 * const addTask = (time, value) => {
 * scheduler.add(() => new Promise(resolve => setTimeout(() => resolve(value), time)));};
 * addTask(1000, '1'); addTask(500, '2'); addTask(300, '3'); addTask(400, '4');
 */
class Scheduler {
  constructor(max) {
    this.max = max; // 最大并发数
    this.count = 0; // 当前运行任务数
    this.queue = []; // 等待队列
  }

  add(task) {
    return new Promise((resolve, reject) => {
      const wrappedTask = () => {
        return task().then(resolve, reject).finally(() => {
          this.count--;
          this._next();
        });
      };

      if (this.count < this.max) {
        this.count++;
        wrappedTask();
      } else {
        this.queue.push(wrappedTask);
      }
    });
  }

  _next() {
    if (this.queue.length > 0 && this.count < this.max) {
      this.count++;
      const task = this.queue.shift();
      task();
    }
  }
}

// LRU


