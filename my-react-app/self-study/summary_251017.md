```
document.querySelector('.list').innerHTML = str
```

问题：

innerHTML的用法？

```js
<div id="box"><p>old</p></div>
<script>
  const box = document.getElementById('box');

  // 读取
  console.log(box.innerHTML);   // "<p>old</p>"元素内部的 HTML 字符串（包含子元素）

  // 写入用传入字符串直接替换元素内部所有内容，并把它解析为DOM
  box.innerHTML = '<strong>new</strong>'; // DOM 里变为 <strong>new</strong>
</script>
```

存在安全问题，会把字符串当作 HTML 解析。如果字符串包含用户输入且未经净化，容易造成 XSS（跨站脚本攻击）。

| **属性**    | **作用**                               | **性能** | **样式影响** | **安全性** |
| ----------- | -------------------------------------- | -------- | ------------ | ---------- |
| innerHTML   | 读/写 HTML（会解析为 DOM）             | 较慢     | 无           | **易 XSS** |
| textContent | 读/写纯文本（不解析 HTML）             | 快       | 无           | 安全       |
| innerText   | 读/写“渲染后的可见文本”（受 CSS 影响） | 慢       | 有           | 安全       |

nodelist 类数组对象和数组的区别？？？节点集合，会动态变化，如果文档节点树变化

nodelist 是 DOM 查询返回的类数组对象，不是数组，不能用数组方法（.map()、.filter()、.reduce()），遍历方式包括for...of、forEach()；更新方式有静有动；不继承 array 原型？？？

```js
const list1 = document.querySelectorAll('p') // 静态 NodeList：固定快照，后续新增或删除节点不会反映
const list2 = document.getElementsByTagName('p') // 实时（动态）NodeList：自动反映文档结构变化
const list3 = document.getElementsByClassName('p')
```

```js
//类数组可以变成真数组
const nodes = document.querySelectorAll('p')
// 方法1：
const arr1 = Array.from(nodes)
// 方法2：
const arr2 = [...nodes]
// 方法3（旧方法）：
const arr3 = Array.prototype.slice.call(nodes)
```

箭头函数用法?? vs 普通函数

```js
const a = () => {
}
```



学习内容：

![image-20251017174542422](/Users/jiayuzhao/Library/Application Support/typora-user-images/image-20251017174542422.png)

![image-20251017174607698](/Users/jiayuzhao/Library/Application Support/typora-user-images/image-20251017174607698.png)

Curl 命令   https://reqbin.com/curl

```bash
curl -i https://en.wikipedia.org

# 1) 最简单：获取网页内容
curl https://example.com

# 2) 保存为文件
curl -o page.html https://example.com
# 或保留原文件名
curl -O https://example.com/file.zip

# 3) 跟随重定向
curl -L https://bit.ly/some-link

# 4) 显示响应头
curl -I https://example.com
# 请求 + 显示头部与耗时
curl -v https://example.com

# 5) 发送查询参数 / 自定义请求头
curl "https://api.example.com/search?q=chatgpt" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <TOKEN>"

# 6) POST JSON
curl -X POST https://api.example.com/items \
  -H "Content-Type: application/json" \
  -d '{"name":"book","price":9.9}'

# 7) 表单提交（application/x-www-form-urlencoded）
curl -X POST https://example.com/login \
  -d "username=alice&password=secret"

# 8) 上传文件（multipart/form-data）
curl -X POST https://api.example.com/upload \
  -F "file=@/path/to/photo.jpg" -F "desc=avatar"

# 9) 基本认证 / 代理
curl -u user:pass https://example.com
curl -x http://proxy.host:8080 https://example.com

# 10) 断点续传（下载中断后继续）
curl -C - -O https://example.com/big.iso
```



```bash
python3 -m http.server # 在当前目录下启动一个临时的 HTTP 静态文件服务器
# python3：使用 Python3 解释器
# -m http.server：以模块方式运行内置模块 http.server（等同用 SimpleHTTPRequestHandler 起一个服务器）

# 指定服务目录（不切换目录也能服务别处的文件）
python3 -m http.server 8000 --directory /path/to/dir

# 只绑定本机回环地址（不允许局域网访问）
python3 -m http.server 8000 --bind 127.0.0.1


# output
# Serving HTTP on :: port 8000 (http://[::]:8000/) ...
# ::1 - - [17/Oct/2025 17:55:03] "GET / HTTP/1.1" 200 -
# ::1 - - [17/Oct/2025 17:55:03] code 404, message File not found
# ::1 - - [17/Oct/2025 17:55:03] "GET /favicon.ico HTTP/1.1" 404 -
```





![image-20251017175358403](/Users/jiayuzhao/Library/Application Support/typora-user-images/image-20251017175358403.png)

HTTP响应状态

| 成功响应                  |                                                              |
| ------------------------- | ------------------------------------------------------------ |
| 200 OK                    | `GET`: 资源已被提取并在消息正文中传输。 `HEAD`: 实体标头位于消息正文中。 `PUT` or `POST`: 描述动作结果的资源在消息体中传输。 `TRACE`: 消息正文包含服务器收到的请求消息。 |
| 201                       | 该请求已成功，并因此创建了一个新的资源。这通常是在 POST 请求，或是某些 PUT 请求之后返回的响应。 |
| 202 Accepted              | 请求已经接收到，但还未响应，没有结果。意味着不会有一个异步的响应去表明当前请求的结果，预期另外的进程和服务去处理请求，或者批处理。 |
| 203  Non-authorative info | 服务器已成功处理了请求，但返回的实体头部元信息不是在原始服务器上有效的确定集合，而是来自本地或者第三方的拷贝。当前的信息可能是原始版本的子集或者超集。例如，包含资源的元数据可能导致原始服务器知道元信息的超集。使用此状态码不是必须的，而且只有在响应不使用此状态码便会返回`200 OK`的情况下才是合适的。 |
| 204 no content            | 对于该请求没有的内容可发送，但头部字段可能有用。用户代理可能会用此时请求头部信息来更新原来资源的头部缓存字段。 |
| 205 reset content         | 告诉用户代理重置发送此请求的文档。                           |
| **重定向**                |                                                              |
| 307                       |                                                              |
| **客户端错误响应**        |                                                              |
| 400 bad request           | 由于被认为是客户端错误（例如，错误的请求语法、无效的请求消息帧或欺骗性的请求路由），服务器无法或不会处理请求。 |
| 401 unauthorized          | 虽然 HTTP 标准指定了"unauthorized"，但从语义上来说，这个响应意味着"unauthenticated"。也就是说，客户端必须对自身进行身份验证才能获得请求的响应。 |
| 402 payment denied        | 此响应代码保留供将来使用。创建此代码的最初目的是将其用于数字支付系统，但是此状态代码很少使用，并且不存在标准约定。 |
| 403 forbidden             | 客户端没有访问内容的权限；也就是说，它是未经授权的，因此服务器拒绝提供请求的资源。与 `401 Unauthorized` 不同，服务器知道客户端的身份。 |
| 404 not found             | 服务器找不到请求的资源。在浏览器中，这意味着无法识别 URL。在 API 中，这也可能意味着端点有效，但资源本身不存在。服务器也可以发送此响应，而不是 `403 Forbidden`，以向未经授权的客户端隐藏资源的存在。 |
|                           |                                                              |



my first form

```js
<form>
  <li>
  <ul>
  <label for="name">Name:<\label>
    <input type="text" id="name" name="user_name" />
      </li>
    <li>
      <label for="mail">E-mail:</label>
      <input type="email" id="mail" name="user_email" />
    </li>
    <li>
      <label for="msg">Message:</label>
      <textarea id="msg" name="user_message"></textarea>
    </li>
  </ul>
</form>
```



