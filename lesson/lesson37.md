PWA 可以提供offline support，当APP没有网络时候 平时是基于HTTP请求 使用Service worker下载内容 相当于模仿原生APP能力

而支付宝的线下支付可能与NFC 芯片有关

react 16 fiber 架构

react默认行为 class.name update() use.memo() 浅比较

C,C++,TS都是静态语言 提前需要知道类型 不像JS动态语言 直到运行这一行代码才知道类型 架构不稳定 弱语言会转化为强语言 比如内部JS会转化成TS

useContext 发布-订阅机制 provider改变，浅比较

lazy loading <suspense></> 属于react内置组件 类似<math></> <data></>
react.lazy 配合<suspense> lazy loading 相当于占位符
占位符原理：DFS 中断 内部fiber调度

<suspense fallback="div loading">
<异步组件>
</suspense>

暂停渲染 转而渲染foreback 不需要useeffect统一管理和状态
状态：挂起 suspend
于是抛出promise 不是抛出错误 捕获promise 中止渲染
属于foreback
promise.then().fulfilled -> react得到 内部子组件调度

输入法有自己的生命周期

service worker相当于独立于主线程的脚本 不参与UI 相当于代理 处理缓存等事项

material UI = 原子CSS组成

return是useEffect专属的清理函数 （react 18）

创造新函数 != 创造新函数实例

原子CSS是tailwind创造的 函数对象 内存地址不同 但是内存不会爆炸 因为有GC（指针断掉后 垃圾回收）
