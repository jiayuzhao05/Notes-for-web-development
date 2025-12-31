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