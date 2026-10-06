函数重新执行

useState 保存组件状态 给react看的数据

useEffect副作用 （和外界通信）和UI对应

useMemo 保存计算结果
useCallback 组件优化 缓存函数引用

useRef 跨render 保存一个可变的值 修改这个可变的值也不触发render 不会让函数重新执行 不需要更新UI变化 平时保存DOM；典型例子：定时器；
相反useState会重新运行一遍

useReducer 管理复杂state
useLayoutEffect DOM更新后一个拦截器机制

每次render都有自己的props state 闭包等等 每次执行都会产生自己的jsx资源 包括整套函数的变量

hooks不能随便调用 必须组件顶层调用
react依靠hooks调用顺序 快照有顺序的 hooks链 对应的数据是他的本体


countRef.current 主要用current 为了留出其他空间万一缓存其他数据
