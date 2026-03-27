基于 nodejs 
express（npm 第三方包 web 开发框架） 构建 web 应用 
electron  跨平台桌面应用
restify api 接口项目

fs.readFile()
fs.writeFile()

const fs = require('fs')
fs.readFile(path[,options],callback)

fs.readFile('./files/11.txt','utf8',function(err,dataStr){
    if(err){
        return console.log('file read failed'+err.message)
    }
    console.loh('file read success!'+result)
    console.log(err)
    console.log(dataStr)
})

fs.writeFile(file,data[,options],callback)


fs.readFile(__dirname+'./files/1.txt','utf8',function(err,dataStr){
    if(err) return console.log('read file failed'+err.message)
    console.log(dataStr)
})

const pathStr = path.join('/a','/b/c')
console.log(pathStr) // \a\b\d\e

const pathStr2 = path.join(__dirname,'/files/1.txt')
console.log(pathStr2)

const fpath = '/a/b/c/index.html'
var nameWithoutExt = path.basename(fpath,'.html')
console.log(nameWithoutExt)

path.extname(path)  //获取路径中扩展名部分
path.basename(path[,ext])  //获取路径中最后一部分

//创建web 服务器
const http = require('http')
const server = http.createServer()

server.on('request',(req,res)=>{
    const str = 'your request url is ${req.url}, and request method is ${req.method}'
    console.log(str)
    res.end(str)
    console.log('someone visit web server')

    res.setHeader('Content-Type','text/html;charset=utf-8')
    res.end(str)
})

server.listen(80,()=>{console.log('http server running at http://127.0.0.1')})

server.on('request',function(req,res){
    const url = req.url
    let content = '<h1>404 not found</h1>'
    if(url==='/' || url ==='/index.html'){
        content ='<h1>first page</h1>'
    } else if (url ==='/about.html'){
      content = '<h1>about page</h1>'
}
    res.setHeader('Content-Type','text/html;charset=utf-8')
    res.end(content)
    })

module.exports vs exports  ?

内置模块加载优先级最高

 #express
 web 网站服务器：提供 web 网页
 API 接口服务器:对外提供接口


const express = require('express')
const app = express()
app.listen(80,()=>{
    console.log('express server running at http://127.0.0.1')
})

app.get('url',function(req,res){/* */})
app.post('url',function(req,res){/**/})
//获取 url 中携带的查询参数
app.get('/',(req,res)=>{console.log(req.query)})
//获取 url 中动态参数
app.get('/user/id',(req,res)=>{console.log(req.params)})

//托管静态资源
app.use(express.static('public'))
app.use(express.static('files'))
app.use('/public',express.static('public'))

# express router
客户端请求和服务器处理函数之间的映射关系
app.METHOD(PATH,HANDLER)

app.get('/',function(req,res){
    res.send('hello world')
})
app.post('/',function(req,res){
    res.send('Got a POST request')
})

路由匹配过程
请求到达服务器后 先经过路由匹配 匹配成功后带哦用处理函数 请求类型而活请求 url 匹配成功  express 才会将此次请求转交给 func()处理

模块化管理 路由抽离为单独模块 
var express = require('express')
var router = express.Router()

router.get('/user/list',function(req,req){
    res.send('get user list')
})
router.post('/user/add',function(req,res){
    res.send('add new user.')
})

module.exports = router

const userRouter = require('./router/user.js')
app.use('/api',userRouter)

express服务器充当中间件
本质是 func()  中间件函数形参必须包含 next 路由处理函数只有 req,res

const mw = function(req,res,next){
    console.log('this is the easiest middleware func')
    //当前中间件业务处理完后 必须调用 next() 流转关系转交给下一个中间件/路由
    next()  
}
app.use(mw) //全局生效的中间件

可以使用 app.use() 连续定义多个全局中间件。客户端请求到达服务器之后，会按照中间件定义的先后顺序依次进行调用

