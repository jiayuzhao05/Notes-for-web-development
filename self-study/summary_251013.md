**问题：**

空元素:img,br,input,link,meta？



**Advanced Styling**

Selector

basic：元素、类、ID、属性、伪类、伪元素

combinator：后代（空格）、子代（>）、相邻兄弟（+）、通用兄弟（~）

练习了[[CSS editor]](https://flukeout.github.io/)

```js
bento:nth-of-type(1)
bento:nth-child(2)# 相对于父元素的所有子元素计数

plate:nth-child(even)
plate:nth-child(2n)
:nth-child(odd) 

plate:nth-child(2n+3)
plate:nth-child(2) apple
plate:nth-of-type(2) apple

orange:last-of-type, apple:last-of-type
.small:last-of-type
//CSS 的 nth-of-type() 不支持负数索引

:nth-last-of-type(1)    /* 从后数第1个同类型 = last-of-type */
:nth-last-child(1)      /* 从后数第1个子元素 = last-child */

bbento:empty

apple:not(.small) //选没有class的苹果(大苹果)

[for] - 属性存在选择器
plate[for] -  元素 + 属性选择器
[for^="Sa"] - for 属性值以 "Sa" 开头的元素
[for$="ato"] - for 属性值以 "ato" 结尾的元素
[for*="obb"] - for 属性值包含 "obb" 的元素

.container > div
//.container - 选择 class 为 "container" 的元素
//> - 直接子选择器（只选择直接子元素，不包括孙子元素）

#id    id=“firstname”
element element            元素内的所有 元素
element>element       div > p          ⽗元素是的所有元素
element+element         div+p      紧跟元素的⾸个元素
element1~element2           p ~ ul        选择前⾯有元素的每个元素
[attribute]        [target]            选择带有 target 属性的所有元素
[attribute=value]         [target=_blank]       选择带有 target=“_blank” 属性的所有元素
[attribute~=value]            [title~=flower]   选择 title 属性包含单词 “flower”的所有元素
[attribute^=value]       a[href^=“https”]    选择其 src 属性值以 “https” 开头的每个元素
[attribute$=value]        a[href$=“.pdf”]        选择其 src 属性以 “.pdf” 结尾的所有元素
[attribute*=value]       a[href*=“w3schools”]    选择其 href 属性值中包含 “abc” ⼦串的每个元素
:first-of-type        p:first-of-type        选择属于其⽗元素的⾸个元素的每个元素
:indeterminate       input:indeterminate          选择处于不确定状态的input元素
:link                a:link                选择所有未访问过的链接
:nth-child(n)       p:nth-child(2)        选择属于其⽗元素的第⼆个⼦元素的每个元素
:nth-of-type(n)         p:nth-of-type(2)     选择属于其⽗元素第⼆个元素的每个元素
:only-of-type         p:only-of-type          选择属于其⽗元素唯⼀的元素的每个元素

```

Icon:

Icon Font, SVG 图标

装饰性图标加aria-hidden="true",为信息图标提供可访问名称



web fonts：

引入 @font-face  / google fonts

应用：字体栈、回退字体、font-display



CSS filters & animation：

渐变 linear-gradient()

滤镜 filter: blur/brightness/contrast/saturate

动画 @keyframes, animation- * 属性；过渡transition

尽量用合成层属性，慎用滚动视差，关注性能



Layouts

CSS columns

column-count, column-gap, column-rule, column-span

连续文本“报纸式分栏”，比如New york Times；内容顺序按照文流自动分配；可以实现“masonry”瀑布流效果，不同高度项自动填充，但不擅长精准网格控制



Flexbox 一维布局

content-out，控制一维（row/column)对齐和分配

场景: navigation bar,均匀分配的卡片,可换行的列表

关键点:主轴/交叉轴,justify-content,align-items,flex-wrap,gap,flex:grow shrink basis



CSS grid 网格 二维布局

layout-in

场景：页面骨架、dashboard\瀑布卡片落位、复杂报纸编排

Key: grid-template-rows/columns\grid-template-areas、fr单位、自动放置



Flexbox vs Grid

**Flexbox 让内容“自我分配”空间，Grid先定板式再放内容**

按行/列控制 -> Flexbox

行和列控制 -> Grid



Responsive Design

Media Query: 按照宽度、分辨率等切换样式

Mobile-first: 移动端样式，为更大屏幕添加min-width断点

