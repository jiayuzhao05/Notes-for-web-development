//动态表达式：运行时解析和计算的表达式，而不是编译时
//静态表达式：一读就知道结果，跟运行时状态无关；不依赖运行时输入（用户输入、当前时间、随机数等）
//引擎可以提前优化（常量折叠、死代码消除等）;TS、打包工具更容易做检查和优化

function Stack() {
  this._datas = []; // 内部数组，存储栈的所有元素
}
// 公共方法：入栈
Stack.prototype.push = function (data) {
  this._datas.push(data); // 向数组末尾添加元素
};
Stack.prototype.pop = function () {
  return this._datas.pop();
};
Stack.prototype.getTop = function () {
  return this._datas[this._datas.length - 1];
};

var operators = {
  "+": {
    level: 1, // 优先级
    compute: function (a, b) {
      return a + b;
    },
  },
  "-": {
    level: 1,
    compute: function (a, b) {
      return a - b;
    },
  },
  "*": {
    level: 2,
    compute: function (a, b) {
      return a * b;
    },
  },
  "/": {
    level: 2,
    compute: function (a, b) {
      return a / b;
    },
  },
  "%": {
    level: 2,
    compute: function (a, b) {
      return a % b;
    },
  },
};

/**
 * 四则运算扫描器
 * @param {String} s  //文档化函数参数
 */
function Scanner(s) {
  this.s = s.replace(/\s/g, ""); // 去掉所有的空白字符，方便后续处理
  this.numberExp = /^\d+(\.\d+)?/; // 匹配字符串开头的数字
  this.opExp = /^[\(\)\+\-\*\/\%]/; // 匹配字符串开头的符号
}

/**
 * 从字符串s开头的位置，取一个符号或者是数字
 */
Scanner.prototype.next = function () {
  if (this.s.length === 0) {
    // 字符串没东西了
    return null;
  }
  // 尝试着匹配数字
  var match = this.s.match(this.numberExp);
  var result; // 记录下一个东西
  if (!match) {
    // 下一个是符号
    result = {
      type: "operator",
      value: this.s[0],
    };
    this.s = this.s.substr(1); //substr被废弃
  } else {
    // 下一个是数字
    result = {
      type: "number",
      value: +match[0],
    };
    this.s = this.s.slice(match[0].length);
  }
  return result;
};

/**
 * 运算一个表达式，返回结果
 * @param {String} s 运算表达式
 * @returns {Number} 运算结果
 */
function compute(s) {
  var numStack = new Stack(); // 数字栈
  var opStack = new Stack(); // 符号栈

  /**
   * 运算
   * @returns {Boolean} 是否运算了
   */
  function _compute() {
    var op = opStack.getTop();
    if (!op) {
      // 栈是空的
      return false;
    } else if (op === "(") {
      // 栈顶是左括号
      opStack.pop();
      return false;
    } else {
      opStack.pop();
      var num1 = numStack.pop();
      var num2 = numStack.pop();
      var result = operators[op].compute(num2, num1);
      numStack.push(result);
      return true;
    }
  }

  /**
   * 处理一次操作
   */
  function _handleOperation(op) {
    var topOp = opStack.getTop(); // 得到目前的栈顶
    if (op === ")") {
      // 看到), 运算到左括号出栈为止。
      // 一直算到左括号
      while (_compute()) {}
    } else if (
      !topOp ||
      op === "(" ||
      topOp === "(" ||
      operators[op].level > operators[topOp].level
    ) {
      // 如果符号栈空、当前符号是(、栈顶是(、当前符号优先级高，直接入栈
      opStack.push(op);
    } else {
      // 如果当前符号 <= 栈顶符号，运算，递归查看
      _compute(); // 运算一次
      _handleOperation(op);
    }
  }

  var scanner = new Scanner(s);
  var next;
  while ((next = scanner.next())) {
    if (next.type === "number") {
      numStack.push(next.value);
    } else {
      _handleOperation(next.value);
    }
  }
  // 将符号栈清空
  while (_compute()) {}
  return numStack.getTop();
}

var result = compute("6 + 16 - (3 + 2 - 5 * 2)");
console.log(result);


//依赖运行时值
const now = Date.now()      // 当前时间，只有运行时才知道
const r = Math.random()     // 随机数
const msg = input + 'hello'  // input 来自用户或接口

//动态属性 / 计算属性名
const key = getKeyFromServer()
const obj = {
  [key]: 123      // 动态表达式，属性名只有运行时才知道
}

//动态访问
const prop = userChoice      // 用户选择 'name' 或 'age'
console.log(user[prop])      // 运行时才能确定访问哪个属性

//动态 import
const moduleName = condition ? './a.js' : './b.js'
const mod = await import(moduleName)   // 运行时决定加载哪个模块