局部生效中间件：不使用app.use() 定义的中间件
const mw1 = function(req,res,next){
    res.send('Home page.')
}
app.get('/user',mw1, function(req,res){res.send('user page.')})

//多个局部中间件等价写法
app.get('/',mw,mw1,(req,res)=>{res.send('home page')})
app.get('/',[mw,mw1],(req,res)=>{res.send('home page')})

多个中间件间共享 req 和 res 对象

中间件用法：应用级别，路由级别，错误级别，express 内置，第三方
(1)应用级别 
//全局中间件
app.use((req,res,next)=>{next()})
//局部
app.get('/',mw1,(req,res)=>{
    res.send('Home page.')
})

(2)路由级别
绑定 express.Router()实例上的中间件 用法和应用级别无区别 一个绑定到 app 实例 一个绑定到 router 实例
router.use(function(req,res,next){
    console.log('Time',Date.now())
    next()
})

app.use('/',router)

(3)错误级别 捕获项目发生的异常错误 防止项目异常崩溃 有 4 个形参 (err, req, res, next) 必须注册在所有路由后！
app.use(function(err,req,res,next){
    console.log("err:"+err.message)
    res.send("error!"+err.message)
})

（4）内置 
static 快速托管静态资源（html 文件，图片，css（无兼容性））
json 解析 json 的请求提数据 有兼容性
urlencoded 解析 url-encoded 格式请求体 有兼容性 基于第三方 baby-parse 进一步封装
app.use(express.json())
app.use(exress.urlencoded({extended:false}))

(5)第三方
baby-parse：express@4.16.0之间火爆 解析请求提数据

