export const config = 3

//ESM: 运行时import() 返回promise 异步加载
//import,export必须放在顶部
// tree-shaking 打包工具 移除未使用的代码 减小最终打包文件的体积 提前知道哪些模块之间有关 形成依赖树 打包器 知道哪些地方用了哪些模块
// 多用箭头函数