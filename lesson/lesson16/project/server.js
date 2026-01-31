const express = require("express");

const app = express();
const PORT = 3000;

//解析application/x-www-form-urlencoded格式请求体
app.use(express.urlencoded({extended:true}))
//解析JSON格式请求体
app.use(express.json())

app.use(express.static("public")); //提供静态文件服务

app.post("/login", (request, response) => {
  console.log(request, request.body); //获取表单数据

  const{username,password}=request.body
  //登录逻辑
  if(username==="admin" && password==="123456"){
    response.send("login success")
  }else{
    response.send("login failed")
  }
});

app.listen(PORT, () => {
  console.log("server running on PORT 3000");
});


//xxx.html 实现 login 页面 http://localhost:3000/login.html