key：弹性单位（%, vw, vh, rem），流式图片（max-width: 100%），断点（依据设计而不是设备型号）

| 响应式布局 | 定义                                                         | 用处                      |
| ---------- | ------------------------------------------------------------ | ------------------------- |
| 媒体查询   | 针对不同的媒体类型定义不同的样式，当重置浏览器窗⼝⼤⼩的过程中，⻚⾯也会根据浏览器 的宽度和⾼度重新渲染⻚⾯ | 设置边框和边距的时候⽤ px |
| 百分比     | 使得浏览器中组件的宽和⾼随着浏览器的⾼度的变化⽽变化         |                           |
| vw/vh      | vw 是根据窗⼝的宽度。会把窗⼝的⼤⼩分为100份，所以50vw代表窗⼝⼤⼩的⼀半。并且这个值是相对 的，当窗⼝⼤⼩发⽣改变也会跟着改变，同理，vh则为窗⼝的⾼度 |                           |
| rem        | 出现是为了解决em的问题，rem是相对于根元素，只需要在根元素确定⼀个参考值，就可以了，同时还能做到只修改根元素就成⽐例地调整所有字体⼤⼩ | 需要做响应式的⻚⾯⽤ rem  |

Accessibility（a11y）

读屏兼容：语义化标签、可聚集的交互空间、表单标签、描述

键盘可用性：焦点样式、Tab顺序、空格触发

色彩和对比度：不需要只靠颜色传递信息

替代文本：为图片和装饰图像提供alt，为视频加字幕、说明



CSS Resets & Frameworks

box-sizing：border-box 宽高计算更加直观（包含padding/framwork)

reset vs normalize：

reset：清零浏览器默认样式（比如Eric meyer Reset）

normalize：保留合理默认并统一差异

bootstrap framework

组件库+栅格系统、快速一致的UI

------------------------------------

**八股：**

渲染模式：

CSS1 Compat：标准模式（Strick mode），浏览器使⽤W3C的标准解析渲染⻚⾯。浏览器以其⽀持的最⾼标准呈现⻚⾯。 BackCompat：怪异模式(混杂模式)(Quick mode)，默认模式，⻚⾯以⼀种⽐较宽松的向后兼容的⽅式显示。



html语义化利于seo，优化搜索引擎，让用户在搜索和网站有关的关键词，排名尽量靠前



<meta>描述属性：搜索引擎优化seo，定义页面使用语言，自动刷新并指向新页面，实现网页转换动态效果，控制页面缓冲，网页定级评价，控制网页显示窗口

(1) name: keywords,description,author,robots

(2) http-equiv: expires,pragma,refresh,set-cookie,window-target,content-type(显示字符集设定）

(3)content：根据name和http-equiv决定此项填写什么字符串



href=hypertext reference 建立和当前元素或文档link之间的连接，并行下载资源不停止对当前文档的处理，所以用link加载css，而非import。因为CSS文件下载是串行的，浏览器先下载并解析主样式，读到@import再去请求被导入的文件，阻塞渲染，延迟样式加载。而且嵌套@import会导致多层依赖、调试困难，老旧浏览器也会碰到兼容性问题

```js
<link href="path" rel="stylesheet" type="text/css"/>

@import url(path)
```



行内元素 inline /inline-block 的内联元素设置外边界和内边界（ie6中不对上下起作用），都只对左右起作用

```js
<a>
<strong>
<b>
<em>
<del>
<span>
<img>
<input>
<select>
```

块级元素 block 宽度和浏览器宽度永远一致，可以容纳内联元素和其他块元素

```js
<h1>~<h6>
<p>
<div>
<ul>
<ol>
<li>
<div>
<dl>
<form>
<table>
```

行内块级元素：和行内类似，可设置宽高

```
button ，img ， input, select, label，textarea
```

空元素:img,br,input,link,meta

伪元素：元素指定部分修改样式     :before, :after,: first-line

伪类：特殊状态修改样式    :hover, :active, :checked, :focus, :fisrt-child

```js
.parent {
font-size: 32px  //固定像素单位，⼀个像素表示终端屏幕能显示的最⼩的区域
font-size:.5em
width:2em  //作为 font-size 的单位时，代表⽗元素的字体⼤⼩按⽐例计算值，作为其他属性单位时，代表相对⾃身
字体⼤⼩按⽐例计算值
font-size:2rem //CSS3新增,相对于根元素字体⼤⼩按⽐例计算值；作⽤于根元素字体⼤⼩时，相对于其出初始字体⼤
⼩（16px）
}}
//vw 相对于视图窗⼝宽度，视窗宽度为100vw    20vw == 视⼝宽度/10020
//vh 相对于视图窗⼝⾼度，视窗⾼度为100vh   20vh == 视⼝⾼度/10020
//rpx是微信⼩程序独有的，解决屏幕⾃适应的尺⼨单位
// iPhone6的屏幕宽度为375px，有750个物理像素，则750rpx=375px=750个物理像素; 1px=2rpx
```

改变元素位置，可以使用translate让浏览器为元素创建GPU图层，动画元素在独立曾中渲染，无需重绘；同理，visibility（重绘）— display（回流）；也可以先离线DOM（display:none)(有一次回流)再修改；不要把DOM节点属性值放在一个循环当作循环里的变量；不要使用table布局，小变动会使得重新布局；动画速度快，回流多，选择requestAnimationFrame；CSS选择符从右往左匹配查找；只触发一次回流，documentFragment创建DOM文档，批量操作DOM，完成后添加到文档



