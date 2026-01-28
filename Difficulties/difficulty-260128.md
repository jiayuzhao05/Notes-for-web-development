splice()  vs slice()  80%数组操作

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