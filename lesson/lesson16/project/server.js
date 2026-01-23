const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.static("public")); //xxx.html 实现 login 页面

app.post("/login", (request, response) => {
  console.log(request, request.body);
});

app.listen(PORT, () => {
  console.log("server running on PORT 3000");
});
