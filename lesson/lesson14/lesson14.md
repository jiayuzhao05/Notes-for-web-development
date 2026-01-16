浏览器只是其中一个 Application

application layer 处理 DNS 协议，HTTP 协议，FTP 协议， 应用支持这个协议 client 和 server 端也有支持这四个协议的能力
nodejs 和 niginx 也支持这四个协议
协议是应用的一部分
上述所有东西都在 OS 分类下 所以 application 肯定有接口
DNS=> 53
80
HTTP=>443

fetch 是第五层的请求 前端资源打包 请求后端资源

*课后作业： 
(1)在 mac 里面使用 SMB（Server Message Block） 连接 iphone 和 mac
SMB 文件共享协议 局域网内共享文件和打印机
method1：mac作为服务器 iPhone连接mac
macbook-系统设置-文件共享-使用 SMB 共享文件和文件夹
mac启用文件共享 记录IP地址 192.168.0.226
iphone：file-connect to server-mac address(smb://192.168.0.59)

method2：iphone作为服务器 mac连接iphone
iphone本身不支持直接作为 SMB 服务器
在 iPhone 上安装 SMB 服务器应用：FileBrowser，Documents by Readdle，FE File Explorer
应用内启用SMB服务器功能
mac-finder-连接服务器-输入iPhone地址(smb://192.168.0.59)-connect

(2)什么是接口？
1.network interface
计算机和网络通信的硬软件组件
物理网络接口：
en0：以太网接口（有线或 Wi‑Fi）
en1：第二个网络接口
lo0：回环接口（localhost，127.0.0.1）

接口信息：
IP 地址（网络层），MAC 地址（数据链路层），子网掩码，网关地址

2.API接口 Application programming interface 
应用程序之间通信规范
'''
// RESTful API
GET    /api/users        // 获取用户列表
POST   /api/users        // 创建用户
GET    /api/users/:id    // 获取特定用户
PUT    /api/users/:id    // 更新用户
DELETE /api/users/:id    // 删除用户
'''

'''
app.get('/api/users', (req, res) => {
    res.json({users:[...]})
})

fetch('api/users')
    .then(res=>res.json())
    .then(data=>console.log(data))
'''

3.OS Interface
操作系统给应用程序的系统调用接口
//nodejs使用OS系统接口
const fs=require('fs')   // 文件系统接口
const http = require('http')  // 网络接口
const net = require('net')  // TCP/IP 接口


4.protocol interface
不同网络层之间接口 传递数据

TCP/IP协议栈接口
应用层
  ↕ (接口)
传输层 (TCP/UDP)
  ↕ (接口)
网络层 (IP)
  ↕ (接口)
数据链路层 (Ethernet)
  ↕ (接口)
物理层 (网线/WiFi)

5.programming interface
函数、类、模块提供的调用方式
'''
// module interface
module.exports = {
  getUser: function() { ... },
  createUser: function() { ... }
}
//class interface
class UserService {
  getUser() { ... }      // public interface
  _validate() { ... }   // private interface(inner use)
}
'''

6. UI interface
用户和应用程序交互界面
GUI（图形用户界面），CLI（命令行界面），API（应用程序接口）

-------
4 transport layer
TCP 归端口管 网络请求的收发 本质是代码

TCP vs UDP？
TCP 三次握手 保证数据顺序 消耗时间和功率
UDP 不需要保证数据顺序 效率更高 用于微信语音通话和直播

TCP保证可靠传输的机制：
1.序列号和确认号
2.重传机制： 发送数据 → 等待确认；超时未收到确认 → 重传数据
3.流量控制（滑动窗口）
接收方：我的缓冲区只能接收 1000 字节
发送方：好的，我只发送 1000 字节

4.阻塞控制
检测到网络拥堵 → 降低发送速度
网络恢复 → 逐渐增加发送速度

UDP-快速传输协议（无连接 快速传输）
直接发送数据报，不需要建立连接；不等待确认，不保证顺序

数据报结构
+--------+--------+--------+--------+
| 源端口 | 目标端口| 长度   | 校验和 |
+--------+--------+--------+--------+
|           数据（载荷）              |
+-----------------------------------+
头部只有 8 字节（TCP 是 20 字节）；没有连接状态，开销小；发送后不等待确认

使用TCP的场景：
web浏览（HTTP/HTTPS）
HTTP基于TCP 保证网页内容完整、按顺序加载
'''
fetch('https://www.example.com')
'''
文件传输（FTP） 文件不能丢失/乱序 TCP保证文件完整传输
邮件SMTP 邮件内容完整 TCP保证可靠性
MySQL、PostgreSQL 使用 TCP 保证 SQL 查询和结果完整


使用UDP场景：
视频直播 丢失几帧不影响观看体验 UDP 速度快，延迟低
语音通话（微信语音） 实时性 > 可靠性 丢失几个数据包，用户可能听不到 延迟低 通话流畅
在线游戏 
DNS查询 使用 UDP（端口 53）查询速度快，简单请求-响应
nslookup www.example.com
HTTP/3(QUIC)
HTTP/3 基于 UDP + QUIC 协议;QUIC 在 UDP 基础上实现了可靠性;结合了 UDP 的速度和 TCP 的可靠性

选择由上游浏览器决定

http 协议有很多版本 http3 用 UDP（UDP + QUIC 保证运输速度）；http1.1 http2 用 TCP

*课后作业： 使用 node 完成 http1 写法 http2 写法

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

*作业：了解以太网工作原理

源 mac 地址 目标 mac 地址

1 physical layer 物理层
本质是网线 wifi

上述都是电信号 用物理层通过调制解调器转换成光信号传输 单位 bit

B MB GB 区别

*作业：TCP 三次握手 报文
客户端                    服务器
  |                         |
  |---- SYN (seq=100) ----->|
  |                         | 服务器知道客户端想连接
  |<--- SYN-ACK (seq=200) --|
  |     ACK (ack=101)       | 客户端知道服务器准备好了
  |---- ACK (ack=201) ----->|
  |                         | 服务器知道客户端收到了
  |                         |
  |    连接建立成功！        |

为什么需要三次？
两次无法确认服务器是否收到客户端连接需求，3次双方都能确认对方收到了自己的请求

下次 web 层面