自定义中间件 
模拟 express.urlencoded 解析 post 提交到服务器的表单数据
app.use(function(req,res,next){//middleware})
//监听 req 的 data 事件
//定义变量 存储客户端发来的请求体数据
let str = ‘’
req.on('data',(chunk)=>{
    str += chunk
})

//监听 req 的 end 事件 请求提数据接收完毕 自动触发 end
req.on('end',()=>{
    console.log(str)
    
    //导入处理 querystring 的 nodejs 内置模块
const qs = require('querystring')
//调用 qs.parse() 把查询字符串解析成对象
const body = qs.parse(str)

req.on('end',()=>{
    const body = qs.parse(str)  //解析成对象
    req.body = body //请求体对象挂载为 req.body 属性
    next()   
})
})

//创建API 路由模块
//get,post 接口
api.Router.get('/get',(req,res)=>{
    const query = req.query
    res.send({
        status:0,
        msg:'get request success!',
        data:query
    })
})

apiRouter.post('/post',(req,res)=>{
    const body = req.body
    res.send({
        status:0,
        msg:'Post reques success!',
        data:body
    })
})

//CORS 跨域资源共享
//接口的跨域问题 不支持跨域请求
CORS（主流的解决方案，推荐）
JSONP（有缺陷的解决方案：只支持 GET 请求）

//cors 是 express 的第三方 可以方便解决跨域问题 在服务器端配置 客户端浏览器无需额外配置 请求开启 CORS 接口 在浏览器中有兼容性 只有支持 XMLHttpRequest level2 浏览器 访问开启 cors 的服务端接口（IE10+，chrome4+，firefox 3.5+）
安装-导入 const cors = require('cors')-配置 调用 app.use(cors)

cors 响应头部- access-control-allow-origin
仅支持客户端向服务器发送 9 个请求头：accept,acceot-language,DPR,Downlink,Save-Data,Viewport-Width,Width,Content-Type

res.setHeader('Access-Control-Allow-Methods','POST,GET,DELETE,HEAD')
res.setHeader('Access-Control-Allow-Methods','*')

简单请求：客户端和服务器只发生一次请求
预检请求：发生两次请求，OPTION 预检请求成功后才会发起真正的请求

JSONP 通过<script>的 src 属性 请求服务器上数据 服务器返回一个函数调用 
JSONP 不属于真正 Ajax 请求 因为它没有使用 XMLHttpRequest 对象
JSONP 仅支持 GET 请求 不支持其他请求

app.get('/api/jsonp',(res,req)=>{})
app.use(cors())
app.get('/api/get',(req,res)=>{})

//实现 JSONP 接口
app.get('/api/jsonp',(res,req)=>{
    const funcName = req.query.callback
    const data = {name:'zs',age:22}
    const scriptStr = `${funcName}(${JSON.stringify(data)})`
    res.send(scriptStr)
})

//mysql
//查询数据
db.query('SELECT * FROM users',(err,results)=>{
    if(err) return console.log(err.message)
    console.log(results)
})

//插入数据
const user = {id:7,'Spider-man',password:'pcc321'}
const sqlStr = 'Insert Into users(username,password) Values (?,?)'

db.query(sqlStr, [user.username,user.password,user.id],(err.results)=>{
    if(err) return console.log(err.message)
    if(results.affectedRows ==== 1){console.log('insert data successfully')}
})

delete会真正把数据从表中删除 为了保险 推荐标记删除 模拟删除动作 设置状态字段 标记当前数据是否被删除 相当于执行 update 将数据对应 status 标记为删除
//标记删除
db.query('UPDATE USERS SET status=1 WHERE id=?',6,(err,results)=>{
    if(err) return console.log(err.message)
    if(results.affectedRows=== 1) (console.log('deleted the data!'))
})

web 并发模式：
（1）服务端渲染
服务器发送给客户端的 html 页面是在服务器通过字符串拼接动态生成 客户端不需要用 ajax 额外请求页面数据
前端耗时短 利于 seo
占用服务器端资源 开发效率低

（2）前后端分离
依赖 ajax 后端只负责 api 接口 前端使用 ajax 调用接口
减轻服务器端渲染压力 因为页面最终在每个用户浏览器生成
不利 seo 爬虫无法爬取页面有效信息 但利用 react 等框架的 ssr 可以解决seo 问题


身份认证
服务端渲染：session 认证机制
前后端分离：JWT 认证机制

cookie 存储在用户浏览器不超过 4kb 的字符串 （name,value,可选属性）
特性：自动发送 域名独立 过期时限 4kb 限制
很容易被伪造 不要用 cookie 存储重要隐私数据
session：双重认证 在 cookie 基础上添加了用户信息和密码认证

JWT 认证机制 跨域认证专用
session 有局限 需要配合 cookie（默认不支持跨域访问） 涉及到前端跨域请求后端接口 需要很多额外配置
 JWT 验证账号和 pass 后将用户信息对象加密后生成->token 字符串发给客户端->客户端token 存到 localstorage/sessionstorage 客户端再次发起请求时 通过请求头的 authorization 字段将 token 发送给服务器->服务器把 token 字符串还原成信息对象

 header+payload(用户信息)+signature
 JWT 放在http  身份验证
 npm install jsonwebtoken(生成 JWT 字符串) express-jwt(JWT字符串解析还原成 JSON 对象)

/schema/user.js 
//用户信息验证
const username = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().pattern(/^[\s]{6,12}$/).required()
//注册和登录表单的验证规则对象
exports.reg_login_schema = {
    body:{
        username,
        password,
    },
}


/router/user.js 
const express = require('express')
const router = express.Router()

const userHandler = require('../router_handler/user')
const expressJoi = require('@escook/express-joi')
const {reg_login_schema}=require('../shcema/user')
//register new users
router.post('/reguser',expressJoi(reg_login_schema),userHandler.regUser)
//login
router.post('/login',userHandler.login)
module.exports = router

//捕获错误 验证失败结果响应给客户端
const joi = require('@hapi/joi')
app.use(function(err,req,res,next){
    if(err instanceof joi.ValidationError) return res.cc(err)
    res.cc(err)
})