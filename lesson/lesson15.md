DNS 默认走 TCP
任何应用和协议都要走五层
找 baidu.com 的 IP 先找缓存 本地没有则去 ISP ISP 有一个本地 DNS 提供的服务器地址

DNS：8.8.8.8 运营商提供的服务器地址 服务器存映射 baidu.com 和这个 IP10.10.10.1
network layer

第二层：如果 8.8.8.8 没有存 则去（全球顶级）ROOT 服务器找 存.com,对应的服务器(TLD 服务器)，.net

第三层：Authoritative nameserver 记录 A（IPV4）记录 AAAA（IPV6）

cloudflare 服务优惠

浏览器安全策略 CORS 什么时候被访问禁止？
localhost
127.1.1

express web 框架
node 语言