盒子模型 vs 怪异盒布局：区别是width是否包含padding和border

圣杯布局 vs 双飞翼布局

BFC （同⼀个元素不能同时存在于两个 BFC 中）

IFC（⾏级格式化上下⽂）- inline 内联 GFC（⽹格布局格式化上下⽂）- display: grid FFC（⾃适应格式化上下⽂）- display: flex或display: inline-flex

margin重叠：块级元素的上外边距和下外边距有时会合并（或折叠）为⼀个外边距，其⼤⼩取其中的较⼤者，这种⾏为称为外边距折叠（重叠），注意这个是发⽣在属于同⼀ BFC 下的块级元素之间



**如何定位？**

1. relative：相对⾃身之前正常⽂档流中的位置发⽣偏移，与世隔绝，且原来的位置仍然被占据。发⽣偏移时， 可能覆盖其他元素。body默认是relative,⼦绝⽗相。
2. absolute：元素框不再占有⽂档位置，并且相对于包含块进⾏偏移（所谓包含块就是最近⼀级外层元素 position不为static的元素）。
3. fixed：元素框不再占有⽂档流位置，并且相对于视窗进⾏定位。
4. static：默认值，取消继承。
5. sticky：css3新增属性值，粘性定位，相当于relative和fixed的混合。最初会被当作是relative，相对原来位置 进⾏偏移；⼀旦超过⼀定的阈值，会被当成fixed定位，相对于视⼝定位。
6. inherit



对于position:fixed，正常来说是相对于浏览器窗⼝定位的，但是当元素祖先的 transform 属性⾮ none 时，会相对于该祖先进⾏定位



**选择器优先级：!important声明样式最搞，继承的最低**

样式表来源不同时，内联样式 > 内部样式 > 外部样式 > 浏览器⽤户⾃定义样式 > 浏览器默认样式

内联>id>类=属性=伪类>标签(类型、元素选择器h1)=伪元素

需要计算权值，特例：“[id=p33]”形式的选择器被视为属性选择器(权值为10)，即使id属性在源⽂档的⽂档类型中被定义为“id选择器”

通配符 * 和关系选择符(+ > ~ '' ||)和否定伪类(:not()) 对优先级没有影响，但是:not内部声明的选择器会影响优先级

```js
*{} /*通⽤选择器，权值为0 */
p{color:red;} /*标签，权值为1*/
p span{color:green;} /*两个标签，权值为1+1=2*/
p>span{color:purple;}/*权值与上⾯的相同，因此采取就近原则*/
a:hover{}/*标签和伪类，权值为1+10=11*/
.warning{color:white;} /*类选择符，权值为10*/
p span .warning{color:purple;} /*权值为1+1+10=12*/
h1+a[rel=up]{}/*标签和属性选择器，权值为1+10=11*/
#footer .note p{color:yellow;} /*权值为100+10+1=111*/
p{color:red!important; } /*优先级最⾼*/
```



属性

无继承性：unicode-bidi：设置⽂本的⽅向

有继承性：字体，文本，可见性，光标



CSS隐藏元素方法：

