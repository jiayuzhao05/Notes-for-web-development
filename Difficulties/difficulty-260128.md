splice()  vs slice()  项目里80%数组操作都是切片
slice()：不改原数组/字符串，返回“切片副本”
slice(start,end)：[start,end)
arr.slice() 复制数组

splice()：会改原数组，在指定位置“删除/插入”，返回“被删除的元素数组”
删除：splice(i, n)
插入：splice(i, 0, x, y)
替换：splice(i, n, x, y)

单页面应用如何实现多页面跳转？
「多页面跳转」其实是 改 URL + 在同一个页面里换组件，不整页刷新。靠 前端路由（Client-Side Routing） 实现。

1.「多页面」在 SPA 里是什么？
仍是 一个 HTML，一个根节点（如 <div id="root">）。
「多页」= 不同 URL 对应不同视图（如 /、/about、/users/1），由 JS 切换要渲染的组件。
不发起整页请求，只是 改 URL + 换组件，所以叫单页面。
2. 怎么实现「跳转」？—— 前端路由
思路：
改 URL：用 History API（pushState / replaceState）或 Hash（#/about）。
监听 URL 变化：popstate（History）或 hashchange（Hash）。
根据当前 URL 渲染对应组件：路由表匹配 path → 组件。
用户点链接 / 后退 / 前进时，只触发上述逻辑，不重新加载整页。

History	/about、/users/1	history.pushState / popstate	好看、需服务端配合做 fallback
Hash	/#/about、/#/users/1	改 location.hash，监听 hashchange	不需要服务端配置，兼容老环境

1.前端路由
History 模式：pushState/replaceState + popstate，URL 像真实页面：/user/1
Hash 模式：location.hash + hashchange，URL 带 #：/#/user/1
React 常用 react-router，Vue 常用 vue-router

2.“伪多页”：一个 HTML，多个入口渲染
仍是 SPA，本质是根据路由/状态切换不同页面组件（Home、About…）

3.真的跳到另一个页面（离开 SPA）
直接 window.location.href = 'xxx.html' 或跳到另一个站点/子应用
会发生整页刷新，这不算 SPA 内部路由，但确实是“多页面跳转”

4.混合：微前端 / 多 SPA
不同“页面”由不同子应用负责，通过主框架做路由分发（仍尽量不整页刷新）

History 模式必须配后端
如果用 History 路由（例如直接访问 /about），刷新或首次打开会请求服务器的 /about，所以服务器要做fallback：未命中静态资源/接口时返回 index.html。否则会 404