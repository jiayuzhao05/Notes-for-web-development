类才有生命周期

useState() 管理状态 记忆 set更新函数
useEffect 副作用(发送网络请求 手动修改DOM 修改定时器) 生命周期 useEffect(()=>{},[])

[]在函数式组件里 只执行一次