display: none ⾮继承属性：渲染树不会包含该渲染对象，因此该元素不会在⻚⾯中占据位置，也不会响应绑定的监听事件。 visibility: hidden  继承属性：元素在⻚⾯中仍占据空间，但是不会响应绑定的监听事件。

z-index: 负值：来使其他元素遮盖住该元素，以此来实现隐藏。 clip/clip-path：使⽤元素裁剪的⽅法来实现元素的隐藏，这种⽅法下，元素仍在⻚⾯中占据位置，但是不会响应绑定的监听事件。 transform: scale(0,0)：将元素缩放为0，来实现元素的隐藏。这种⽅法下，元素仍在⻚⾯中占据位置，但是不会响应绑定的监听事件



text-overflow属性

1.clip: 对象内文本溢出部分裁掉

2. ellipsis：文本溢出时显示



```js
div
{
width: 300px;
height: 200px;
background: url("../assets/2.jpg")no - repeat;
border: 1px solid red;
/*background-size: 100%;*/
background - size: cover;
}
/*若图⽚宽度250px，宽度为250px，让该图⽚完全铺满整个div区域，设置background-size*/
```



div层级> html



层叠上下⽂可能出现7个层叠等级，从低到⾼排列

1. 背景和边框
2. z-index为负数
3. block盒模型(位于正常⽂档流，块级，⾮定位)
4. float盒模型(浮动，⾮定位)
5. inline盒模型(位于正常⽂档流，内联，⾮定位)
6. z-index=0
7. z-index为正数(数值越⼤越靠上⽅)



element.offsetTop获取元素到有定位⽗盒⼦的顶部距离 

element.offsetLeft获取元素到有定位⽗盒⼦的左侧距离 

e.clientX⿏标距离可视区的左侧距离 

e.clientY⿏标距离可视区的顶部距离



**特殊值和等号**

undefined =不存在的值   null=没有值

对一个值声明，没有赋值，输出undefined，不存在；赋值为null，输出为null

undeclared = 尝试访问未使用var,let/const声明变量时会发生

undefined: 发生在使用var,let/const声明变量但未赋值

| ===  | 类型不同，不相等                                             | 两个值都为true/false,相等；都引用同一个对象/函数，相等       |
| ---- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| ==   | 类型不同，转换成相同类型，比较值                             | null == undefined；true转换成1，false转换成0再比较           |
| NaN  | 非数字值的特殊值，某个值不是数字，可以把number对象设置为该值，指示不是数字值；唯一一个和自身不相等的值 ；使⽤ isNaN() 函数来判断⼀个值是否是 NaN 值 | 不可配置，不可写；es3中值可以被更改，但避免覆盖。编码中很少用到NaN，在计算失败时，作为math方法返回值出现或者尝试解析字符串但失败了的时候 |

array vs linked list

| array       | 连续存储；查找⽅便，连续存储，增删改效率低                   | 适合数据量固定，频繁查询，较少增删   |
| ----------- | ------------------------------------------------------------ | ------------------------------------ |
| linked list | 离散存储；动态申请内存空间，不需要像数组需要提前申请好内存的⼤⼩，链表只需在⽤的时候申请就可以，需要来动态申请或者删除内存空间，对于数据增加和删除以及插⼊⽐数组灵活 | 适合数据量不固定，频繁增删，较少查询 |



| flat()                                 | 拍平数组，拍平n层；infinity作为参数，全拍成一层，数组有空位会跳过 |
| -------------------------------------- | ------------------------------------------------------------ |
| flatMap()                              | 只能拍平一层，对每个元素执行一个函数，再执行flat()，不改变原数组 |
| Array.at()                             | 返回对应下标的值                                             |
| Array.from()                           | 类似数组对象转成真数组                                       |
| 类数组对象需要有length属性，否则返回[] |                                                              |
| Array.of()                             | 一组数值转为数组                                             |
| Array.includes()                       | 数组是否包含某个值，boolean类型                              |
| Array.proptype.sort()                  | 排序稳定性                                                   |
| entires()                              | key: value                                                   |
| String.prototype.includes()            | 判断是否存在某个值                                           |
| includes()                             | 判断string/array是否包含子啊另一个string, return true/false;第二个参数：搜索其实位置，默认为0 |



array.prototype.slice.call() 用法

