AI chatbox

RNN Recurrent Neural Network（循环神经网络）
有“记忆”，能处理序列数据（文字、语音、时间序列）
"""
输入: "我" → "爱" → "编" → "程"
↓ ↓ ↓ ↓
[RNN] → [RNN] → [RNN] → [RNN] → 输出/预测下一个词
↑**\_\_**|**\_\_**|**\_\_**|
隐藏状态 h（记住前面内容）
"""
每一步都会把当前输入和上一步的隐藏状态一起算，所以能利用上下文
早期对话/文本模型常用 RNN/LSTM。现在主流大模型（GPT 等）已改用 Transformer

CNN Convolutional Neural Network（卷积神经网络）
用卷积核在局部区域滑动，擅长抓空间/局部模式
"""
图像像素网格
┌───┬───┬───┐
│ ■ │ □ │ ■ │ → 卷积核扫描 → 边缘、纹理、形状特征
└───┴───┴───┘
"""
最初主要用于图像：分类、检测、分割。
也可用于文本：用一维卷积在词/字符序列上扫，抓 n-gram 式局部模式。
优点：参数共享、计算高效、对平移等变换较鲁棒

纯 CNN 做长对话不如 RNN/Transformer 常见；更多出现在多模态场景（例如理解用户上传的图片）

挂载件：prompt engineering design
本地接口 自己训练模型 本地模型无法处理的再引入中型模型比如GPT(分层->降本)
简单问答走本地 复杂再调API

AI只能控制前两个prompt 压缩精简成下一个prompt
对话一长 不能把所有历史原样塞给模型
策略：只保留/精细控制前两轮（prompt块） 让AI总结压缩成一段shorter context下一轮输入
"""
[系统 prompt] + [用户第1轮] + [AI回复1] + [用户第2轮] + [AI回复2]
↓ 压缩
[摘要 prompt] → 继续后续对话
"""

前端用正则等方式做拦截 有些敏感词/emoji等 或者跳提示词框告诉用户(前段用于体验和部分防护，少浪费API调用，即时反馈用户，安全还是要靠后端+模型侧moderation)
正则匹配: 拦截敏感词、违规格式
emoji 等规则: 过滤或限制某些输入
提示框: 不能输入 xxx」「请换个说法」

payment system：stripe网关 查账 API和前端用
chatbox若要订阅/按量付费
前端checkout/subscription,后端webhook处理支付成功 开通权限

智谱（GLM系列） 国内流行模型

调用AI模型
中间件保证IO：中间件处理IO：鉴权、限流、日志、错误重试、流式响应（SSE）等 避免接口各自写一遍
model写我想写的模型

prompt.yml （prompt集成管理 不同场景prompt集中放在一个配置文件里统一管理）
[
login:{} //登录prompt
XXX:{} //其他业务场景(客服 问答 支付说明)
]

[
login:{key:""} //每个场景对应一个prompt模板ID/API key
XXX:{}
]

SSO验证机制：可以通过第三方验证机制登录其他所有合作网站
Single Sign-On 用户用一个账号体系登录一次，就能访问多个关联网站/应用
对于chatbox，用户身份统一 多个子产品（官网 文档站 chat控制台）共用一套登录 不用每个站单独注册

但是如果用npm包单独写一个组件 在基础上调整 一旦npm包更新 则需要被迫调整
如果用下列SDK包一层自己的组件，
开发快，UI/流式对话现成 少造轮子 不然在上面改的样式和逻辑要跟着迁移
solution：
薄封装：只包一层 少改SDK内部
锁版本：package.json固定大版本 有计划再升
核心自研：UI用SDK，调模型，prompt，鉴权，支付
抽象接口：业务只依赖自己的chatservice,底层换SDK影响面小

resources:
https://www.assistant-ui.com/
https://chat-sdk.dev/
https://github.com/vercel/ai-chatbot
https://github.com/assistant-ui/assistant-ui
sdk.vercel.ai

支付系统：需要考虑交易并发数
幂等+状态机
并发高容易出问题1.重复支付/开通
solution：幂等 订单号唯一 防止重复提交
2.webhook重复/乱序
stripe多次推送[payment successfully]/晚到
需要：按payment_id/event_id去重 状态机（一件事在生命周期里有哪些状态，以及在什么条件下可以从 A 变到 B）
为什么状态机解决webhook重复乱序？
stripe可能推同一件事3次（payment succeed）

3.库存/额度超卖
比如[限时 1000 个订阅名额]/[每日 API 调用额度]:
并发下若只查后写，不加锁，可能卖超
需要：数据库乐观/悲观所 redis原子扣减

4.并发限制第三方网关
stripe有QPS/并发限制
突发流量要队列、限流、异步处理webhook，不能每条请求都同步调网关

5.对账和一致性
高并发下「用户已扣款，但你们系统没开通」要有：订单表 + 支付流水 + 定时对账 钱和权限一致

架构师不会被AI替代

工程化
走业务专属路线 比如某个库用的很溜

BFF
"""
浏览器 / App
↓
BFF（给 Web 用的 API）
↓
用户服务 / 支付服务 / AI 服务 / 数据库...
"""
