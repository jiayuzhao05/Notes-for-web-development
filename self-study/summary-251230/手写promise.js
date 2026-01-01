// 3 tatus
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

/**
 * 微队列任务 把传递函数放入为对立
 * @param {*} callback 
 */
function runMicrotask(callback){
    //判断node环境
    if(process&&process.nextTick){
        process.nextTick(callback)
    }else if(MutationObserver){
        const p = document.createElement('p')
        const observer = new MutationObserver(callback)
        observer.observe(p,{
            childlist:true, //观察元素内部变化
        })
        p.innerHTML = '1'
    } else {
        setTimeout(callback,0)
    }
}


class MyPromise{
    /** 创建一个promise
    * @param {function} executor 任务执行器 立即执行
    */
    constructor(executor){
        this._state = 'pending'
        this._data = undefined
        this._handlers = [] //处理函数形成的队列
        try{
           executor(this._resolve.bind(this), this._reject.bind(this))
        }catch(err){
            this._reject(err)
        }
    }


    /**
     * 添加处理函数到队列
     * @param {Function} executor 添加的函数
     * @param {String} state 该函数在什么状态下执行
     * @param {Function} resolve then返回的成功promise
     * @param {Function} reject then返回的失败promise
     */
    _pushHandlers(executor,state,resolve,reject){
        this._handlers.push({
            executor,
            state
        })
    }

    /**
     * 根据实际情况执行队列
     */
    _runHandlers(){
        if(this._state === PENDING){
            //任务挂起
           return;
        }
        while (this._handlers[0]){
            const handler = this._handlers([0])
            this._runOneHandler(handler)
            this._handlers.shift()
        }
    }

    /**
     * 处理一个handler
     * @param {*} handler 
     */
    _runOneHandler(handler){
       runMicrotask(()=>{
        if(this._state !== handler.state){
            //状态不一致不处理
            return
        }
        console.log(this._state)
        console.log(handler)
        if(typeof handler.executor !== 'function'){
            //传递后续处理并非一个函数
            this._state === FULFILLED
            ? handler.resolve(this._value)
            : handler.reject(this._data)
        }
    })
}


    /** promise A+规范的then方法
     * @param {function} onFulfilled 成功回调
     * @param {function} onRejected 失败回调
     */
    then(onFulfilled, onRejected){
        this._pushHandlers(onFulfilled,FULFILLED,resolve,reject)
        this._pushHandlers(onRejected,REJECTED,resolve,reject)
        this._runHandlers() //执行队列
        return new MyPromise((resolve,reject)=>{
            resolve
        })
    }
    /**
     * 仅处理失败场景
     * @param {Function} onRejected 
     * @returns 
     */
    catch(onRejected){
        return this.then(null,onRejected
        )}

    /**
     * 无论成功失败都会执行回调
     * @param {Function} onSettled
     */
    finally(onSettled){
        return this.then(onSettled,onSettled)
    }

    /** 更改任务状态
     * @param {String} newState
     * @param {*} value
     */
    _changeState(newState, value){
        if(this._state !== PENDING){
            return //状态已经更改
        }
        this._state = newState
        this._data = value
        this._runHandlers() //状态变化 执行队列
    }


    /**标记当前任务完成
    * @param {any} value 完成后的数据
    */
    _resolve(data){
        //改变状态和数据
        console.log('resolve', data)
    }
    /**标记当前任务失败
    * @param {any} reason 失败后的原因
    */
    _reject(reason){
        //改变状态和数据
        this._state = 'rejected'
        this._data = reason
        console.log('reject', reason)
    }
}
const p = new Promise((resolve, reject)=>{
    resolve(123)
    reject(456)
},1000)


setTimeout(()=>{
    p.then(function A2(){})
})
console.log(p)

//.then()
p.then(
    (data)=>{
        console.log('success', data)
    },
    (reason)=>{
        console.log('error', reason)
    }
)


//接下来不是A+规范
// MyPromise.prototype.catch = function