```js
// 1. 类数组对象 -> 数组
function example1() {
    function test() {
        console.log(arguments) // Arguments(3) [1, 2, 3]
        console.log(Array.isArray(arguments)) // false
        
        var args = Array.prototype.slice.call(arguments);
        console.log(args) // [1, 2, 3]
        console.log(Array.isArray(args)) // true
    }
    test(1, 2, 3)
}

// 2. NodeList -> 数组
function example2() {
    var divs = document.querySelectorAll('div')
    console.log(divs) // NodeList
    console.log(Array.isArray(divs)) // false
    
    var divArray = Array.prototype.slice.call(divs)
    console.log(divArray) // Array
    console.log(Array.isArray(divArray)) // true
    
    // 数组方法
    divArray.forEach(function(div) {
        console.log(div)
    })
}

// 3. 字符串-> 数组
function example3() {
    var str = "hello"
    var strArray = Array.prototype.slice.call(str)
    console.log(strArray) // ['h', 'e', 'l', 'l', 'o']
}

// 4. 获取数组的一部分（浅拷贝）
function example4() {
    var arr = [1, 2, 3, 4, 5]
    var sliced = Array.prototype.slice.call(arr, 1, 3)
    console.log(sliced) // [2, 3]
    
    // method2
    var sliced2 = arr.slice(1, 3)
    console.log(sliced2) // [2, 3]
}

// 5. 克隆数组
function example5() {
    var original = [1, 2, 3, {name: 'test'}]
    var cloned = Array.prototype.slice.call(original)
    
    console.log(original === cloned) // false
    console.log(original) // [1, 2, 3, {name: 'test'}]
    console.log(cloned)   // [1, 2, 3, {name: 'test'}]
    
    // 浅拷贝
    original[3].name = 'changed'
    console.log(cloned[3].name) // 'changed'
}
```

array.form() 用法

```js
// 1. 类数组对象 -> 数组
function fromExample1() {
    function test() {
        console.log(arguments) // Arguments(3) [1, 2, 3]
        
        var args = Array.from(arguments)
        console.log(args) // [1, 2, 3]
        console.log(Array.isArray(args)) // true
    }
    test(1, 2, 3)
}

// 2. NodeList -> 数组
function fromExample2() {
    var divs = document.querySelectorAll('div')
    var divArray = Array.from(divs)
    console.log(Array.isArray(divArray)) // true
    
    // 数组方法
    divArray.forEach(div => console.log(div))
    var filtered = divArray.filter(div => div.className)
}

// 3. 字符串 -> 数组
function fromExample3() {
    var str = "hello"
    var strArray = Array.from(str)
    console.log(strArray) // ['h', 'e', 'l', 'l', 'o']
    
    // 去重
    var unique = Array.from(new Set(str))
    console.log(unique) // ['h', 'e', 'l', 'o']
}

// 4. mapFn argument
function fromExample4() {
    // 数字数组
    var numbers = Array.from({length: 5}, (v, i) => i)
    console.log(numbers) // [0, 1, 2, 3, 4]
    
    // 平方数数组
    var squares = Array.from({length: 5}, (v, i) => i * i)
    console.log(squares) // [0, 1, 4, 9, 16]
    
    // 从对象创建数组
    var obj = {0: 'a', 1: 'b', 2: 'c', length: 3}
    var arr = Array.from(obj, x => x.toUpperCase())
    console.log(arr) // ['A', 'B', 'C']
}

// 5. 指定长度的数组
function fromExample5() {
    // 创建长度为5的数组，填充0
    var zeros = Array.from({length: 5}, () => 0)
    console.log(zeros) // [0, 0, 0, 0, 0]
    
    // 创建随机数数组
    var randomNumbers = Array.from({length: 5}, () => Math.random())
    console.log(randomNumbers);
    
    // 创建递增数组
    var increment = Array.from({length: 5}, (v, i) => i + 1)
    console.log(increment) // [1, 2, 3, 4, 5]
}

// 6. Set 和 Map
function fromExample6() {
    var set = new Set([1, 2, 3, 2, 1]);
    var arrayFromSet = Array.from(set);
    console.log(arrayFromSet); // [1, 2, 3]
    
    var map = new Map([['a', 1], ['b', 2]]);
    var arrayFromMap = Array.from(map);
    console.log(arrayFromMap); // [['a', 1], ['b', 2]]
    
    // 只获取值
    var values = Array.from(map.values());
    console.log(values); // [1, 2]
    
    // 只获取键
    var keys = Array.from(map.keys());
    console.log(keys); // ['a', 'b']
}

// 7. 复杂用法
function fromExample7() {
    // 生成字母表
    var alphabet = Array.from({length: 26}, (v, i) => 
        String.fromCharCode(97 + i)
    );
    console.log(alphabet); // ['a', 'b', 'c', ..., 'z']
    
    // Fibonacci
    function fibonacci(n) {
        return Array.from({length: n}, (v, i) => {
            if (i <= 1) return i;
            let a = 0, b = 1;
            for (let j = 2; j <= i; j++) {
                [a, b] = [b, a + b];
            }
            return b;
        });
    }
    console.log(fibonacci(10)); // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
    
    // 二维数组
    var matrix = Array.from({length: 3}, () => 
        Array.from({length: 3}, () => 0)
    );
    console.log(matrix); // [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
}
```



