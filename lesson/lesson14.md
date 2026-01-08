浏览器只是其中一个 Application

application layer 处理 DNS 协议，HTTP 协议，FTP 协议， 应用支持这个协议 client 和 server 端也有支持这四个协议的能力
nodejs 和 niginx 也支持这四个协议
协议是应用的一部分
上述所有东西都在 OS 分类下 所以 application 肯定有接口
DNS=> 53
80
HTTP=>443

fetch 是第五层的请求 前端资源打包 请求后端资源

课后作业： 在 mac 里面使用 SMB 连接 iphone 和 mac
查找 什么是接口？

4 transport layer
TCP 归端口管 网络请求的收发 本质是代码

TCP vs UDP？

TCP 三次握手 保证数据顺序 消耗时间和功率
UDP 不需要保证数据顺序 效率更高 用于微信语音通话和直播

选择由上游浏览器决定

http 协议有很多版本 http3 用 UDP（UDP + QUIC 保证运输速度）；http1.1 http2 用 TCP

课后作业： 使用 node 完成 http1 写法 http2 写法

http 协议不是由前端写的 取决于后端代码支持
node

操作：端口号 => segment
源端口（80） data 目标端口（80）

data link layer
网卡/交换机 mac 地址
以太网是一种技术规范 如何连接 传输数据 寻找 mac 地址
本地先找 ARP 缓存

mac_B
通过 ARP 缓存找到 MAC 地址

作业：了解以太网工作原理

源 mac 地址 目标 mac 地址

1 physical layer 物理层
本质是网线 wifi

上述都是电信号 用物理层通过调制解调器转换成光信号传输 单位 bit

B MB GB 区别

作业：TCP 三次握手 报文

下次 web 层面