Cookies

![image-20251017202048465](/Users/jiayuzhao/Library/Application Support/typora-user-images/image-20251017202048465.png)



会话状态管理: 用户登录状态、购物车、游戏分数或其他需要记录的信息

个性化设置: 用户自定义设置、主题和其他设置

浏览器行为跟踪: 跟踪分析用户行为等

```html
Cookie: <cookie-list>
Cookie: name=value
Cookie: name=value; name2=value2; name3=value3
  
Set-Cookie: <cookie-name>=<cookie-value>
  
HTTP/1.0 200 OK
Content-type: text/html
Set-Cookie: yummy_cookie=choco
Set-Cookie: tasty_cookie=strawberry

[页面内容]

GET /sample_page.html HTTP/1.1
Host: www.example.org
Cookie: yummy_cookie=choco; tasty_cookie=strawberry
```



Cookie生命周期:

会话期Cookie 在当前的会话结束之后删除。浏览器定义“当前会话”结束的时间，浏览器重启时会使用*会话恢复*。导致会话 cookie 无限延长。

持久性:Cookie 在过期时间（`Expires`）指定的日期或有效期（`Max-Age`）指定的一段时间后被删除

```html
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT;
```



限制访问cookie:

`Cookie` 被安全发送，不会被意外的参与者或脚本访问：`Secure` 属性和 `HttpOnly` 属性。

标记为 `Secure` 的 Cookie 只应通过被 HTTPS 协议加密过的请求发送给服务端。它不会使用不安全的 HTTP 发送（本地主机除外），中间人攻击者无法轻松访问它。不安全的站点（在 URL 中带有 `http:`）无法使用 `Secure` 属性设置 cookie。但是，`Secure` 不会阻止对 cookie 中敏感信息的访问。有权访问客户端硬盘（或，如果未设置 `HttpOnly` 属性，则为JS）的人可以读取和修改它。

 [`Document.cookie`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie) API 无法访问带有 `HttpOnly` 属性的 cookie；此类 Cookie 仅作用于服务器。例如，持久化服务器端会话的 Cookie 不需要对 JavaScript 可用，而应具有 `HttpOnly` 属性。此预防措施有助于缓解跨站点脚本攻击。



定义发送位置

DOMAIN

指定了哪些主机可以接受 Cookie.如果不指定，该属性默认为同一host设置 cookie，*不包含子域名*。如果指定了 `Domain`，则一般包含子域名.如果设置 `Domain=mozilla.org`，则 Cookie 也包含在子域名中（如 `developer.mozilla.org`）。

PATH

指定的URL 路径必须存在于请求的 URL 中，发送 `Cookie` 标头。以字符 `%x2F` (“/”) 作为路径分隔符，并且子路径也会被匹配。

设置 `Path=/docs`，以下地址都会匹配：

- `/docs`
- `/docs/`
- `/docs/Web/`
- `/docs/Web/HTTP`

但是这些请求路径不会匹配以下地址：

- `/`
- `/docsets`
- `/fr/docs`



SAMESITE