遍历对象属性

| for in                            | 循环遍历对象⾃身的和继承的可枚举属性（不含 Symbol 属性）；for in 遍历index；for of遍历value |
| --------------------------------- | ------------------------------------------------------------ |
| object.keys(obj)                  | 包括对象⾃身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名 |
| object.getOwnPropertyNames(obj)   | 包含对象⾃身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名 |
| object.getOwnPropertySymbols(obj) | 包含对象⾃身的所有 Symbol 属性的键名                         |
| Reflect.ownKeys(obj)              | 包含对象⾃身的（不含继承的）所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举 |

```js
//for in
for (let key in obj) {
console.log(key + ':'+obj[key])
}

//object.keys(obj)
const keys = Object.keys(obj)
console.log(keys)

//Object.getOwnPropertyNames(obj)
const propertyNames = Object.getOwnPropertyNames(obj)
console.log(propertyNames)

//Object.getOwnPropertySymbols(obj)
const symbols = Object.getOwnPropertySymbols(obj)
console.log(symbols)

// Reflect.ownKeys(obj)
const allKeys = Reflect.ownKeys(obj)
console.log(allKeys)
```



判断对象是否有属性

| in                                | 检查属性是否在对象或其原型链中                             |
| --------------------------------- | ---------------------------------------------------------- |
| reflect.has()                     | 与 in 操作符功能相同                                       |
| hasOwnProperty()                  | 只检查对象自身的属性，不检查原型链                         |
| Object.prototype.hasOwnproperty() | 更安全的 hasOwnProperty() 调用方式                         |
| Object.hasOwn()                   | ES2022新增，推荐使用，功能与 hasOwnProperty() 相同但更安全 |

```js
// in
const obj1 = {a:1}
console.log('a' in obj1) //true

//reflect.has()
const obj2 = { b: 2 }
console.log(Reflect.has(obj2, 'b')) // true

//hasOwnProperty()
const obj3 = { c: 3 }
console.log(obj3.hasOwnProperty('c')) // true

//Object.prototype.hasOwnproperty()
const obj4 = { e: 4 }
console.log(Object.prototype.hasOwnProperty.call(obj4, 'e'))

//Object.hasOwn() (ES2022+)
const obj5 = { g: 5 }
console.log(Object.hasOwn(obj5, 'g')) // true
```

prototype

每一个对象都具有proto属性（现在推荐Object.getPrototypeOf())，指向对象原型，原型也是对象，有constrcutor和proto两个属性，形成原型链



原型链

```html
console.log(Object.prototype._proto===null) //true
```



```js
// 1. 原型链
function Person(name) {
    this.name = name
}

Person.prototype.sayHello = function() {
    console.log(`Hello, I'm ${this.name}`)
}

Person.prototype.age = 25

const person1 = new Person('Alice')
const person2 = new Person('Bob')

// 访问原型
console.log('person1.__proto__ === Person.prototype:', person1.__proto__ === Person.prototype)
console.log('Person.prototype.constructor === Person:', Person.prototype.constructor === Person)

// 2. 查找机制
console.log('person1.name:', person1.name) // 自身属性
console.log('person1.age:', person1.age) // 从原型链查找
console.log('person1.sayHello():', person1.sayHello()) // 从原型链查找方法

// 3. 层级关系
console.log('Person.prototype.__proto__ === Object.prototype:', 
    Person.prototype.__proto__ === Object.prototype)
console.log('Object.prototype.__proto__ === null:', 
    Object.prototype.__proto__ === null)

