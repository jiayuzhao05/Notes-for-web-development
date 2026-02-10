const os = require("os");
const path = require("path");
// console.log(os.EOL); // 换行符

// console.log(os.arch()); // 架构

// console.log(os.cpus().length); // 核心数

// console.log(os.freemem() / 2 ** 30); // 空闲内存

// console.log(os.homedir()); // 主目录路径

// console.log(os.hostname()); // 主机名

console.log(os.tmpdir()); // 临时目录

// const ext = path.extname("a/b/c/a.js"); // 扩展名
// console.log(ext);
// const basePath = "a/b"; // 基路径
// const fullpath = path.join(basePath, "../", "d.js"); // 拼接路径
// console.log(fullpath);

// const rel = path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb'); // 相对路径
// console.log(rel)

const absPath = path.resolve(__dirname, "./a.js"); // 绝对路径
console.log(absPath);

//Sync函数是同步的，会导致JS运行阻塞，极其影响性能 在程序启动时运行有限的次数即可
// const content = fs.readFileSync(filename, "utf-8");
// console.log(content);


//使用TS后，可以编写出完善的面向对象代码

