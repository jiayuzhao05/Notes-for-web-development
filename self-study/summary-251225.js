// bundler:多个源文件和资源合并、转换并输出为浏览器可运行的文件工具
//源代码（多个文件）
//↓
//[打包器处理]
//    ↓
//输出文件（1个或多个 bundle）

//能解决的问题:模块依赖管理,资源处理,代码转换,代码优化：压缩、Tree Shaking、代码分割,浏览器兼容
//为什么需要打包器? 不支持ES Module(老浏览器) 不支持TS,JSX等;多个小文件请求性能差;不支持CSS预处理器(Sass,Less)
//打包器将模块化代码转换为浏览器可执行格式;合并文件 减少HTTP请求;转换高级语法为兼容代码;优化代码体积和性能

// webpack.config.js
const path = require("path")
module.exports = {
    entry: "./src/main.js",        // 入口
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js",
    },
    module: {
        rules: [
            // Loader 配置
        ]
    },
    plugins: [
        // Plugin 配置
    ],
    mode: "development",
}

// vite.config.ts (现代化)
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { createVerify } from 'crypto'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
//HMR 速度快
//生产构建用rollup (适合库打包,tree shaking效果好,输出格式多样（ESM、CJS、UMD）)
//配置简单


//webpack核心概念
{
    // 1. Entry（入口）
    entry: "./src/main.js",
    
    // 2. Output（输出）
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "main.js",
    },
    
    // 3. Loader（加载器）
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ]
    },
    
    // 4. Plugin（插件）
    plugins: [
      new HtmlWebpackPlugin()
    ],
    
    // 5. Mode（模式）
    mode: "development" // 或 "production"
  }

//样式不生效,如何调试确定问题?
// 看computed选项卡 show all styles 绝对定位元素和浮动元素 float:desk 盒类型是block
// 样式计算过程(浏览器渲染管线第2步)
//确定声明值
//层叠
//继承
//使用默认值

//important不是权重 是优先级

//什么是css原子化?优势劣势?
// atomic css css 原子化 
// tailwind css unocss windi css
/*.text-red{
    color:red;
    width:100px;
    padding:10px;
}
.p-6{
    padding:6px;
}
*/

//劣势:吃团队配置 可读性差 但可以通过组件化(css组件化) 打包体积 css tree-shaking;purgeCSS,uncss

//难点在工程化,源码

// BFF? 作用？
// Backend For Frontend 后端为前端服务 会加中间层 nodejs吞吐量很好+ 最好前端写 清楚哪些API

//用户登录前 确定ta是谁？
// uuid:全局唯一标识符 不可变 不可预测 不可伪造
// 浏览器指纹 fingerprint.js 客户端生成 相对唯一+ 指纹浏览器（收费）（跨境电商 tiktok）
// ip地址 少用 用户可以伪装

//如何设置精准的setinterval？

//为什么不精确？
//1.事件循环模型影响回调执行时机
//2.4ms最小事件（嵌套5层以上后） whatwg wpt.fyi cve-update
//3.失活页面间隔强制调整1s

//1. 根据performance.now通过时间调整间隔偏差
//2.  requestAnimationFrame 渲染桢不受页面失真影响 会受到其他影响 可以和1配合使用
// 3. webworker 不受到失活页面影响 不受渲染桢影响

//如何判断一个属性是否存在？
//1. boolean判定
//2. undefined判定
//3. object.keys() 判断属性是否存在
// 4. Object.hasOwnProperty()  Reflect.hasOwnProperty() 该方法不看prototype
// 5. in    Reflect.has()  看prototype

// 文件指纹是什么？ 前端工程化中有何作用？
// 文件指纹： 用hash/校验和生成的文件唯一标识 该标识对文件内容敏感
/* 以前加版本号 
<script src="main.js?v=1.0.0"></script>
图片 css会加入缓存； html不加入缓存*/


// 箭头函数作用？ 消除二义性
// 八股文问题 简短 一针见血；场景题 项目难点 知无不言

// 何时发生重排＆ 重绘？
/* 重排： 所有对布局树更改，堆布局树的读取 都会引发重排
更改，异步重排 */
dom.style.width='100px';
dom.style.heigtht='100px';
dom.style.border='1px solid red';

//读取，同步重排
dom.style.width='0px';
dom.style.transition='1s';
dom.clientHeight;
dom.style.width='100px';

//布局树和dom树不是一一对应，布局树是dom树的子集

//重绘： 对所有非几何信息读写造成的可见样式的变化引发重绘
//当元素的样式改变不影响布局（不在文档流中的位置和尺寸）时，浏览器重新绘制元素外观
//触发重绘的场景：
//1. 颜色相关：color, background-color, background-image
//2. 边框样式：border-color, border-style, outline-color, outline-width
//3. 阴影：box-shadow, text-shadow
//4. 透明度：opacity (0-1之间)
//5. 可见性：visibility (hidden/visible)
//6. 文本装饰：text-decoration
//注意：重排(回流)一定会触发重绘，但重绘不一定触发重排

//选择结果为true的表达式
/* null instanceof Object  //fasle
1 instanceof Number //false
1 instanceof Object //false
Number(1) instanceof Number //false
Number(1)   //1
new Number(1)   //[Number: 1]
Number(1).__proto__ === Number.prototype //true 原始类型当做对象去使用时候 js做隐式转换 帮助转换成对象
// Number(1)本身返回原始值1，但当访问.__proto__属性时，
// JS引擎会临时将原始值包装成Number包装对象(相当于new Number(1))，这个过程叫做"装箱/Boxing"，包装后的对象.__proto__指向Number.prototype
// 访问完成后，临时对象会被丢弃，不会影响原始的Number(1)值

Number(1) instanceof Number //false
// instanceof检查的是对象原型链，Number(1)返回原始值，不是对象实例
new Number(1).__proto__ === Number.prototype //true   new number(1)是对象
new Number(1) instanceof Number //true
// new Number(1)是Number构造函数的实例，返回Number对象
1..toFixed(2) //"1.00"
// 1.被解析为1.0（浮点数），访问.toFixed时触发隐式装箱,等价于(1).toFixed(2)/Number(1).toFixed(2)
// 其他隐式转换：'hello'.length、true.toString()
*/

//下面哪种动画实现效率最高？
/* 浏览器渲染原理：
主线程：解析->样式计算->布局->分层->绘制
合成线程：分块->光栅化->画
在css动画中改变元素的transform 主线程都不参与 只影响合成线程中的画 最快
*/

//什么是reflect？有什么作用？
/*
可以完成对象基本操作

*/