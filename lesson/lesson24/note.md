类才有生命周期

useState() 管理状态 记忆 set更新函数
useEffect 副作用(发送网络请求 手动修改DOM 修改定时器) 生命周期 useEffect(()=>{},[])

[]在函数式组件里 只执行一次

启动文件 yarn install - yarn dev

footer(props)默认隐藏对象
hooks是状态改变器 状态驱动UI

组件大写Footer not footer


 H5封装HTMLVideoElement 实现自己的视频播放器

 如果使用变量 需要使用变量声明

 组件(props,state)


 link引用css写在顶部<header>
 浏览器解析HTML从上到下 如果css写在<body>底部 浏览器会先渲染没有样式html(白底黑字 布局错乱)读到底部css再渲染一次 用户看到页面闪一下变好看

'''
<head>
  <link rel="stylesheet" href="style.css">  <!-- 优先加载 -->
</head>
<body>
  <h1>内容</h1>
</body>
'''
浏览器渲染页面需要DOM树(来自HTML)和CSSOM树(CSS)
只有两棵树都准备好，才能合成 Render Tree 显示出来。CSS 是渲染阻塞资源,越早开始下载越好
放在顶部 = 浏览器尽早开始下载 CSS，DOM 解析和 CSS 下载可以并行