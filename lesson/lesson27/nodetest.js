const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "hello.txt");

console.log(filePath);
fs.writeFileSync(filePath, "hello world");
