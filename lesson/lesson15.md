光猫：调制解调器

DNS 默认走 TCP
任何应用和协议都要走五层
找 baidu.com 的 IP 先找缓存 本地没有则去 ISP ISP 有一个本地 DNS 提供的服务器地址

DNS：8.8.8.8 运营商提供的服务器地址 服务器存映射 baidu.com 和这个 IP10.10.10.1
network layer

第二层：如果 8.8.8.8 没有存 则去（全球顶级）ROOT 服务器找 存.com,对应的服务器(TLD 服务器)，.net

第三层：Authoritative nameserver 记录 A（IPV4）记录 AAAA（IPV6）

cloudflare 服务优惠

浏览器安全策略 CORS 什么时候被访问禁止？
只要“跨域”（scheme/host/port 任意一个不同）且服务端没放行，就会被禁止
“简单请求” vs “预检请求”：被禁止发生点不同
带 Cookie / Session 时：更容易被禁止
即使服务端返回 200 也会“被禁止”（服务端可以正常返回 200 + JSON，但是浏览器仍然报 CORS 错误）

localhost
127.1.1

express web 框架
node 语言

缓存压缩
代理：解析域名

web 应用：客户端 CB 架构
CDN 服务器：分布主要城市 减少并发
Nginx:web 服务器
方案 2：CORS 不报错 不抗压 没有 CDN

vscode 产生源码 CPU+GPU+内层 机器主机
web 服务器--liverserver
aws,aliyun，硬件 机器网线，node 产生服务的软件
mac 机器产生服务 IP 远程服务
部署 CI/CD 产生软件

缓存压缩
nodejs 高压 耦合度高

web Application 用 express 实现

网关 192.168.11 找 mac 地址

下节课写小型 Application