// 4. Object.getPrototypeOf()替代__proto__
console.log('Object.getPrototypeOf(person1) === Person.prototype:', 
    Object.getPrototypeOf(person1) === Person.prototype)

// 5. 原型链继承
function Student(name, grade) {
    Person.call(this, name) // 调用父构造函数
    this.grade = grade
}

// 设置原型链继承
Student.prototype = Object.create(Person.prototype)
Student.prototype.constructor = Student

Student.prototype.study = function() {
    console.log(`${this.name} is studying in grade ${this.grade}`)
}

const student1 = new Student('Charlie', 10)

// 6. 原型链查找
console.log('student1.name:', student1.name) // Student实例属性
console.log('student1.grade:', student1.grade) // Student实例属性
console.log('student1.age:', student1.age) // Person原型属性
student1.sayHello() // Person原型方法
student1.study() // Student原型方法

// 7. 检查原型链关系
console.log('student1 instanceof Student:', student1 instanceof Student)
console.log('student1 instanceof Person:', student1 instanceof Person)
console.log('student1 instanceof Object:', student1 instanceof Object)

// 8. 属性覆盖
student1.age = 18 // 在实例上添加同名属性
console.log('student1.age:', student1.age) // 访问实例属性
delete student1.age // 删除实例属性
console.log('student1.age:', student1.age) // 重新访问原型属性

// 9. 方法覆盖
Student.prototype.sayHello = function() {
    console.log(`Hi, I'm student ${this.name}`)
}
student1.sayHello() // 调用重写的方法

// 10. 动态修改原型
Person.prototype.newMethod = function() {
    console.log('This is a new method added to Person prototype')
}

person1.newMethod() // 所有Person实例都能访问新方法
student1.newMethod() // 继承Person的Student实例也能访问

// 11. 可视化
function showPrototypeChain(obj, name) {
    console.log(`\n${name} 的原型链:`)
    let current = obj
    let level = 0
    
    while (current !== null && level < 10) {
        const indent = '  '.repeat(level)
        console.log(`${indent}Level ${level}:`, current.constructor?.name || 'Object')
        
        // 当前对象属性
        const ownProps = Object.getOwnPropertyNames(current).filter(prop => 
            prop !== '__proto__' && typeof current[prop] !== 'function'
        )
        const ownMethods = Object.getOwnPropertyNames(current).filter(prop => 
            typeof current[prop] === 'function' && prop !== 'constructor'
        )
        
        if (ownProps.length > 0) {
            console.log(`${indent}  feature:`, ownProps)
        }
        if (ownMethods.length > 0) {
            console.log(`${indent}  method:`, ownMethods)
        }
        
        current = Object.getPrototypeOf(current)
        level++
    }
}

// 12. 原型链
showPrototypeChain(student1, 'student1')
showPrototypeChain(Person.prototype, 'Person.prototype')
showPrototypeChain(Object.prototype, 'Object.prototype')

// 13. 性能测试
function performanceTest() {
    const iterations = 100000
    const testObj = new Person('Test')
    
    console.time('直接属性访问')
    for (let i = 0; i < iterations; i++) {
        testObj.name
    }
    console.timeEnd('直接属性访问')
    
    console.time('原型链属性访问')
    for (let i = 0; i < iterations; i++) {
        testObj.age
    }
    console.timeEnd('原型链属性访问')
}

performanceTest()

// 14. 现代ES6类与原型链的关系
class ModernPerson {
    constructor(name) {
        this.name = name
    }
    
    sayHello() {
        console.log(`Hello, I'm ${this.name}`)
    }
    
    static getSpecies() {
        return 'Homo sapiens'
    }
}

const modernPerson = new ModernPerson('David')

console.log('modernPerson.__proto__ === ModernPerson.prototype:', 
    modernPerson.__proto__ === ModernPerson.prototype)
console.log('ModernPerson.prototype.constructor === ModernPerson:', 
    ModernPerson.prototype.constructor === ModernPerson)

// 15. 与this绑定
const obj = {
    name: 'Context Object',
    getName: function() {
        return this.name
    }
}

const boundGetName = obj.getName.bind(obj)
console.log('Bound function result:', boundGetName())

// 16. 污染防护
function safeObject() {
    const obj = Object.create(null) // 创建无原型对象
    obj.name = 'Safe Object'
    console.log('Safe object prototype:', Object.getPrototypeOf(obj))
    return obj
}

const safeObj = safeObject()
```

