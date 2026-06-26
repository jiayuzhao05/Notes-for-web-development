AI chatbox

RNN

CNN

挂载件：prompt engineering design
本地接口 自己训练模型 本地模型无法处理的再引入中型模型比如GPT
AI只能控制前两个prompt 压缩精简成下一个prompt

前端用正则等方式做拦截 有些敏感词/emoji等 或者跳提示词框告诉用户

payment system：stripe网关 查账 API和前端用

智谱 国内流行模型

调用AI模型
中间件保证IO
model写我想写的模型

prompt.yml （prompt集成使用）
[
login:{}
XXX:{}
]

[
login:{key:""}
XXX:{}
]

SSO验证机制：可以通过第三方验证机制登录其他所有合作网站

但是如果用npm包单独写一个组件 在基础上调整 一旦npm包更新 则需要被迫调整

resources:
https://www.assistant-ui.com/
https://chat-sdk.dev/
https://github.com/vercel/ai-chatbot
https://github.com/assistant-ui/assistant-ui
sdk.vercel.ai

支付系统：需要考虑交易并发数
连接第三方stripe（有手续费） 国内则是alipay wechat

架构师不会被AI替代

工程化
走业务专属路线 比如某个库用的很溜
