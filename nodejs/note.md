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
本质是 func() 

const mw = function(req,res,next){
    console.log('this is the easiest middleware func')
    //当前中间件业务处理完后 必须调用 next()
    next()  //流转关系转交给下一个中间件/路由
}
app.use(mw) //全局生效的中间件

可以使用 app.use() 连续定义多个全局中间件。客户端请求到达服务器之后，会按照中间件定义的先后顺序依次进行调用

局部生效中间件：不使用app.use() 定义的中间件
const mw1 = function(req,res,next){
    res.send('Home page.')
}
app.get('/user',function(req,res){res.send('user page.')})

//等价写法
app.get('/',mw,mw1,(req,res)=>{res.send('home page')})
app.get('/',[mw,mw1],(req,res)=>{res.send('home page')})