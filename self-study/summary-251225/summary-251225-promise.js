function sendmsg(name, onFulffiled, onRejected){

}
//call back hell
sendmsg(
    'kevin',
    (reply)=>{
        console.log(reply);
    },
    (reply)=>{
        console.log(err);
        sendmsg(
            'john',
            (reply)=>{
                console.log(reply);
            },
            (err)=>{
                sendmsg(
                    'mary',
                    (reply)=>{
                        console.log(reply);
                    },
                    (err)=>{
                        sendmsg(
                            'tom',
                            (reply)=>{
                                console.log(reply);
                            },
                            (err)=>{
                                console.log(err);
                            }
                        )
                    }
                )
            }
        )
    }
)

sendmsg()

//promise处理异步场景 规范promise A+；所有异步场景看作是异步任务（JS中是对象，promise对象/任务对象）
//每个任务对象 两个阶段（unsettled，pending） 三个状态（fulfilled，rejected，settled）状态无法逆行 一旦完成/失败 状态就固定了
//挂起->完成 resolve/reject 成功有相关数据；失败有失败原因

//promise API
const pro = new Promise((resolve, reject)=>{
    console.log('task start');
    const duration = Math.floor(Math.random()*1000);

    setTimeout(()=>{
        if(Math.random() > 0.5){
            resolve('success');
        }else{
            reject('failure');
        }
        },duration);
});
console.log(pro);
//promise后续处理
pro.then(
    (data)=>{
        console.log('oh yeah!', data);
    },
    (reason)=>{
        'oh no',data
    }
    
)

//exercise1
//1.完成下面的函数
/**
 * 延迟一段指定的时间
 * @param {Number} duration 等待的时间
 * @returns {Promise} 返回一个任务,该任务在指定的时间后完成
 */
function delay(duration) {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve();
        },duration);
})
}

delay(1000).then(()=>{
    console.log('finish');
})
// 2.按照要求,调用delay函数,完成程序
// 利用delay函数,等待1秒钟,输出:finish

//exercise2
// 根据指定的图片路径,创建一个img元素
// 该函数需要返回一个Promise,当图片加载完成后,任务完成,若图片加载失败,任务失败
// 任务完成后,需要提供的数据是图片DOM元素;任务失败时,需要提供失败的原因
// 提示: img元素有两个事件,load事件会在图像加载完成时触发,error事件会在图像加载失败时触发
function createImage(imgUrl) {
    return new Promise((resolve, reject) => {
        // Promise executor function body
        const img = document.createElement('img');
        img.src = imgUrl;
        img.onload = () => {
            console.log('loaded');
            resolve(img);
    };
        img.onerror = (e) => {
            console.log('failed');
            reject(e);
}
    })
}

// 使用createImage函数创建一个图像,图像路径自行定义
// 当图像成功加载后,将图像宽高显示在p元素中,当图像加载失败后,输出加载失败的原因
const url = 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png';
createImage(url).then(
    (img)=>{
        const p = document.querySelector('.label');
            p.innerHTML = `${img.width}x${img.height}`;
        },
    (reason)=>{
        console.log(reason);
})

// 使用createImage函数创建一个图像,图像路径自行定义
// 当图像成功加载后,将图像元素加入到container容器中,当图像加载失败后,输出加载失败的原因
createImage(url).then(
    (img)=>{
        const div = document.querySelector('.container');
        div.appendChild(img);
    },
    (reason)=>{
        console.log(reason);
    }
)

//exercise3
// 你无知道该函数是如何实现的!!!
// 调用该函数,会远程加载省份数据
// 函数返回一个Promise,成功后得到省份数组,失败时会给予失败原因
function getProvinces() {
    return fetch('https://study.duyiedu.com/api/citylist')
      .then((resp) => resp.json())
      .then((resp) => resp.data)
      .then((resp) =>
        resp.map((it) => ({ value: it.value, label: it.label }))
      );
  }

  getProvinces().then(
    (ps)=>{
        ps.map(p=> <option value="${p.value}">${p.label}</option>).join('');
        const selProvince = document.getElementById('selProvince');
        selProvince.innerHTML = html;
    },
    reason=>{
        console.log(reason);
    })
  
// 利用getProvinces函数,将省份数据加载到select元素中

//exercise4
// 下面的任务最终状态是什么,相关的数据或失败原因是什么,最终输出什么
new Promise((resolve, reject) => {
    console.log('任务开始');
    resolve(1); //status:fulfilled,data:1
    reject(2); //无效
    resolve(3);  //无效
    console.log('任务结束');
  });
  
  new Promise((resolve, reject) => {
    console.log('任务开始');
    resolve(1);
    resolve(2); //无效
    console.log('任务结束');
  });


const pro1 =new Promise((resolve)=>{
    console.log('task start');
    resolve();
})

pro1.then(()=>{ //then处理成功 当前代码执行
   console.log('task finish');
})
//catch（）处理失败 当前代码不执行

//常见任务处理方式
pro.then(处理1).catch(处理2)
pro.then(处理1).then(处理2)
pro.then(处理1).then(处理2).catch(处理3)

//promise静态方法
Promise.resolve(value)
// new promise(()=>{
//     resolve(value)
// })

const pro2 = Promise.all([
    Promise.resolve(1),
    Promise.reject(2),
    Promise.resolve(3)
]) //任务全部成功则成功
setTimeout(()=>{
    console.log(pro2);
},1000);

//promise.allSettled 任务数组全部已决则成功
//promise.race 任务数组任一已决则已决 状态和其一致

//exercise5 - fetchStudents 
/**
 * 根据页码获取学生数据,返回Promise
 * @param {Number} page 页码
 */
function fetchStudents(page) {
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if (Math.random()>0.1){
                resolve({
                    page:page,
                    data:[`student${page}-1`, `student${page}-2`, `student${page}-3`]
                });
            }else{
                reject(new Error(`Page ${page} fetch failed`));
            }
        },Math.random()*1000);
    })
}

// 利用 fetchStudents 函数,完成下面的练习

// 练习1: 获取1-10页的学生,最终按照页码的顺序合并成一个数组,任何一页的数据获取出现错误,则任务不再继续,打印错误消息
// Promise.all
const proms = new Array(10).fill(1).map((it,i)=>i+1);
Promise.all(proms)
    .then((results)=>{
        console.log(results.flat());
    })
    .catch((err)=>{
        console.log(err);
    })

// 练习2: 获取1-10页的学生,最终按照页码的顺序合并成一个数组,如果某些页码的数据获取失败,就不加入该数据即可
// Promise.allSettled
Promise.allSettled(proms).then((results)=>{
   return result.filter(r=>r.status==='fulfilled').map((it)=>it.value).flat()
})

// 练习3: 获取1-10页的学生,打印最先获取到的数据,如果全部都获取失败,则打印所有的错误消息
// Promise.any (如果支持)
Promise.any(proms)
    .then((result)=>{
        console.log(result);
    })
    .catch((err)=>{
        console.log(err.errors);
    })

// 练习4: 获取1-10页的学生,打印所有成功的数据,如果全部失败则打印错误
// 结合 Promise.allSettled 和错误处理
Promise.race(proms).then(
    (result)=>{
        console.log(result);
    })
    .catch((err)=>{
        console.log(err)
    })


//async await 消除异步场景回调
//async（语法糖）修饰的function返回一定是promise
async function method(){
    return 1
}//return promise or value after resolve

method()  //promise{1}

//await 等待某个promise完成 它必须在async function中
async function test(){
    return await Promise.resolve(1)
}
test()  //promise{1}

//IIFE
(async ()=>{
    await method(1000)
    console.log('done')
})()





















