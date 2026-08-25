
AI 归档为长期记忆
自动记忆： 几十条 ~ 100 条，超出可能覆盖旧记忆
自定义指令： 512MB 单个文件  每条记忆占用 token，总量有限（几千 token 量级）

涉及到LRU算法（Least Recently Used:最近最少使用的内容优先被淘汰;- 记忆满了 → 最久没用的记忆被删掉，新的记忆写入） 
但是有风险（重要但很久没触发的记忆可能被误删；记忆之间可能冲突或过时）


实参 vs 形参 
形参：函数定义时声明的参数名 出现在函数签名
实参：函数调用时传入的真实值 调用处

实参按位置传给形参：第 1 个实参 → 第 1 个形参
实参个数和形参个数可以不一致（JS 不强制检查）
实参少了 → 多出来的形参是 undefined
实参多了 → 多出来的实参被忽略（除非用 arguments 或 rest ...args）

this作用：
DOM事件 回调里操作触发事件元素本身（改样式，禁用按钮）
类/构造函数：指向实例
React 类组件、传统 OOP 里，实例方法通过 this.state、this.setState 访问当前组件状态

bind永久绑定
react类组件里this.handleClick = this.handleClick.bind(this)

this代表当前函数替谁干活