允许服务器指定是否/何时通过跨站点请求发送（[站点](https://developer.mozilla.org/zh-CN/docs/Glossary/Site)由注册的域和*方案*定义：http 或 https）。提供了一些针对跨站点请求伪造攻击（[CSRF](https://developer.mozilla.org/zh-CN/docs/Glossary/CSRF)）保护。它采用三个可能值：`Strict`、`Lax` 和 `None`。

| Strict | cookie 仅发送到它来源站点                                    |
| ------ | ------------------------------------------------------------ |
| Lax    | 与 Strict 相似，只是在用户*导航*到 cookie 的源站点时发送 cookie。例如，通过跟踪来自外部站点的链接 |
| None   | 指定浏览器会在同站请求和跨站请求下继续发送 cookie，但*仅在安全的上下文中*（如果 `SameSite=None`，且必须设置 `Secure` 属性）。如果没有设置 `SameSite` 属性，则将 cookie 视为 `Lax` |

```
Set-Cookie: mykey=myvalue; SameSite=Strict
```



js通过document.cookie访问cookie

```js
document.cookie = "yummy_cookie=choco"
document.cookie = "tasty_cookie=strawberry"
console.log(document.cookie)
// logs "yummy_cookie=choco; tasty_cookie=strawberry"
```



DOM事件

继承自 [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) 接口的对象来表示

| 事件类型              | 描述                                                         | 文档                                                         |
| :-------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| 动画                  | 与 [Web Animation API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Animations_API) 相关的事件。用于响应动画状态的改变（动画的开始或结束） | 在 [`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document#动画事件)、[`Window`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window#动画事件)、[`HTMLElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement#动画事件) 上触发的事件 |
| 异步数据获取          | 数据获取                                                     | 在 [`AbortSignal`](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortSignal#事件)、[`XMLHttpRequest`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest#事件)、[`FileReader`](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader#事件) 上触发的事件 |
| 剪切板                | 与 [Clipboard API](https://developer.mozilla.org/zh-CN/docs/Web/API/Clipboard_API) 相关的事件。用于在内容被剪切、复制或粘贴时发出通知。 | 在 [`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document#剪切板事件)、[`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element#剪切板事件)、[`Window`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window#剪切板事件) 上触发的事件。 |
| 合成（Composition）   | 与文本输入相关的事件；“间接”输入文本（而不是直接使用常规的键盘输入）。例如，使用语音转文字的引擎，或使用特殊的组合键以将键入的内容表示成另一种语言中的字符。 | 在 [`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element#合成事件) 上触发的事件。 |
| CSS 过渡              | 与 [CSS 过渡](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_transitions)相关的事件。当 CSS 过渡开始、停止或取消等事件发生时发出通知。 | 在 [`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document#过渡事件)、[`HTMLElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement#过渡事件)、[`Window`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window#过渡事件) 上触发的事件。 |
| 数据库                | 与数据库操作相关的事件：打开、关闭、事务、错误               | 在 [`IDBDatabase`](https://developer.mozilla.org/zh-CN/docs/Web/API/IDBDatabase#事件)、[`IDBOpenDBRequest`](https://developer.mozilla.org/en-US/docs/Web/API/IDBOpenDBRequest#事件)、[`IDBRequest`](https://developer.mozilla.org/zh-CN/docs/Web/API/IDBRequest#事件)、[`IDBTransaction`](https://developer.mozilla.org/zh-CN/docs/Web/API/IDBTransaction#事件) 上触发的事件。 |
| DOM 突变              | 与文档对象模型（DOM）层次结构和节点的修改相关                | **警告：** [突变事件](https://developer.mozilla.org/en-US/docs/Web/API/MutationEvent)已被弃用。请使用 [MutationObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver) 代替。 |
| 拖放、滚轮            | 与使用 [HTML 拖放 API](https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API) 和[滚轮事件](https://developer.mozilla.org/zh-CN/docs/Web/API/WheelEvent)相关的事件。拖动和滚轮事件派生自鼠标事件。虽然它们在使用鼠标滚轮和拖放时触发，但它们也可以和其他合适的硬件一起使用。 | 拖放事件在 [`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document#拖放事件) 上触发。滚轮事件在 [`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/wheel_event) 上触发。 |
| 焦点                  | 与元素获得和失去焦点相关                                     | 在 [`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element#聚焦事件)、[`Window`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window#聚焦事件) 上触发的事件。 |
| 表单                  | 与创建、重置和提交表单相关                                   | 在 [`HTMLFormElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLFormElement#事件) 上触发。 |
| 全屏                  | 与 [Fullscreen API](https://developer.mozilla.org/zh-CN/docs/Web/API/Fullscreen_API) 相关,用于在全屏和窗口模式切换或切换期间发生错误时发送通知。 | 在 [`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document#fullscreen_events)、[`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element#fullscreen_events) 上触发的事件。 |
| 游戏手柄（Gamepad）   | 与 [Gamepad API](https://developer.mozilla.org/zh-CN/docs/Web/API/Gamepad_API) 相关 | 在 [`Window`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window#gamepad_事件) 上触发的事件。 |
| 手势                  | 使用 [Touch 事件](https://developer.mozilla.org/zh-CN/docs/Web/API/Touch_events)来实现手势 | 在 [`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document#触摸事件)、[`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element#触摸事件) 上触发的事件。此外还有一些非标准的手势事件：WebKit 非标准的、在 [`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element#触摸事件) 上的事件： [`gesturestart` 事件](https://developer.mozilla.org/en-US/docs/Web/API/Element/gesturestart_event)、[`gesturechange` 事件](https://developer.mozilla.org/en-US/docs/Web/API/Element/gesturechange_event)、[`gestureend` 事件](https://developer.mozilla.org/en-US/docs/Web/API/Element/gestureend_event)。 |
| History               | 与 [History API](https://developer.mozilla.org/zh-CN/docs/Web/API/History_API) 相关的事件。 | 在 [`Window`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window#历史记录事件) 上触发的事件。 |
| HTML 元素内容显示管理 | 与显示或文本元素状态的改变相关的事件。                       | 在 [`HTMLDetailsElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLDetailsElement#事件)、[`HTMLDialogElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLDialogElement#事件)、[`HTMLSlotElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLSlotElement#事件) 上触发的事件。 |
| 输入                  | 与 HTML input 元素（如：[``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/input)、[``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/select) 或 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/textarea)）相关的事件。 | 在 [`HTMLElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement#输入事件)、[`HTMLInputElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLInputElement#事件) 上触发的事件。 |                                                              |
| 键盘                  | 与使用[键盘](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent)相关的事件。用于在按键向上、向下或仅仅只是按下时发出通知。 | 在 [`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document#键盘事件)、[`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element#键盘事件) 上触发的事件。 |
| 加载/卸载文档         | 在加载或卸载文档时触发的事件。                               | 在 [`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document#加载和卸载事件) 和 [`Window`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window#加载和卸载事件) 上触发的事件。 |
| 清单                  | 与安装[渐进式 web 应用清单](https://developer.mozilla.org/zh-CN/docs/Web/Progressive_web_apps/Manifest)相关 | 在 [`Window`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window#清单事件) 上触发的事件 |
| 媒体                  | 与媒体使用（包括[媒体捕捉与媒体流 API](https://developer.mozilla.org/zh-CN/docs/Web/API/Media_Capture_and_Streams_API#事件)、[Web Audio API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Audio_API#事件)、[画中画 API](https://developer.mozilla.org/zh-CN/docs/Web/API/Picture-in-Picture_API#事件)）相关的事件。 | 在 [`ScriptProcessorNode`](https://developer.mozilla.org/zh-CN/docs/Web/API/ScriptProcessorNode#事件)、[`HTMLMediaElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement#事件)、[`AudioTrackList`](https://developer.mozilla.org/en-US/docs/Web/API/AudioTrackList#事件)、[`AudioScheduledSourceNode`](https://developer.mozilla.org/zh-CN/docs/Web/API/AudioScheduledSourceNode#事件)、[`MediaRecorder`](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaRecorder#事件)、[`MediaStream`](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaStream#事件)、[`MediaStreamTrack`](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaStreamTrack)、[`VideoTrackList`](https://developer.mozilla.org/en-US/docs/Web/API/VideoTrackList#事件)、[`HTMLTrackElement`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLTrackElement#事件)、[`OfflineAudioContext`](https://developer.mozilla.org/zh-CN/docs/Web/API/OfflineAudioContext#事件)、[`TextTrack`](https://developer.mozilla.org/en-US/docs/Web/API/TextTrack#事件)、[`TextTrackList`](https://developer.mozilla.org/en-US/docs/Web/API/TextTrackList#事件)、[Element/audio](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/audio#事件), [Element/video](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Reference/Elements/video#事件) 上触发的事件。 |
| 消息传递              | 与窗口从另一个浏览上下文接受消息相关                         | 在 [`Window`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window#消息事件) 上触发的事件。 |

---------------------------------------

**八股**

**CSS性能优化：**内联首屏关键CSS，异步加载CSS，资源加载，合理使用选择器，不适用昂贵的属性，不用@import, css雪碧图，小图片转为BASE64编码

数据类型：undefined,null,boolean,number,string

| 数据处理函数 |                                                              |        |
| ------------ | ------------------------------------------------------------ | ------ |
| parseFloat() | 转换成浮点数                                                 |        |
| Number()     | 值转换成数字，强制类型转换和parseInt()和parseFloat()处理方法类似，转换整个值 |        |
| Math.floor() | 向下取整                                                     |        |
| Math.ceil()  | 向上                                                         |        |
| Math.round() | 四舍五入                                                     |        |
| Math.abs()   |                                                              |        |
| String()     | 转换成字符串                                                 |        |
| toFixed()    | 四舍五入                                                     |        |
| null         |                                                              | 初始化 |
| undefined    | 在 js 中不是⼀个保留字，不要用来作为变量名，危险！影响对undefined值的判断，可以通过void0获得安全undefined值 | 初始化 |

| object    | 变量值在js中保存在一个32位内单位中，单位包含1到3位的类型标志和实际数据值，类型标志存储在单位最后 |                                                            |
| --------- | ------------------------------------------------------------ | ---------------------------------------------------------- |
| 000       | object                                                       | 数据为对象应用                                             |
| 1         | int                                                          | 31位有符号整型                                             |
| 010       | double                                                       | 双精度浮点数引用                                           |
| 100       | string                                                       | 字符串引用                                                 |
| 110       | bolean                                                       | 布尔类型值                                                 |
| undefiend | -2^30 超出整型取值范围                                       |                                                            |
| null      | 空指针                                                       | null存储单位最后单位（标志位）和object一样，被误判成object |

数据类型判断

```js
// typeof
typeof {} //"object"
typeof Symbol()  //"symbol"
typeof null //"object"
typeof [] //"object"
typeof Null //"object"   js中对象都是二进制存储，前三位为0，系统判断为object，null二进制全是0，这个bug是出版本js留下的
typeof new RegExp() //"object"
typeof Null //"undefined" 

000 object
1 integer
010 双精度
100 string 
110 boolean

// instanceof 判断引用数据类型（object，function，array，date，regexp）； 判断基本数据类型无效
// 也可以判断实例是否是父类型或者祖先类型 查找目标类型原型链
[1,2,3]insatnceof Array //true
new Date() insatnceof Date //true

//constructor 原型对象属性指向构造函数 检测基本+引用类型
// null，undefined无效对象，没有constructor
// js的constructor不稳定，开发者重写prototype，原有constructor丢失，默认为object；类继承也会出错，因为object被覆盖

//object.prototype.toString.call(判断类型最准）
//tostring是object原型对象方法，return第哦啊用着类型，tostring运行时this指向对象类型，[object,xxx]
// 不能直接new Date().tostring() 大部分对象实现自身tostring，导致object的tostring被终止查找，用call来强制执行object的tostring方法
// 缺点不能再细分

object.prototype.toString.call("a")  //"[object String]"
object.prototype.toString.call(undefined)  //"[object Undefined]"
```

显式转换 （转换成字符串，boolean，number）

隐式转换（转换成字符串，boolean，number）

==可以再相等比较重强制类型转换，=== x

```html
"0" == false // true
false == [] // true
0 == [] // true

console.log(+"100px");//NaN
console.log(+" ");//0

parseInt("100px");//100
parseInt("11.22px");//11
parseFloat("12.33px");//12.33
parseFloat("12.3.4");//12.3

parseInt("a123");//NaN
parseInt(str,radix)
alert( parseInt('0xff', 16) ); // 255
alert( parseInt('ff', 16) ); // 255，没有 0x 仍然有效
alert( parseInt('2n9c', 36) ); // 123456
```

浮点数求和

```html
对阶
尾数求和
规格化和舍入
```

undefined =不存在的值   null=没有值

对一个值声明，没有赋值，输出undefined，不存在；赋值为null，输出为null

undeclared = 尝试访问未使用var,let/const声明变量时会发生

undefined: 发生在使用var,let/const声明变量但未赋值

| ===  | 类型不同，不相等                                             | 两个值都为true/false,相等；都引用同一个对象/函数，相等       |
| ---- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| ==   | 类型不同，转换成相同类型，比较值                             | null == undefined；true转换成1，false转换成0再比较           |
| NaN  | 非数字值的特殊值，某个值不是数字，可以把number对象设置为该值，指示不是数字值；唯一一个和自身不相等的值 ；使⽤ isNaN() 函数来判断⼀个值是否是 NaN 值 | 不可配置，不可写；es3中值可以被更改，但避免覆盖。编码中很少用到NaN，在计算失败时，作为math方法返回值出现或者尝试解析字符串但失败了的时候 |

```html
// influence the list
[2,3,4].splice(0,1)
[2,3,4].splice(0,1,5)
arrayObject.splice(index,howmany,item1,...,itemx)
push()
unshift()

//do not influence the list
concat()  创建⼀个副本，返回新构建的数组
slice(): 创建⼀个包含原有数组中⼀个或多个元素的新数组
reduce()
filter()
some(): 将所有元素进⾏判断返回⼀个布尔值，如果存在元素都满⾜判断条件，则返回 true，
every()
join()
flat()   将数组扁平化处理，返回⼀个新数组，对原数据没有影响
flatMap()  对原数组的每个成员执⾏⼀个函数相当于执⾏Array.prototype.map()，然后对返回值组成的数组执
⾏flat()⽅法;还可以有第⼆个参数，⽤来绑定遍历函数⾥⾯的this
```

| array       | 连续存储；查找⽅便，连续存储，增删改效率低                   | 适合数据量固定，频繁查询，较少增删   |
| ----------- | ------------------------------------------------------------ | ------------------------------------ |
| linked list | 离散存储；动态申请内存空间，不需要像数组需要提前申请好内存的⼤⼩，链表只需在⽤的时候申请就可以，需要来动态申请或者删除内存空间，对于数据增加和删除以及插⼊⽐数组灵活 | 适合数据量不固定，频繁增删，较少查询 |

| flat()                                 | 拍平数组，拍屏n曾；infinity作为参数，全拍成一层，数组有空位会跳过 |                                                  |
| -------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------ |
| flatMap()                              | 只能拍平一层，对每个元素执行一个函数，再执行flat()，不改变原数组 |                                                  |
| [Array.at](http://Array.at)()          | 返回对应下标的值                                             |                                                  |
| Array.from()                           | 类似数组对象转成真数组                                       | let arr2 = Array.from(arrayLike) //[’a’,’b’,’c’] |
| 类数组对象需要有length属性，否则返回[] |                                                              |                                                  |
| Array.of()                             | 一组数值转为数组                                             |                                                  |
| Array.includes()                       | 数组是否包含某个值，boolean类型                              |                                                  |
| Array.proptype.sort()                  | 排序稳定性                                                   |                                                  |
| entires()                              | key: value                                                   |                                                  |
| String.prototype.includes()            | 判断是否存在某个值                                           |                                                  |
| includes()                             | 判断string/array是否包含子啊另一个string, return true/false;第二个参数：搜索其实位置，默认为0 |                                                  |

用法

array.prototype.slice.call()

array.form()

遍历对象属性

| for in                            | 循环遍历对象⾃身的和继承的可枚举属性（不含 Symbol 属性）；for in 遍历index；for of遍历value |
| --------------------------------- | ------------------------------------------------------------ |
| object.keys(obj)                  | 包括对象⾃身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名 |
| object.getOwnPropertyNames(obj)   | 包含对象⾃身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名 |
| object.getOwnPropertySymbols(obj) | 包含对象⾃身的所有 Symbol 属性的键名                         |
| Reflect.ownKeys(obj)              | 包含对象⾃身的（不含继承的）所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举 |

判断对象是否有属性

| in                                | 检查属性是否在对象或其原型链中                             |
| --------------------------------- | ---------------------------------------------------------- |
| reflect.has()                     | 与 in 操作符功能相同                                       |
| hasOwnProperty()                  | 只检查对象自身的属性，不检查原型链                         |
| Object.prototype.hasOwnproperty() | 更安全的 hasOwnProperty() 调用方式                         |
| Object.hasOwn()                   | ES2022新增，推荐使用，功能与 hasOwnProperty() 相同但更安全 |

prototype

每一个对象都具有prototype属性，指向对象原型，原型有constrcutor和proto两个属性

```
Person.prototype.sayHi   #构造函数的原型属性
p1.__proto__ === Person.prototype  #实例对象的原型引用
```

原型链 Prototype Chain

```html
console.log(Object.prototype._proto===null) //true
```

当访问一个对象的属性时，JavaScript 会按照**原型链（prototype chain）**的顺序去查找， 对象自身-原型对象-原型对象原型-向上查到最顶层Object.protoype-没找到，return undefined

```
student ---> person ---> Object.prototype ---> null
var F = function(){};
F.prototype = Parent.prototype
Child.prototype = new F()
var child1 = new Child('kevin','18')
console.log(child)
```

typeof （快速判原始类型、函数；判断数组应用 `Array.isArray`）vs instanceof （判断是否由某构造函数创建 / 是否属于某继承层级）

```jsx
// 原始类型（primitive）
console.log(typeof 42);                 // "number"
console.log(typeof 'hi');               // "string"

// 包装对象（object wrappers）
console.log(typeof new Number(42));     // "object"
console.log(typeof new String('hi'));   // "object"

// instanceof 只对“对象”有效，primitive 会是 false
console.log((42) instanceof Number);                 // false
console.log((new Number(42)) instanceof Number);     // true

// 常见坑
console.log(typeof null);               // "object"  ← 历史遗留问题
console.log(null instanceof Object);    // false

class Animal {}
class Dog extends Animal {}

const d = new Dog();

// instanceof 走原型链
console.log(d instanceof Dog);          // true
console.log(d instanceof Animal);       // true
console.log(d instanceof Object);       // true

// typeof 对对象细分有限
console.log(typeof d);                   // "object"
```

通用检测数据类型—Object.prototype.toString，统⼀返回格式“[object Xxx]”的字符串

浅拷贝

Object.assign() 拷⻉的是对象属性的引⽤，⽽不是对象本身

```jsx
console.log(Object.assign([1, 2, 3], [4, 5])); //4,5,3
```

concat浅拷⻉数组

slice浅拷⻉

...扩展运算符

for...in

**深拷⻉**

1.JSON.parse(JSON.stringify()); ⽆法解决循环利⽤问题 ⽆法拷⻉⼀条特殊对象 RegExp Date Set Map 等 忽略undefined、symbol和函数 2. 递归实现 3. lodash第三⽅库实现

拷⻉特殊对象，使⽤ Object.prototype.toString.call(obj)鉴别

createcurry

```jsx
let addCurry = curry1((a, b) => a + b);
console.log(addCurry()(11)(1));
function curry1(fn) {
let judge = (...args) => {
if (args.length === fn.length) {
return fn.call(this, ...args);
}
//获取偏函数，返回包装器，重新组装参数并传⼊
return (...arg) => judge(...arg, ...args)
}
return judge;
}
```

浏览器多线程 包括定时器线程，http请求线程，js只负责异步过程的最后回调，异步本身是浏览器提供的能力

chrome，浏览器多线程+进程（GPU，渲染，插件）tab标签页独立渲染

eventloop：一次tick内，至少包含一个检测任务队列是否有新任务

click，mouse事件-宏任务

浏览器中，setTimeout（异）延时设置0，默认4ms，nodejs 1ms

主线程代码执行效率要提高，不然setTimeout()计时不准确

视图重绘前先回调requestAnimationFrame（这里不属于宏/微）

**nodejs eventloop**

进程：一个动作流程

线程：进程里有多个线程

JS引擎和渲染互斥，不能同时工作

JS：eval执行上下文？

词法作用域：静态作用域？变量创建时就确定好了，而不是执行阶段？？？动态作用域是在函数调用时才确定

this：new绑定>显示绑定>隐式绑定>默认绑定

如果函数独立调用，函数内部this—>undefined,在非严格模式下，自动指向全局

不管严格与否，this指向顶层对象（浏览器中是windows，nodejs是global）

bind函数

原型链上，Function.prototype.bind.通过 bind 函数绑定后，函数将绑定在其第⼀个参数对象上，除⾮使⽤new时被改变，其他情况不会改变，⽆论在啥情况下被调⽤

函数 vs 构造函数？

introduction() === introduction.call()

每个函数this在调用时被绑定，取决于函数调用位置，执行是在执行栈中，调用位置是当前执行函数上一个调用位置

```jsx
function a() {
//当前调⽤栈是：a，所以当前调⽤位置是全局
console.log(“a”)
b(); // b 的调⽤位置
}
function b() {
//当前调⽤栈是：a->b，所以当前调⽤位置是a
console.log(“b”)
c(); // c 的调⽤位置
}
function c() {
//当前调⽤栈是：a->b->c，所以当前调⽤位置是b
console.log(“c”)
}
a()
```

replace不会修改原字符串！

```jsx
var sStr='讨论⼀下正则表达式中的replace的⽤法';
sStr.replace(/正则表达式/,'《$&》'); //$& 适⽤于没有⼦表达式的情况
// "讨论⼀下《正则表达式》中的replace的⽤法"

sStr.replace(/正则表达式/,'《$`》'); //匹配字符串左边的所有字符
// "讨论⼀下《讨论⼀下》中的replace的⽤法"

sStr.replace(/正则表达式/,"《$'》"); //匹配字符串右边的所有字符
// "讨论⼀下《中的replace的⽤法》中的replace的⽤法"

sStr.replace(/(正则)(.+?)(式)/,"《$1》$2<$3>");
// 得到："讨论⼀下《正则》表达<式>中的replace的⽤法"

sStr.replace(/(正则).+?(式)/,function() {
console.log(arguments);
});
// ["正则表达式", "正则", "式", 4, "讨论⼀下正则表达式中的replace的⽤法"]

var sStr='讨论⼀下正则表达式中的replace的正则表达式⽤法';
sStr.replace(/(正则).+?(式)/g,function($1) {
console.log($1);
return $1 + 'a';
});

str = str.replace(/\\s*/g); //去除字符串内所有的空格 \\s匹配任何空⽩字符。（空格，制表符，换⾏符）
str = str.replace(/^\\s*|\\s*$/g, "");//去除字符串内⾸尾空格
str = str.replace(/^\\s*/, "");//去除字符串左侧空格
str = str.replace(/\\s*&/, "");//去除字符串右侧空格
name = "Doe, John";
let a=name.replace(/(\\w+)\\s*, \\s*(\\w+)/, "$2 $1");
console.log(a)
//John Doe
//⾸字⺟⼤写
let name = 'aaa bbb ccc';
let uw=name.replace(/\\b\\w+\\b/g, function(word){
return word.substring(0,1).toUpperCase()+word.substring(1);}
);
```

截取字符串

```jsx
substring(start,stop) stop可写可不写

substr(start,length) 字符串中抽取从 start 下标开始的指定数⽬的字符

stringObject.split(separator,howmany) howmany可选
```

事件捕获 事件冒泡

```jsx
//capture：window → document → html → body → 外层 → 内层
//addEventListener(type, handler, { capture: true }) 或第三个参数 true 才会在捕获阶段触发
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Capturing Demo</title>
  <style>
    .outer { padding:40px; background:#e6f0ff }
    .middle{ padding:40px; background:#cfe8ff }
    .inner { padding:40px; background:#b3dbff; cursor:pointer }
  </style>
</head>
<body>
  <div class="outer">
    outer
    <div class="middle">
      middle
      <div class="inner">inner（点我）</div>
    </div>
  </div>

  <script>
    const log = msg => console.log(msg);

    document.querySelector('.outer').addEventListener('click', () => log('outer (capture)'), true);
    document.querySelector('.middle').addEventListener('click', () => log('middle (capture)'), true);
    document.querySelector('.inner').addEventListener('click', () => log('inner (capture)'), true);

    // 再加一组冒泡监听，方便对比（第三个参数默认 false）
    document.querySelector('.outer').addEventListener('click', () => log('outer (bubble)'));
    document.querySelector('.middle').addEventListener('click', () => log('middle (bubble)'));
    document.querySelector('.inner').addEventListener('click', () => log('inner (bubble)'));
  //Bubbling Phase（inner (bubble) → middle (bubble) → outer (bubble)）
  const log = console.log;

    document.querySelector('.outer').addEventListener('click', () => log('outer (bubble)'));
    document.querySelector('.middle').addEventListener('click', () => log('middle (bubble)'));
    document.querySelector('.inner').addEventListener('click', (e) => {
      log('inner (bubble)');
      // 取消下面注释，试试阻止冒泡：
      // e.stopPropagation();
    });
  
  </script>
</body>
</html>
```

事件委托

```jsx
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Delegation Demo</title>
  <style>
    ul { padding: 0; list-style: none }
    li { padding: 8px 12px; margin:6px 0; background:#e9ffe3; cursor:pointer }
    button.add { margin-top:12px }
  </style>
</head>
<body>
  <ul id="list">
    <li data-id="1">Item 1（点我）</li>
    <li data-id="2">Item 2（点我）</li>
    <li data-id="3">Item 3（点我）</li>
  </ul>
  <button class="add">添加新项</button>

  <script>
    const list = document.getElementById('list');

    // 只在父元素上挂一个监听器
    list.addEventListener('click', (e) => {
      // 精准命中：只处理点击到 li（或 li 内部子节点）的情况
      const li = e.target.closest('li');
      if (!li || !list.contains(li)) return; // 点击到了空白处或越界

      console.log('点击了：', li.dataset.id, li.textContent.trim());
      // 可在此执行删除/选中等逻辑
      // li.remove();
    });

    // 动态添加子项也能自动被“委托”到
    document.querySelector('.add').addEventListener('click', () => {
      const id = list.children.length + 1;
      const li = document.createElement('li');
      li.dataset.id = String(id);
      li.textContent = `Item ${id}（新加的也能点）`;
      list.appendChild(li);
    });
  </script>
</body>
</html>
var btn = document.getElementById('.btn')
//标准事件
//事件绑定监听
addEventListener(eventType, handler, useCapture)
btn.addEventListener(‘click’, showMessage, false)
//(可以绑多个）
btn.addEventListener(‘click’, showMessage1, false);
btn.addEventListener(‘click’, showMessage2, false);
btn.addEventListener(‘click’, showMessage3, false);
//事件移除监听
removeEventListener(eventType, handler, useCapture)
btn.removeEventListener(‘click’, showMessage, false)

//IE事件：事件到达⽬标元素, 触发⽬标元素的监听函数-从⽬标元素冒泡到document
var btn = document.getElementById('.btn')

attachEvent(eventType, handler)
btn.attachEvent(‘onclick’, showMessage)

detachEvent(eventType, handler)
btn.detachEvent(‘onclick’, showMessage)
```

mouse，keyboard，click事件支持冒泡

聚焦和失焦事件（blur，focus），加载事件（resize，about），ui事件（load）、⿏标移⼊移出事件（mouseenter，mouseleave）不⽀持冒泡

可以通过 event.bubbles 属性可以判断该事件是否可以冒泡

```jsx
// event.bubbles === true   // 表示事件可以从目标向上冒泡

<div id="outer" style="padding:20px;background:#cce;">
  outer
  <button id="btn">Click Me</button>
</div>

<script>
  const outer = document.getElementById('outer');
  const btn = document.getElementById('btn');

  outer.addEventListener('click', e => {
    console.log('outer click 捕获到', 'bubbles:', e.bubbles);
  });

  btn.addEventListener('click', e => {
    console.log('btn click', 'bubbles:', e.bubbles);
  });

  btn.addEventListener('focus', e => {
    if (!e.bubbles) { //assure能冒泡
    console.log('这个事件不冒泡，不能用于事件委托');
  }
});

//自定义事件手动冒泡
//const myEvent = new CustomEvent('myCustom', { bubbles: true });
element.dispatchEvent(myEvent);

  // 触发点击
  btn.click();
  btn.focus();
</script>
```

事件代理相对于直接给目标注册事件，节省内存，减少dom操作；不需要给子节点注销事件，动态绑定事件。

适合事件委托（添加到⻚⾯上事件处理程序数量将直接关联到⻚⾯的整体性能）事件：click，mousedown，mouseup，keydown，keyup，keypress

事件委托解决“事件处理程序过多”，通过**事件冒泡，只指定⼀个事件处理程序，就可以管理某⼀类型所有事件**

nodelist 类数组对象？？？节点集合，会动态变化，如果文档节点树变化，nodelist会实时变化；其他时候是静态集合，document.querySelectorAll。

只能用for/for-of loop，不能用for-in loop, length和item属性被遍历出来导致错误

```jsx
<ul id="list">
  <li>A</li>
  <li>B</li>
  <li>C</li>
</ul>
<script>
  const nodes = document.querySelectorAll('li');
  console.log(nodes);                // NodeList(3) [li, li, li]
  console.log(typeof nodes);         // "object"
  console.log(Array.isArray(nodes)); // false ← 不是数组
  console.log(nodes.length);         // 3
  console.log(nodes[0].textContent); // "A"
  
  const liveList = document.getElementsByTagName('li');   // 实时
  const staticList = document.querySelectorAll('li');     // 静态
  
    nodes.forEach(li => console.log(li.textContent));
    
    console.log('--- for...in ---');
  for (const key in nodes) {
    console.log(key); // 输出 "0", "1", "2", "length", "item", "entries", ...
  }

  console.log('--- for...of ---');
  for (const li of nodes) {
    console.log(li.textContent); // ✅ 只输出内容
  }
</script>

//返回实时NodeList / HTMLCollection (HTMLCollection有namedITem⽅法，其他和NodeList保持⼀致)
//document.getElementsByTagName()
// document.getElementsByClassName()
// element.children
// element.childNodes
//事件监听 addEventListener / attachEvent
< a href = "//google.com" > Try clicking this link. < / a >
const element = document.querySelector('a');
element.addEventListener('click', event => event.preventDefault(
console.log("Hello World"); ));
element.addEventListener('click', event => event.preventDefault(
console.log("How are you?"); ));
element.click(）
// "Hello World"
// "How are you?"
```

[e.target](http://e.target) **事件真正发生的那个最深层节点**（可能是子/孙节点） e.currentTarget **当前正在执行监听器的那个节点**（`addEventListener` 绑定的元素） 事件委托时不同

```jsx
<div id="wrap" style="padding:16px;border:1px solid #999">
  <button id="btn"><span>click me</span></button>
</div>
<style>
  #mask { position:absolute; inset:0; background:rgba(0,0,0,0.0); }
</style>
<button id="c" style="position:relative; z-index:1">click me</button>
<div id="mask"></div>
<script>
  const wrap = document.getElementById('wrap');
  wrap.addEventListener('click', (e) => {
    console.log('target       =', e.target.tagName);       // 可能是 SPAN / BUTTON
    console.log('currentTarget=', e.currentTarget.id);     // 恒为 'wrap'
  })
  
  // 覆盖：后者会替换前者
  a.onclick = () => console.log('第一次 onclick'); 

  // 正确做法：并存多个监听器
  a.addEventListener('click', () => console.log('listener 1'))
  
  b.addEventListener('click', (e) => {
    console.log('handler A 先触发并立即阻断') //e.stopPropagation() 只阻止向外冒泡，不会阻止同元素的其他监听
    e.stopImmediatePropagation(); //后续同元素 click 监听器不会再执行
  });
  b.addEventListener('click', () => console.log('handler B（永远不会执行）'));
  
	document.getElementById('c').addEventListener('click', () => console.log('按钮被点'));
  document.getElementById('mask').addEventListener('click', () => console.log('点到了遮罩'));
  // 如果给 #mask 加上：pointer-events:none; 就不会拦截了
</script>
```

| 现象                    | 可能原因                                    | 解决办法                                  |
| ----------------------- | ------------------------------------------- | ----------------------------------------- |
| 之前的 `click` 回调没了 | 重复 `element.onclick = ...`                | 用 `addEventListener`；或统一一个入口函数 |
| 部分监听器不执行        | 某个监听器调用 `stopImmediatePropagation()` | 去掉它，或调整执行顺序                    |
| 点击无响应              | 被透明/高层元素挡住了                       | 检查布局/层级；`pointer-events: none`     |
| 内层/外层监听不触发     | 捕获/冒泡阶段被阻断                         | 检查 `capture` 与 `stopPropagation()`     |

页面声明周期

DOMContentLoaded DOM 已经就绪，因此处理程序可以查找 DOM 节点，并初始化接⼝

load 外部资源已加载完成，样式已被应⽤，图⽚⼤⼩也已知

beforeunload ⽤户正在离开：我们可以检查⽤户是否保存了更改，并询问他是否真的要离开

unload ⽤户⼏乎已经离开，但是我们仍然可以启动⼀些操作，例如发送统计数据

```jsx
<link type="text/css" rel="stylesheet" href="style.css">
<script>
// 在样式表加载完成之前，脚本都不会执⾏
alert(getComputedStyle(document.body).marginTop);
</script>
```

onunload  访问者离开⻚⾯时，window 对象上的 unload 事件就会被触发。我们可以在那⾥做⼀些不涉及延迟的操作，例如关闭相关的弹出窗⼝。

onbeforeunload  访问者触发了离开⻚⾯的导航（navigation）或试图关闭窗⼝

document.readyState  提供当前加载状态的信息（loading，interactive 文档被全部读取，complete所有资源加载完成）

**异步任务**

定时任务：setTimeout、setInterval ⽹络请求：ajax请求、动态创建img标签的加载 事件监听器：addEventListener

promise

```jsx
const promise = new Promise((resolve, reject) => {
resolve('a');
});
promise
.then((arg) => {
console.log(`执⾏resolve,参数是${arg}`)
})
.catch((arg) => {
console.log(`执⾏reject,参数是${arg}`)
})
.finally(() => {
console.log('结束promise')
});
Promise.reject(2)

//.catch(err=>console.log("err1,",err))
.then(null, err => console.log("err1,", err)) //因为是rejected状态，执⾏then的第⼆个
callback，改变状态为fulfilled

.then(res => {  //hen实现链式操作减低代码复杂度
console.log("then1", res)
}, null) //因为是fulfilled，于是执⾏第⼀个回调,不会去到下⼀步catch
//.catch(err=>console.log("err2,",err))
.then(null, err => console.log("err2,", err))
```

promise对象错误也会冒泡，向后传递直到被捕获

异步代码执行结束后，已处理的代码：fulfilled，执行成功，resolve（）触发；rejected，执行失败，reject（）触发

Promise.race 以⼀个Promise对象组成的数组作为参数，只要当数组中⼀个Promsie状态变成resolved或者rejected时，就调⽤.then？？？

```jsx
//Symbol.iterator接⼝⽣成iterator遍历数组
let arr = ['a','b','c'];
let iter = arr[Symbol.iterator]();
iter.next() // { value: 'a', done: false }
iter.next() // { value: 'b', done: false }
iter.next() // { value: 'c', done: false }
iter.next() // { value: undefined, done: true }
```

**如何避免回调地狱？**

1.promise链式调用

```jsx
function delay(ms, msg) {
  return new Promise(resolve => setTimeout(() => resolve(msg), ms));
}

delay(1000, 'Step 1 完成')
  .then(res => {
    console.log(res);
    return delay(1000, 'Step 2 完成');
  })
  .then(res => {
    console.log(res);
    return delay(1000, 'Step 3 完成');
  })
  .then(res => {
    console.log(res);
    return delay(1000, 'Step 4 完成');
  })
  .then(res => console.log(res));
```

1. async / await

```jsx
function delay(ms, msg) {
  return new Promise(resolve => setTimeout(() => resolve(msg), ms));
}

async function runSteps() {
  console.log(await delay(1000, 'Step 1 完成'));
  console.log(await delay(1000, 'Step 2 完成'));
  console.log(await delay(1000, 'Step 3 完成'));
  console.log(await delay(1000, 'Step 4 完成'));
}

runSteps();
function * createIterator() {
yield 1;
yield 2;
yield 3;
}
// generators可以像正常函数⼀样被调⽤，不同的是会返回⼀个 iterator
let iterator = createIterator();
console.log(iterator.next().value); // 1
console.log(iterator.next().value); // 2
console.log(iterator.next().value); // 3
```

console.dir()以“对象”的方式展示（可展开属性树）

```jsx
const obj = { a: 1, b: { c: 2 } };
console.log(obj); // 常规打印，浏览器可能折叠或优化显示
console.dir(obj); // 以对象视图展示，可展开

const el = document.querySelector('#app');
console.log(el);  // <div id="app">...</div> 的元素预览
console.dir(el);  // 该元素对象的属性树（prototype 链、事件、属性等）

// 在 Node.js 中，console.dir 接受 inspect 选项：
const data = { a: 1, b: { c: { d: { e: 5 } } }, arr: Array(100).fill(0) };

console.dir(data, {
  depth: null,        // 无限深度（默认是 2）
  colors: true,       // 终端着色
  maxArrayLength: 10, // 数组最多展示 10 个元素
  breakLength: 80,    // 超过换行
  showHidden: false,  // 展示不可枚举属性（true 时）
  getters: true       // 调用 getter 展示值（慎用）
});
//想看“对象内部属性树”用 console.dir；想看“渲染/值的直观展示”用 console.log。
// Node 里 console.dir(obj, options) 更适合调试复杂/深层对象
```

**yield vs return**

yield更像断点，遇到yield，暂停执行，下次从该位置继续向后执行具备位置记忆；一个func里可以执行多次yield；不能跨函数，需要和*配合

generator可以返回一系列值，可以有n个yield，可以把异步回调变成“同步”？？？？

```jsx
// 一个返回 Promise 的异步函数（模拟请求）
const fetchUser = id =>
  new Promise(res => setTimeout(() => res({ id, name: 'Alice' }), 300));

const fetchPosts = userId =>
  new Promise(res => setTimeout(() => res(['p1','p2']), 300));

// 生成器：写法像同步，但每步 yield Promise
function* main() {
  const user = yield fetchUser(42);
  console.log('user:', user);

  const posts = yield fetchPosts(user.id);
  console.log('posts:', posts);

  return 'done';
}

// 迷你 runner：自动等待 Promise，完成后把结果灌回生成器
function run(genFn) {
  const it = genFn();
  return new Promise((resolve, reject) => {
    function step(nextF, arg) {
      let r;
      try { r = nextF.call(it, arg); } catch (e) { return reject(e); }
      const { value, done } = r;
      if (done) return resolve(value);
      // 期待 yield 出来的是 Promise
      Promise.resolve(value).then(
        v => step(it.next, v),
        e => step(it.throw, e)
      );
    }
    step(it.next); // 启动
  });
}

run(main).then(console.log).catch(console.error);
// 输出：
// user: { id: 42, name: 'Alice' }
// posts: ['p1','p2']
// done
```

async/await是Promise的语法糖??? 对generator改进？？？

所以promise搭配async/await才是正解？

```jsx
async function main() {
  const user = await fetchUser(42);
  const posts = await fetchPosts(user.id);
  return 'done';
}
main().then(console.log);
const delay = (ms, val) =>
  new Promise(res => setTimeout(() => res(val), ms));

const fetchUser = id => delay(300, { id, name: 'Alice' });
const fetchPosts = userId => delay(300, ['p1','p2']);

//generator+runner
// 生成器里写“像同步”的流程：yield 出 Promise，暂停在这里
function* mainGen() {
  const user = yield fetchUser(42);
  console.log('user:', user);

  const posts = yield fetchPosts(user.id);
  console.log('posts:', posts);

  return 'done';
}

// 一个极简 runner：拿到 yield 的 Promise，完成后把值灌回去
function run(genFn) {
  const it = genFn();
  return new Promise((resolve, reject) => {
    function step(nextF, arg) {
      let r;
      try { r = nextF.call(it, arg); } catch (e) { return reject(e); }
      const { value, done } = r;
      if (done) return resolve(value);
      Promise.resolve(value).then(
        v => step(it.next, v),
        e => step(it.throw, e)
      );
    }
    step(it.next); // 启动
  });
}

run(mainGen).then(console.log); // => user: ... posts: ... 最后 'done'

// promise chain
fetchUser(42)
  .then(user => {
    console.log('user:', user);
    return fetchPosts(user.id);
  })
  .then(posts => {
    console.log('posts:', posts);
    return 'done';
  })
  .then(console.log);
  
  //async/await (对“Generator+runner”的语言级封装）
  async function mainAsync() {
  const user = await fetchUser(42);
  console.log('user:', user);

  const posts = await fetchPosts(user.id);
  console.log('posts:', posts);

  return 'done';
}
mainAsync().then(console.log);

//高性能：await 并行 （如果是逐行是串行）
console.time('parallel');
const p1 = delay(300, 'A');
const p2 = delay(300, 'B');
const [a2, b2] = await Promise.all([p1, p2]);
console.timeEnd('parallel'); // ~300ms
console.log(a2, b2);

// Node 风格（浏览器可用 FileReader / IndexedDB 举例）
function readFileP(path) {
  const fs = require('fs');
  return new Promise((res, rej) =>
    fs.readFile(path, 'utf8', (err, data) => err ? rej(err) : res(data))
  );
}

(async () => {
  try {
    const a = await readFileP('./a.txt');
    const b = await readFileP('./b.txt');
    console.log(a + b);
  } catch (e) {
    console.error('读取失败：', e.message);
  }
})();
```

await 会阻塞下⾯的代码（即加⼊微任务队列），先执⾏ async外⾯的同步代码，同步代码执⾏完，再回到async 函数中，再执⾏之前阻塞的代码

定时器

var id=setTimeout(fn,delay)

var id=setInterval(fn,delay)

clearInterval(id),clear Timeout(id):接受定时器id，停止对定时器中函数调用

定时器（如 `setTimeout()` 或 `setInterval()`）指定的延时时间并不能得到严格保证，≥ 你设置的延迟时间

```jsx
setTimeout(fn, 1000) // 在至少 1000 毫秒后，把 fn 这个任务放进任务队列
///是否“立刻执行”，取决于主线程是否空闲

console.log('start');
setTimeout(() => console.log('timeout'), 1000);

const start = Date.now();
while (Date.now() - start < 3000) {} // 模拟耗时任务：阻塞主线程3秒
console.log('end');
//延时 1 秒的定时器，3 秒后才执行
//主线程被 while 循环阻塞，事件循环不能调度 setTimeout 回调

//改善：高精度计时 使用 performance.now() 而非 Date.now()
//若需精确控制动画时间，用 requestAnimationFrame()

//若对实时要求高（游戏）
//使用 Web Audio API 的时间基准，或独立线程（Web Worker / AudioWorklet）
```

**内存管理GC**

自动垃圾回收机制

函数运行结束，没有闭包或引用，局部变量mark clean

```jsx
// mark-clean
<!doctype html>
<meta charset="utf-8" />
<title>Mark & Sweep Demo</title>
<button id="alloc">创建大对象</button>
<button id="drop">断开引用（不可达）</button>
<pre id="log"></pre>
<script>
const log = (...a) => (logBox.textContent += a.join(' ') + '\\n');
const logBox = document.getElementById('log');

let rootRef = null; // 作为“根”的全局引用
const reg = 'FinalizationRegistry' in window ? new FinalizationRegistry(tok => {
  log('对象已被回收(时间不保证)：', tok);
}) : null;

document.getElementById('alloc').onclick = () => {
  // 模拟占内存的大对象
  const big = { buf: new Array(2e6).fill(0), tag: Date.now() };
  if (reg) reg.register(big, 'big#' + big.tag);
  rootRef = big;                  // 挂到“根” → 可达
  log('已创建并保持可达：', big.tag);
};

document.getElementById('drop').onclick = () => {
  rootRef = null;                 // 断开与根的引用 → 变不可达
  log('已断开引用，等待 GC 标记-清除');
  // 提示：打开 devtools 的 Memory/Performance 面板观察内存变化
};
</script>
//引用计数
<!doctype html>
<meta charset="utf-8" />
<title>Reference Counting & Leaks</title>
<button id="makeCycle">制造循环引用</button>
<button id="releaseCycle">释放循环引用</button>
<button id="leakByCache">错误缓存导致泄漏</button>
<button id="fixLeak">修复（WeakMap/移除监听）</button>
<pre id="log"></pre>
<script>
const log = (...a) => (box.textContent += a.join(' ') + '\\n');
const box = document.getElementById('log');

let a = null, b = null;           // 用于“循环引用”演示
const cache = [];                 // 模拟错误缓存造成的泄漏
const wm = new WeakMap();         // 用 WeakMap 存储临时映射，便于回收

document.getElementById('makeCycle').onclick = () => {
  a = { name: 'A' };
  b = { name: 'B' };
  a.other = b;  // A -> B
  b.other = a;  // B -> A  （形成环）
  log('已形成 A<->B 的循环引用');
};

document.getElementById('releaseCycle').onclick = () => {
  // 在“引用计数”算法里，这个环可能泄漏；在“可达性”算法里，只要从根断开就能回收
  a = null;
  b = null;     // 从根断开，下一轮 GC 可回收
  log('已从根断开（现代 JS 可达性算法可回收）');
};

document.getElementById('leakByCache').onclick = () => {
  // 典型逻辑泄漏：把临时 DOM/对象塞进全局数组，永不删除 → **可达** → 无法回收
  const node = document.createElement('div');
  node.textContent = 'temp';
  cache.push(node);               // 这行把 node 永久保留在“根可达”的大数组里
  // 正确做法：使用 WeakMap/WeakSet 存弱引用，或使用后及时清理
  wm.set(node, Date.now());       // WeakMap 不会阻止 node 被回收
  log('把一个临时节点塞进了全局 cache（会泄漏）');
};

document.getElementById('fixLeak').onclick = () => {
  cache.length = 0;               // 清空强引用
  log('已清空 cache 强引用；WeakMap 不阻止回收，不用手动清');
};
</script>
//回收后整理
<!doctype html>
<meta charset="utf-8" />
<title>Compaction (Defragment) Simulator</title>
<pre id="out"></pre>
<script>
const print = s => out.textContent += s + '\\n';
const out = document.getElementById('out');

// 一个简单的线性堆：0 表示空，正整数表示块大小（为演示方便）
let heap = [0,0,0,0,0,0,0,0,0,0];

function alloc(size){ // first-fit
  for(let i=0;i<=heap.length-size;i++){
    if(heap.slice(i,i+size).every(v=>v===0)){
      for(let j=0;j<size;j++) heap[i+j] = size; // 简化: 用块大小标记
      return {start:i,size};
    }
  }
  return null; // 分配失败（碎片太多/空间不足）
}

function free(block){
  for(let i=block.start;i<block.start+block.size;i++) heap[i]=0;
}

function compact(){
  const newHeap = new Array(heap.length).fill(0);
  let p = 0;
  for(let i=0;i<heap.length;){
    if(heap[i]===0){ i++; continue; }
    const size = heap[i];
    // 把连续块搬到新位置 p..p+size-1
    for(let k=0;k<size;k++){ newHeap[p+k]=size; }
    p += size;
    i += size;
  }
  heap = newHeap;
}

function show(title){
  print(title + '  ' + heap.map(x => x===0?'.':String(x)).join(' '));
}

// 演示流程
show('初始');
const A = alloc(3); show('分配A(3)');
const B = alloc(2); show('分配B(2)');
const C = alloc(3); show('分配C(3)');
free(B);            show('释放B → 产生碎片');
const D = alloc(2); show('尝试分配D(2) (可能成功/失败取决于空洞位置)');
free(A);            show('释放A → 更多碎片');
const E = alloc(4); show('尝试分配E(4) 可能失败(空间足够但不连续)');
compact();          show('整理(Compaction) 后再试');
const F = alloc(4); show('整理后分配F(4) 成功');
</script>
```

识别内存泄漏：如果连续五次垃圾回收后，内存占用一次比一次大，有内存泄漏

造成的原因：？？？？？

意外的全局变量

被遗忘的定时器和回调函数

事件监听没有移除

没清理的DOM引用

子元素存在的内存泄漏

闭包



V8对GC优化：栈和堆分别数据回收，堆中用主副垃圾回收器回收新老生代

JS单线程运行，垃圾回收算法和脚本任务在同一线程内运行

UTF-8

UTF-16

Unicode

中文在数据库占2字符，在浏览器中，js由unicode编码，所有字符都是一个，前后端堆中文验证程度不一样

```jsx
function getRealLength( str ) {
return str.replace(/[^\\x00-\\xff]/g, '__').length; //这个把所有双字节的都给匹配进去了
}
```

获取时间戳

```js
function timemove() {

let d1 = new Date()

let nextYear = d1.getFullYear() + 1

let d2 = new Date(nextYear + "/1/1 00:00:00")

let d = d2- d1

let Day = parseInt(d/1000/60/60/24)

let Hours = parseInt(d/1000/60/60%24)

let time = Day+"day"+Hours+"hour"+Minutes+"minutes"+Seconds+"seconds"
console.log(time)
}
```

