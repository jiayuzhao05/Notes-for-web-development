部署

神经元没有什么东西 海马体相当于内存

开源模型 chatgpt通网模型

6B = 60亿神经参数
32B parameters
64B
推理 非存储 内存

mac studio 256G 内存 10月出568G版本 跑本地模型不消耗token 只消耗电量

30-core CPU 多核可以多线程跑
65-core GPU 可以跑

hugging face: ai版的github

mac studio 内嵌神经网络 芯片友好

AMD出128G 支持2b参数(芯片底层优化) 支持训练模型

适合网关

nodejs适合网关 不适合cpu密集型  
网关相当于卡在后端上 找到对应路由 user1/ API相当于中间层
如何解决? 用worker或者c++

docker相当于一个箱子 nodejs拥有系统全权限

event loop不是JS特性

sertInterval() setTimeout()有时钟偏差 JS会产生时间偏移 本身5s 会产生>5.0001s

preload (key css 写在<style> 非key css)
onload <link> 异步加载

express js写后端支持http 1/2 但不支持http3

http 1.1 binary 分帧层 http2共享tcp连接
