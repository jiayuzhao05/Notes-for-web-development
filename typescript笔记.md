# 一，typescript学习笔记

## 1-1 JavaScript 与 TypeScript 的区别

TypeScript 是 JavaScript 的超集，扩展了 JavaScript 的语法，因此现有的 JavaScript 代码可与 TypeScript 一起工作无需任何修改，TypeScript 通过类型注解提供编译时的静态类型检查。

TypeScript 可处理已有的 JavaScript 代码，并只对其中的 TypeScript 代码进行编译。

![image-20240609101010313](tyscript.assets/image-20240609101010313.png)

## 1-2 TypeScript 安装

本文介绍 TypeScript 环境的安装。

我们需要使用到 npm 工具安装，如果你还不了解 npm，可以参考我们的[NPM 使用介绍](https://www.runoob.com/nodejs/nodejs-npm.html)。

**NPM 安装 TypeScript**

如果你的本地环境已经安装了 npm 工具，可以使用以下命令来安装。

使用国内镜像：

```
npm config set registry https://registry.npmmirror.com
```

安装 typescript：

```
npm install -g typescript
```

安装完成后我们可以使用 **tsc** 命令来执行 TypeScript 的相关代码，以下是查看版本号：

```
$ tsc -v
Version 3.2.2
```

然后我们新建一个 app.ts 的文件，代码如下：

```typescript
var message:string = "Hello World" 
console.log(message)
```

通常我们使用 **.ts** 作为 TypeScript 代码文件的扩展名。

然后执行以下命令将 TypeScript 转换为 JavaScript 代码：

```
tsc app.ts
```

![img](tyscript.assets/typescript_compiler.png)

这时候在当前目录下（与 app.ts 同一目录）就会生成一个 app.js 文件，代码如下：

```tsx
var message = "Hello World";
console.log(message);
```

使用 node 命令来执行 app.js 文件：

```
$ node app.js 
Hello World
```

TypeScript 转换为 JavaScript 过程如下图：

![img](tyscript.assets/ts-2020-12-01-1.png)

------

## 1-3 Visual Studio Code 介绍

很多 IDE 都有支持 TypeScript 插件，如：Visual Studio，Sublime Text 2，WebStorm / PHPStorm，Eclipse 等。

本章节主要介绍 Visual Studio Code，Visual Studio Code 是一个可以运行于 Mac OS X、Windows 和 Linux 之上的，针对于编写现代 Web 和云应用的跨平台源代码编辑器，由 Microsoft 公司开发。

下载地址：https://code.visualstudio.com/。

### 3-1 Windows 上安装 Visual Studio Code

1、下载 [Visual Studio Code](https://code.visualstudio.com/)。

![img](tyscript.assets/9EDCE892-F34A-4D0C-82BF-03175CFA5F91.jpg)

2、双击 VSCodeSetup.exe 图标 ![img](tyscript.assets/1546508926-7107-launch-setup-process.jpg) 安装。

![img](tyscript.assets/1546508925-5165-setup-wizard.jpg)

3、安装完成后，打开 Visual Studio Code 界面类似如下：

![img](tyscript.assets/1546508924-5187-ide.jpg)

4、 我们可以在左侧窗口中点击当前编辑的代码文件，选择 **open in command prompt**（在终端中打开），这时候我们就可以在屏幕的右侧下半部分使用 **tsc** 命令来执行 TypeScript 文件代码了。

![img](tyscript.assets/1546508926-3046-traverse-files-path.jpg)

### 3-2 Mac OS X 安装 Visual Studio Code

Mac OS X 安装配置 Visual Studio Code 可以查看： [https://code.visualstudio.com/Docs/editor/setup](https://code.visualstudio.com/docs/setup/setup-overview)

### 3-3 Linux 安装 Visual Studio Code

Linux 安装配置 Visual Studio Code 可以查看： [https://code.visualstudio.com/Docs/editor/setup](https://code.visualstudio.com/docs/setup/setup-overview)

## 1-4 TypeScript 基础语法

我们可以使用以下 TypeScript 程序来输出 "Hello World" ：

**Runoob.ts 文件代码：**

```tsx
const hello : string = "Hello World!"
console.log(hello)            // Hello World!
```

以上代码首先通过 **tsc** 命令编译：

```
tsc Runoob.ts
```

得到如下 js 代码：

**Runoob.js 文件代码：**

var hello = "Hello World!"; console.log(hello);

最后我们使用 node 命令来执行该 js 代码。

```
$ node Runoob.js
Hello World
```

整个流程如下图所示：

![img](tyscript.assets/ts-2020-11-26-3.png)

我们可以同时编译多个 ts 文件：

```
tsc file1.ts file2.ts file3.ts
```

tsc 常用编译参数如下表所示：

![image-20240609101734750](tyscript.assets/image-20240609101734750.png)

### 4-1 TypeScript 保留关键字

TypeScript 保留关键字如下表所示：

![image-20240609101812437](tyscript.assets/image-20240609101812437.png)

### 4-2 空白和换行

TypeScript 会忽略程序中出现的空格、制表符和换行符。

空格、制表符通常用来缩进代码，使代码易于阅读和理解。

### 4-3 TypeScript 区分大小写

TypeScript 区分大写和小写字符。

### 4-4 分号是可选的

每行指令都是一段语句，你可以使用分号或不使用， 分号在 TypeScript 中是可选的，建议使用。

以下代码都是合法的：

```
console.log("Runoob")
console.log("Google");
```

如果语句写在同一行则一定需要使用分号来分隔，否则会报错，如：

```
console.log("Runoob");console.log("Google");
```

### 4-5 TypeScript 注释

注释是一个良好的习惯，虽然很多程序员讨厌注释，但还是建议你在每段代码写上文字说明。

注释可以提高程序的可读性。

注释可以包含有关程序一些信息，如代码的作者，有关函数的说明等。

编译器会忽略注释。

### 4-6 TypeScript 支持两种类型的注释

- **单行注释 ( // )** − 在 // 后面的文字都是注释内容。
- **多行注释 (/\* \*/)** − 这种注释可以跨越多行。

注释实例：

```
// 这是一个单行注释
 
/* 
 这是一个多行注释 
 这是一个多行注释 
 这是一个多行注释 
*/
```

------

### 4-7 TypeScript 与面向对象

面向对象是一种对现实世界理解和抽象的方法。

TypeScript 是一种面向对象的编程语言。

面向对象主要有两个概念：对象和类。

- **对象**：对象是类的一个实例（**对象不是找个女朋友**），有状态和行为。例如，一条狗是一个对象，它的状态有：颜色、名字、品种；行为有：摇尾巴、叫、吃等。
- **类**：类是一个模板，它描述一类对象的行为和状态。
- **方法**：方法是类的操作的实现步骤。

下图中 **girl、boy** 为类，而具体的每个人为该类的对象：

![img](tyscript.assets/object-class.jpg)

TypeScript 面向对象编程实例：

```tsx
class Site { 
   name():void { 
      console.log("Runoob") 
   } 
} 
var obj = new Site(); 
obj.name();
```

以上实例定义了一个类 Site，该类有一个方法 name()，该方法在终端上输出字符串 Runoob。

new 关键字创建类的对象，该对象调用方法 name()。

编译后生成的 JavaScript 代码如下：

```tsx
var Site = /** @class */ (function () {
    function Site() {
    }
    Site.prototype.name = function () {
        console.log("Runoob");
    };
    return Site;
}());
var obj = new Site();
obj.name();
```

执行以上 JavaScript 代码，输出结果如下:

```
Runoob
```

## 1-5 TypeScript 基础类型

TypeScript 包含的数据类型如下表:

![image-20240609102054615](tyscript.assets/image-20240609102054615.png)

**注意：**TypeScript 和 JavaScript 没有整数类型。

在TypeScript中，提供了一下基本数据类型

- 布尔类型（boolean）
- 数据类型（number）
- 字符串类型（string）
- 数组类型（array）
- 元组类型（tuple）
- 枚举类型（enum）
- 任意值类型（any）
- null 和 undefined
- void 类型
- never 类型

其中元组、枚举、任意值、void类型和 never类型是TypeScript有别与JavaScript的特有类型。
在TypeScript中声明变量，需要加上类型声明，例如boolean和string等。通过静态类型约束，在编译时执行类型检查，可以避免一些类型混用的低级错误。

### 1-5-1 布尔类型

布尔类型是最简单的数据类型，只有true和false两种值。也就是说如果赋值为非boolean的其他类型值，编译时会抛出错误。

```ts
let flag: boolean = true;
flag = 1; // 报错
```

### 1-5-2 数据类型

在TyopeScript中，数字都是浮点型。TypeScript同时支持二进制、八进制、十进制和十六进制字面量，示例代码如下：

```ts
let binaryLiteral: number = 0b1010; // 二进制
let octalLiteral: number = 0o744;    // 八进制
let decLiteral: number = 6;    // 十进制
let hexLiteral: number = 0xf00d;    // 十六进制
```

### 1-5-3 字符串类型

TypeScript支持使用单引号（'）或双引号（"）来表示字符串类型。还支持使用模板字符串反引号（`）来定义多行文本和内嵌表达式。使用${ expr }的形式嵌入变量或表达式，在处理拼接字符串的时候很有用，示例如下：

```typescript
let name: string = "Angular";
let years: number = 5;
let words: string = `您好，今年是 ${ name } 发布 ${ years + 1} 周年`;
```

### 1-5-4 数组类型

TypeScript数组的操作类似与JavaScript中数组的操作，TypeScript有两种数组定义方式，示例代码如下：

```typescript
// 在元素类型后面加上[]
let arr: number[] = [1, 2];

// 或者使用数组泛型
let arr: Array<number> = [1, 2];
```

### 1-5-5 元组类型

元组类型用来表示已知元素数量和类型的数组，各元素的类型不必相同。下面定义了一组值分别为字符串和数字类型的元组，示例代码如下：

```typescript
let x: [string, number];
x = ['Angular', 25];    // 运行正常
x = [25, 'Angular'];    // 报错
console.log(x[0]);    // 输出 Angular
```

### 1-5-6 枚举类型

枚举是一个可被命名的**整型常数的集合**，枚举类型为集合成员赋予有意义的名称，增强可读性，示例代码如下：

```mathematica
enum Color {Red, Green, Blue};
let c: Color = Color.Blue;
console.log(c);    // 输出 2
```

枚举默认下标是0，可以手动修改默认下标值，示例代码如下：

```mathematica
enum Color {Red = 2, Blue, Green = 6};
let c: Color = Color.Blue;
console.log(c);    // 输出：3
```

### 1-5-7 任意值类型

任意值是 TypeScript 针对编程时类型不明确的变量使用的一种数据类型，它常用于一下三种情况。

- 变量的值会动态改变时，比如来自用户的输入，任意值类型可以让这些变量跳过编译阶段的类型检查，示例代码如下：

```ts
let x: any = 1;    // 数字类型
x = 'I am who I am';    // 字符串类型
x = false;    // 布尔类型
```

- 改写现有代码时，任意值允许在编译时可选择地包含或移除类型检查，示例代码如下：

```ts
let x: any = 4;
x.ifItExists();    // 正确，ifItExists方法在运行时可能存在，但这里并不会检查
x.toFixed();    // 正确
```

- 定义存储各种类型数据的数组时，示例代码如下：

```ts
let arrayList: any[] = [1, false, 'fine'];
arrayList[1] = 100;
```

### 1-5-8 null 和 undefined

默认情况下，null 和 undefined 是其它类型的子类型，可以赋值给其它类型，如数字类型，此时，赋值后的类型会变成 null 或 undefined。而在TypeScript中启用**严格的空校验（--strictNullChecks）**特性，就可以使得null 和 undefined 只能被赋值给 void 或本身对应的类型，示例代码如下：

```ts
// 启用 --strictNullChecks
let x: number;
x = 1; // 运行正确
x = undefined;    // 运行错误
x = null;    // 运行错误
```

上面的例子中变量 x 只能是数字类型。如果一个类型可能出行 null 或 undefined， 可以用 | 来支持多种类型，示例代码如下：

```typescript
// 启用 --strictNullChecks
let x: number | null | undefined;
x = 1; // 运行正确
x = undefined;    // 运行正确
x = null;    // 运行正确
```

### 1-5-9 void 类型

在 TypeScript 中，使用 void 表示没有任何类型。 例如一个函数没有返回值时，意味着返回值类型是 void，示例代码如下：

```scss
function hello(): void {
    alert("Hello Angular");
}
```

对于可忽略返回值的回调函数来说，使用 void 类型会比任意值类型更安全一些，示例代码如下：

```javascript
function func(foo:() => void) {
    let f = foo();    // 使用函数 foo 的返回值
    f.doSth();    // 报错， void 类型不存在 doSth() 方法， 此时换成任意值类型都不回报错
}
```

### 1-5-10 never 类型

never 是其它类型（包括 null 和 undefined）的子类型，代表从不会出现的值。这意味着声明为 never 类型的变量只能被 never 类型所赋值，在函数中它通常表现为抛出异常或无法执行到终止点（例如无线循环），示例代码如下：

```typescript
let x: never;
let y: number;

// 运行错误，数字类型不能转为 never 类型
x = 123;

// 运行正确，never 类型可以赋值给 never类型
x = (()=>{ throw new Error('exception')})();

// 运行正确，never 类型可以赋值给 数字类型
y = (()=>{ throw new Error('exception')})();

// 返回值为 never 的函数可以是抛出异常的情况
function error(message: string): never {
    throw new Error(message);
}

// 返回值为 never 的函数可以是无法被执行到的终止点的情况
function loop(): never {
    while (true) {}
}
```

## 1-6 TypeScript 变量声明

变量是一种使用方便的占位符，用于引用计算机内存地址。

我们可以把变量看做存储数据的容器。

### 1-6-1 TypeScript 变量的命名规则：

- 变量名称可以包含数字和字母。
- 除了下划线 **_** 和美元 **$** 符号外，不能包含其他特殊字符，包括空格。
- 变量名不能以数字开头。

变量使用前必须先声明，我们可以使用 var 来声明变量。

我们可以使用以下四种方式来声明变量：

声明变量的类型及初始值：

```ts
var [变量名] : [类型] = 值;
```

例如：

```ts
var uname:string = "Runoob";
```

声明变量的类型，但没有初始值，变量值会设置为 undefined：

```ts
var [变量名] : [类型];
```

例如：

```ts
var uname:string;
```

声明变量并初始值，但不设置类型，该变量可以是任意类型：

```ts
var [变量名] = 值;
```

例如：

```ts
var uname = "Runoob";
```

声明变量没有设置类型和初始值，类型可以是任意类型，默认初始值为 undefined：

```ts
var [变量名];
```

例如：

```ts
var uname;
```

实例

```tsx
var uname:string = "Runoob"; 
var score1:number = 50;
var score2:number = 42.50
var sum = score1 + score2 
console.log("名字: "+uname) 
console.log("第一个科目成绩: "+score1) 
console.log("第二个科目成绩: "+score2) 
console.log("总成绩: "+sum)
```

**注意：**变量不要使用 name 否则会与 DOM 中的全局 window 对象下的 name 属性出现了重名。

使用 tsc 命令编译以上代码，得到如下 JavaScript 代码：

```tsx
var uname = "Runoob";
var score1 = 50;
var score2 = 42.50;
var sum = score1 + score2;
console.log("名字: " + uname);
console.log("第一个科目成绩: " + score1);
console.log("第二个科目成绩: " + score2);
console.log("总成绩: " + sum);
```

执行该 JavaScript 代码输出结果为：

```tsx
名字: Runoob
第一个科目成绩: 50
第二个科目成绩: 42.5
总成绩: 92.5
```

TypeScript 遵循强类型，如果将不同的类型赋值给变量会编译错误，如下实例：

```ts
var num:number = "hello"     // 这个代码会编译错误
```

------

### 1-6-2 类型断言（Type Assertion）

类型断言可以用来手动指定一个值的类型，即允许变量从一种类型更改为另一种类型。

语法格式：

```tsx
<类型>值
```

或:

```tsx
值 as 类型
```

实例

```tsx
var str = '1' 
var str2:number = <number> <any> str   //str、str2 是 string 类型
console.log(str2)
```

**TypeScript 是怎么确定单个断言是否足够**

当 S 类型是 T 类型的子集，或者 T 类型是 S 类型的子集时，S 能被成功断言成 T。这是为了在进行类型断言时提供额外的安全性，完全毫无根据的断言是危险的，如果你想这么做，你可以使用 any。

它之所以不被称为**类型转换**，是因为转换通常意味着某种运行时的支持。但是，类型断言纯粹是一个编译时语法，同时，它也是一种为编译器提供关于如何分析代码的方法。

编译后，以上代码会生成如下 JavaScript 代码：

```ts
var str = '1';
var str2 = str;  //str、str2 是 string 类型
console.log(str2);
```

执行输出结果为：

```
1
```

------

### 1-6-2 类型推断

当类型没有给出时，TypeScript 编译器利用类型推断来推断类型。

如果由于缺乏声明而不能推断出类型，那么它的类型被视作默认的动态 any 类型。

```tsx
var num = 2;    // 类型推断为 number
console.log("num 变量的值为 "+num); 
num = "12";    // 编译错误
console.log(num);
```

- 第一行代码声明了变量 num 并=设置初始值为 2。 注意变量声明没有指定类型。因此，程序使用类型推断来确定变量的数据类型，第一次赋值为 2，**num** 设置为 number 类型。

- 第三行代码，当我们再次为变量设置字符串类型的值时，这时编译会错误。因为变量已经设置为了 number 类型。

  ```
  error TS2322: Type '"12"' is not assignable to type 'number'.
  ```

------

### 1-6-4 变量作用域

变量作用域指定了变量定义的位置。

程序中变量的可用性由变量作用域决定。

TypeScript 有以下几种作用域：

- **全局作用域** − 全局变量定义在程序结构的外部，它可以在你代码的任何位置使用。
- **类作用域** − 这个变量也可以称为 **字段**。类变量声明在一个类里头，但在类的方法外面。 该变量可以通过类的对象来访问。类变量也可以是静态的，静态的变量可以通过类名直接访问。
- **局部作用域** − 局部变量，局部变量只能在声明它的一个代码块（如：方法）中使用。

以下实例说明了三种作用域的使用：

```ts
var global_num = 12          // 全局变量
class Numbers { 
   num_val = 13;             // 实例变量
   static sval = 10;         // 静态变量
   
   storeNum():void { 
      var local_num = 14;    // 局部变量
   } 
} 
console.log("全局变量为: "+global_num)  
console.log(Numbers.sval)   // 静态变量
var obj = new Numbers(); 
console.log("实例变量: "+obj.num_val)
```

以上代码使用 tsc 命令编译为 JavaScript 代码为：

```tsx
var global_num = 12; // 全局变量
var Numbers = /** @class */ (function () {
    function Numbers() {
        this.num_val = 13; // 实例变量
    }
    Numbers.prototype.storeNum = function () {
        var local_num = 14; // 局部变量
    };
    Numbers.sval = 10; // 静态变量
    return Numbers;
}());
console.log("全局变量为: " + global_num);
console.log(Numbers.sval); // 静态变量
var obj = new Numbers();
console.log("实例变量: " + obj.num_val);
```

执行以上 JavaScript 代码，输出结果为：

```ts
全局变量为: 12
10
实例变量: 13
```

如果我们在方法外部调用局部变量 local_num，会报错：

```ts
error TS2322: Could not find symbol 'local_num'.
```

## 1-7 TypeScript 运算符

### 1-7-1 算术运算符

假定 **y=5**，下面的表格解释了这些算术运算符的操作：

![image-20240609103245520](tyscript.assets/image-20240609103245520.png)

```ts
var num1:number = 10 
var num2:number = 2
var res:number = 0
    
res = num1 + num2 
console.log("加:        "+res); 

res = num1 - num2; 
console.log("减: "+res) 

res = num1*num2 
console.log("乘:    "+res) 

res = num1/num2 
console.log("除:   "+res)
    
res = num1%num2 
console.log("余数:   "+res) 

num1++ 
console.log("num1 自增运算: "+num1) 

num2-- 
console.log("num2 自减运算: "+num2)
```

使用 **tsc** 命令编译以上代码得到如下 JavaScript 代码：

```tsx
var num1 = 10;
var num2 = 2;
var res = 0;
res = num1 + num2;
console.log("加:        " + res);
res = num1 - num2;
console.log("减: " + res);
res = num1 * num2;
console.log("乘:    " + res);
res = num1 / num2;
console.log("除:   " + res);
res = num1 % num2;
console.log("余数:   " + res);
num1++;
console.log("num1 自增运算: " + num1);
num2--;
console.log("num2 自减运算: " + num2);
```

执行以上 JavaScript 代码，输出结果为：

```ts
加:        12
减: 8
乘:    20
除:   5
余数:   0
num1 自增运算: 11
num2 自减运算: 1
```

------

### 1-7-2 关系运算符

关系运算符用于计算结果是否为 true 或者 false。

x=5，下面的表格解释了关系运算符的操作：

![image-20240609103347534](tyscript.assets/image-20240609103347534.png)

```ts
var num1:number = 5;
var num2:number = 9;
 
console.log("num1 的值为: "+num1); 
console.log("num2 的值为:"+num2);
 
var res = num1>num2 
console.log("num1 大于n num2: "+res)
 
res = num1<num2 
console.log("num1 小于 num2: "+res)  
 
res = num1>=num2 
console.log("num1 大于或等于  num2: "+res)
 
res = num1<=num2
console.log("num1 小于或等于 num2: "+res)  
 
res = num1==num2 
console.log("num1 等于 num2: "+res)  
 
res = num1!=num2  
console.log("num1 不等于 num2: "+res)
```

使用 **tsc** 命令编译以上代码得到如下 JavaScript 代码：

```tsx
var num1 = 5;
var num2 = 9;
console.log("num1 的值为: " + num1);
console.log("num2 的值为:" + num2);
var res = num1 > num2;
console.log("num1 大于n num2: " + res);
res = num1 < num2;
console.log("num1 小于 num2: " + res);
res = num1 >= num2;
console.log("num1 大于或等于  num2: " + res);
res = num1 <= num2;
console.log("num1 小于或等于 num2: " + res);
res = num1 == num2;
console.log("num1 等于 num2: " + res);
res = num1 != num2;
console.log("num1 不等于 num2: " + res);
```

执行以上 JavaScript 代码，输出结果为：

```
num1 的值为: 5
num2 的值为:9
num1 大于n num2: false
num1 小于 num2: true
num1 大于或等于  num2: false
num1 小于或等于 num2: true
num1 等于 num2: false
num1 不等于 num2: true
```

------

------

### 1-7-3 逻辑运算符

逻辑运算符用于测定变量或值之间的逻辑。

给定 x=6 以及 y=3，下表解释了逻辑运算符：

![image-20240609103446229](tyscript.assets/image-20240609103446229.png)

实例

```tsx
var avg:number = 20; 
var percentage:number = 90; 
 
console.log("avg 值为: "+avg+" ,percentage 值为: "+percentage);
    
var res:boolean = ((avg>50)&&(percentage>80)); 
console.log("(avg>50)&&(percentage>80): ",res);
 
var res:boolean = ((avg>50)||(percentage>80)); 
console.log("(avg>50)||(percentage>80): ",res);
 
var res:boolean=!((avg>50)&&(percentage>80)); 
console.log("!((avg>50)&&(percentage>80)): ",res);
```

使用 **tsc** 命令编译以上代码得到如下 JavaScript 代码：

```ts
var avg = 20;
var percentage = 90;
console.log("avg 值为: " + avg + " ,percentage 值为: " + percentage);
var res = ((avg > 50) && (percentage > 80));
console.log("(avg>50)&&(percentage>80): ", res);
var res = ((avg > 50) || (percentage > 80));
console.log("(avg>50)||(percentage>80): ", res);
var res = !((avg > 50) && (percentage > 80));
console.log("!((avg>50)&&(percentage>80)): ", res);
```

执行以上 JavaScript 代码，输出结果为：

```tsx
avg 值为: 20 ,percentage 值为: 90
(avg>50)&&(percentage>80):  false
(avg>50)||(percentage>80):  true
!((avg>50)&&(percentage>80)):  true
```

### 1-7-4 短路运算符(&& 与 ||)

&& 与 || 运算符可用于组合表达式。 && 运算符只有在左右两个表达式都为 true 时才返回 true。

考虑以下实例：

```tsx
var a = 10 
var result = ( a<10 && a>5)
```

以上实例中 a < 10 与 a > 5 是使用了 && 运算符的组合表达式，第一个表达式返回了 false，由于 && 运算需要两个表达式都为 true，所以如果第一个为 false，就不再执行后面的判断(a > 5 跳过计算)，直接返回 false。

|| 运算符只要其中一个表达式为 true ，则该组合表达式就会返回 true。

考虑以下实例：

```tsx
var a = 10 
var result = ( a>5 || a<10)
```

以上实例中 a > 5 与 a < 10 是使用了 || 运算符的组合表达式，第一个表达式返回了 true，由于 || 组合运算只需要一个表达式为 true，所以如果第一个为 true，就不再执行后面的判断(a < 10 跳过计算)，直接返回 true。

------

### 1-7-5 位运算符

位操作是程序设计中对位模式按位或二进制数的一元和二元操作。

![image-20240609103636084](tyscript.assets/image-20240609103636084.png)

```ts
var a:number = 2;   // 二进制 10 
var b:number = 3;   // 二进制 11
    
var result; 
        
result = (a & b);     
console.log("(a & b) => ",result)
            
result = (a | b);          
console.log("(a | b) => ",result)  
        
result = (a ^ b);  
console.log("(a ^ b) => ",result);
    
result = (~b); 
console.log("(~b) => ",result);
 
result = (a << b); 
console.log("(a << b) => ",result); 
 
result = (a >> b); 
console.log("(a >> b) => ",result);
 
result = (a >>> 1); 
console.log("(a >>> 1) => ",result);
```

使用 **tsc** 命令编译以上代码得到如下 JavaScript 代码：

```ts
var a = 2; // 二进制 10 
var b = 3; // 二进制 11
var result;
result = (a & b);
console.log("(a & b) => ", result);
result = (a | b);
console.log("(a | b) => ", result);
result = (a ^ b);
console.log("(a ^ b) => ", result);
result = (~b);
console.log("(~b) => ", result);
result = (a << b);
console.log("(a << b) => ", result);
result = (a >> b);
console.log("(a >> b) => ", result);
result = (a >>> 1);
console.log("(a >>> 1) => ", result);
```

执行以上 JavaScript 代码，输出结果为：

```
(a & b) =>  2
(a | b) =>  3
(a ^ b) =>  1
(~b) =>  -4
(a << b) =>  16
(a >> b) =>  0
(a >>> 1) =>  1
```

------

### 1-7-6 赋值运算符

赋值运算符用于给变量赋值。

给定 **x=10** 和 **y=5**，下面的表格解释了赋值运算符：

![image-20240609103740069](tyscript.assets/image-20240609103740069.png)

*类似的逻辑运算符也可以与赋值运算符联合使用：***<<=***,* **>>=***,* **>>>=***,* **&=***,* **|=** *与* **^=***。*

```tsx
var a: number = 12 
var b:number = 10  
 
a = b 
console.log("a = b: "+a)
 
a += b
console.log("a+=b: "+a)
 
a -= b 
console.log("a-=b: "+a)
 
a *= b 
console.log("a*=b: "+a)
 
a /= b 
console.log("a/=b: "+a)    
 
a %= b 
console.log("a%=b: "+a)
```

使用 **tsc** 命令编译以上代码得到如下 JavaScript 代码：

```ts
var a = 12;
var b = 10;
a = b;
console.log("a = b: " + a);
a += b;
console.log("a+=b: " + a);
a -= b;
console.log("a-=b: " + a);
a *= b;
console.log("a*=b: " + a);
a /= b;
console.log("a/=b: " + a);
a %= b;
console.log("a%=b: " + a);
```

执行以上 JavaScript 代码，输出结果为：

```ts
a = b: 10
a+=b: 20
a-=b: 10
a*=b: 100
a/=b: 10
a%=b: 0
```

### 1-7-7 三元运算符 (?)

三元运算有 3 个操作数，并且需要判断布尔表达式的值。该运算符的主要是决定哪个值应该赋值给变量。

```ts
Test ? expr1 : expr2
```

- Test − 指定的条件语句
- expr1 − 如果条件语句 Test 返回 true 则返回该值
- expr2 − 如果条件语句 Test 返回 false 则返回该值

让我们看下以下实例：

```tsx
var num:number = -2 
var result = num > 0 ? "大于 0" : "小于 0，或等于 0" 
console.log(result)
```

实例中用于判断变量是否大于 0。

使用 tsc 命令编译以上代码得到如下 JavaScript 代码：

```tsx
var num = -2;
var result = num > 0 ? "大于 0" : "小于 0，或等于 0";
console.log(result);
```

以上实例输出结果如下：

```tsx
小于 0，或等于 0
```

------

### 1-7-8 类型运算符

#### 8-1 typeof 运算符

typeof 是一元运算符，返回操作数的数据类型。

查看以下实例:

```ts
var num = 12 
console.log(typeof num);   //输出结果: number
```

使用 tsc 命令编译以上代码得到如下 JavaScript 代码：

```tsx
var num = 12;
console.log(typeof num); //输出结果: number
```

以上实例输出结果如下：

```
number
```

#### 8-2 instanceof

instanceof 运算符用于判断对象是否为指定的类型，后面章节我们会具体介绍它。

------

### 1-7-9 其他运算符

#### 9-1 负号运算符(-)

更改操作数的符号，查看以下实例：

```tsx
var x:number = 4 
var y = -x; 
console.log("x 值为: ",x);   // 输出结果 4 
console.log("y 值为: ",y);   // 输出结果 -4
```

使用 tsc 命令编译以上代码得到如下 JavaScript 代码：

```tsx
var x = 4;
var y = -x;
console.log("x 值为: ", x); // 输出结果 4 
console.log("y 值为: ", y); // 输出结果 -4
```

以上实例输出结果如下：

```
x 值为:  4
y 值为:  -4
```

#### 9-2 字符串运算符: 连接运算符 (+)

\+ 运算符可以拼接两个字符串，查看以下实例：

```ts
var msg:string = "RUNOOB"+".COM" 
console.log(msg)
```

使用 tsc 命令编译以上代码得到如下 JavaScript 代码：

```ts
var msg = "RUNOOB" + ".COM";
console.log(msg);
```

以上实例输出结果如下：

```
RUNOOB.COM
```

## 1-8 TypeScript 条件语句

### 1-8-1 条件语句

通常在写代码时，您总是需要为不同的决定来执行不同的动作。您可以在代码中使用条件语句来完成该任务。

在 TypeScript 中，我们可使用以下条件语句：

- **if 语句** - 只有当指定条件为 true 时，使用该语句来执行代码
- **if...else 语句** - 当条件为 true 时执行代码，当条件为 false 时执行其他代码
- **if...else if....else 语句**- 使用该语句来选择多个代码块之一来执行
- **switch 语句** - 使用该语句来选择多个代码块之一来执行

------

### 1-8-2 if 语句

TypeScript if 语句由一个布尔表达式后跟一个或多个语句组成。

**语法**

语法格式如下所示：

```ts
if(boolean_expression){
    # 在布尔表达式 boolean_expression 为 true 执行
}
```

如果布尔表达式 boolean_expression为 true，则 if 语句内的代码块将被执行。如果布尔表达式为 false，则 if 语句结束后的第一组代码（闭括号后）将被执行。

**流程图**

![Perl 中的 if 语句](tyscript.assets/if_statement.jpg)

**实例**

```ts
var  num:number = 5
if (num > 0) { 
   console.log("数字是正数") 
}
```

编译以上代码得到如下 JavaScript 代码：

```ts
var num = 5;
if (num > 0) {
    console.log("数字是正数");
}
```

执行以上 JavaScript 代码，输出结果为：

```
数字是正数
```

------

### 1-8-3 if...else 语句

一个 if 语句后可跟一个可选的 else 语句，else 语句在布尔表达式为 false 时执行。

**语法**

语法格式如下所示：

```
if(boolean_expression){
   # 在布尔表达式 boolean_expression 为 true 执行
}else{
   # 在布尔表达式 boolean_expression 为 false 执行
}
```

如果布尔表达式 boolean_expression 为 true，则执行 if 块内的代码。如果布尔表达式为 false，则执行 else 块内的代码。

**流程图**

![img](tyscript.assets/if_else_statement.jpg)

**实例**

```ts
var num:number = 12; 
if (num % 2==0) { 
    console.log("偶数"); 
} else {
    console.log("奇数"); 
}
```

编译以上代码得到如下 JavaScript 代码：

```js
var num = 12;
if (num % 2 == 0) {
    console.log("偶数");
}
else {
    console.log("奇数");
}
```

执行以上 JavaScript 代码，输出结果为：

```
偶数
```

------

### 1-8-4 if...else if....else 语句

if...else if....else 语句在执行多个判断条件的时候很有用。

**语法**

语法格式如下所示：

```tsx
if(boolean_expression 1) {
    # 在布尔表达式 boolean_expression 1 为 true 执行
} else if( boolean_expression 2) {
    # 在布尔表达式 boolean_expression 2 为 true 执行
} else if( boolean_expression 3) {
    # 在布尔表达式 boolean_expression 3 为 true 执行
} else {
    # 布尔表达式的条件都为 false 时执行
}
```

需要注意以下几点：

- 一个 **if** 判断语句可以有 0 或 1 个 **else** 语句，她必需在 **else..if** 语句后面。
- 一个 **if** 判断语句可以有 0 或多个 **else..if**，这些语句必需在 **else** 之前。
- 一旦执行了 **else..if** 内的代码，后面的 **else..if** 或 **else** 将不再执行。



**实例**

```tsx
var num:number = 2 
if(num > 0) { 
    console.log(num+" 是正数") 
} else if(num < 0) { 
    console.log(num+" 是负数") 
} else { 
    console.log(num+" 不是正数也不是负数") 
}
```

编译以上代码得到如下 JavaScript 代码：

```tsx
var num = 2;
if (num > 0) {
    console.log(num + " 是正数");
}
else if (num < 0) {
    console.log(num + " 是负数");
}
else {
    console.log(num + " 不是正数也不是负数");
}
```

执行以上 JavaScript 代码，输出结果为：

```
2 是正数
```

------

### 1-8-5 switch…case 语句

一个 **switch** 语句允许测试一个变量等于多个值时的情况。每个值称为一个 case，且被测试的变量会对每个 **switch case** 进行检查。

**switch** 语句的语法：

```tsx
switch(expression){
    case constant-expression  :
       statement(s);
       break; /* 可选的 */
    case constant-expression  :
       statement(s);
       break; /* 可选的 */
  
    /* 您可以有任意数量的 case 语句 */
    default : /* 可选的 */
       statement(s);
}
```

**switch** 语句必须遵循下面的规则：

- **switch** 语句中的 **expression** 是一个要被比较的表达式，可以是任何类型，包括基本数据类型（如 number、string、boolean）、对象类型（如 object、Array、Map）以及自定义类型（如 class、interface、enum）等。
- 在一个 switch 中可以有任意数量的 case 语句。每个 case 后跟一个要比较的值和一个冒号。
- case 的 **constant-expression** 必须与 switch 中的变量 expression 具有相同或兼容的数据类型。
- 当被测试的变量等于 case 中的常量时，case 后跟的语句将被执行，直到遇到 **break** 语句为止。
- 当遇到 **break** 语句时，switch 终止，控制流将跳转到 switch 语句后的下一行。
- 不是每一个 case 都需要包含 **break**。如果 case 语句不包含 **break**，控制流将会 *继续* 后续的 case，直到遇到 break 为止。
- 一个 **switch** 语句可以有一个可选的 **default** case，出现在 switch 的结尾。default 关键字则表示当表达式的值与所有 case 值都不匹配时执行的代码块。default case 中的 **break** 语句不是必需的。

**流程图**

![C 中的 switch 语句](tyscript.assets/switch_statement.jpg)

**实例**

```tsx
var grade:string = "A"; 
switch(grade) { 
    case "A": { 
        console.log("优"); 
        break; 
    } 
    case "B": { 
        console.log("良"); 
        break; 
    } 
    case "C": {
        console.log("及格"); 
        break;    
    } 
    case "D": { 
        console.log("不及格"); 
        break; 
    }  
    default: { 
        console.log("非法输入"); 
        break;              
    } 
}
```

编译以上代码得到如下 JavaScript 代码：

```tsx
var grade = "A";
switch (grade) {
    case "A": {
        console.log("优");
        break;
    }
    case "B": {
        console.log("良");
        break;
    }
    case "C": {
        console.log("及格");
        break;
    }
    case "D": {
        console.log("不及格");
        break;
    }
    default: {
        console.log("非法输入");
        break;
    }
}
```

执行以上 JavaScript 代码，输出结果为：

```
优
```

## 1-9 typeScript 循环

### 1-9-1 for 循环

TypeScript for 循环用于多次执行一个语句序列，简化管理循环变量的代码。

**语法**

语法格式如下所示：

```
for ( init; condition; increment ){
    statement(s);
}
```

下面是 for 循环的控制流程解析：

1. **init** 会首先被执行，且只会执行一次。这一步允许您声明并初始化任何循环控制变量。您也可以不在这里写任何语句，只要有一个分号出现即可。
2. 接下来，会判断 **condition**。如果为 true，则执行循环主体。如果为 false，则不执行循环主体，且控制流会跳转到紧接着 for 循环的下一条语句。
3. 在执行完 for 循环主体后，控制流会跳回上面的 **increment** 语句。该语句允许您更新循环控制变量。该语句可以留空，只要在条件后有一个分号出现即可。
4. 条件再次被判断。如果为 true，则执行循环，这个过程会不断重复（循环主体，然后增加步值，再然后重新判断条件）。在条件变为 false 时，for 循环终止。

在这里，statement(s) 可以是一个单独的语句，也可以是几个语句组成的代码块。

condition 可以是任意的表达式，当条件为 true 时执行循环，当条件为 false 时，退出循环。

**流程图**

![Perl 中的 for 循环](tyscript.assets/cpp_for_loop.png)

**实例**

以下实例计算 5 的阶乘， for 循环生成从 5 到 1 的数字，并计算每次循环数字的乘积。

```tsx
var num:number = 5; 
var i:number; 
var factorial = 1; 
 
for(i = num;i>=1;i--) {
   factorial *= i;
}
console.log(factorial)
```

编译以上代码得到如下 JavaScript 代码：

```js
var num = 5;
var i;
var factorial = 1;
for (i = num; i >= 1; i--) {
    factorial *= i;
}
console.log(factorial);
```

执行以上 JavaScript 代码，输出结果为：

```
120
```

------

### 1-9-2 for...in 循环

for...in 语句用于一组值的集合或列表进行迭代输出。

**语法**

语法格式如下所示：

```
for (var val in list) { 
    //语句 
}
```

val 需要为 string 或 any 类型。

**实例**

```tsx
var j:any; 
var n:any = "a b c" 
 
for(j in n) {
    console.log(n[j])  
}
```

编译以上代码得到如下 JavaScript 代码：

```tsx
var j;
var n = "a b c";
for (j in n) {
    console.log(n[j]);
}
```

执行以上 JavaScript 代码，输出结果为：

```
a

b

c
```



### 1-9-3 for…of 、forEach、every 和 some 循环

此外，TypeScript 还支持 for…of 、forEach、every 和 some 循环。

for...of 语句创建一个循环来迭代可迭代的对象。在 ES6 中引入的 for...of 循环，以替代 for...in 和 forEach() ，并支持新的迭代协议。for...of 允许你遍历 Arrays（数组）, Strings（字符串）, Maps（映射）, Sets（集合）等可迭代的数据结构等。

#### 3-1 for...of 

```tsx
let someArray = [1, "string", false];
 
for (let entry of someArray) {
    console.log(entry); // 1, "string", false
}
```

forEach、every 和 some 是 JavaScript 的循环语法，TypeScript 作为 JavaScript 的语法超集，当然默认也是支持的。

因为 forEach 在 iteration 中是无法返回的，所以可以使用 every 和 some 来取代 forEach。

#### 3-2 forEach

```ts
let list = [4, 5, 6];
list.forEach((val, idx, array) => {
    // val: 当前值
    // idx：当前index
    // array: Array
});
```

#### 3-3 every

```ts
let list = [4, 5, 6];
list.every((val, idx, array) => {
    // val: 当前值
    // idx：当前index
    // array: Array
    return true; // Continues
    // Return false will quit the iteration
});
```

### 1-9-4 while 循环

while 语句在给定条件为 true 时，重复执行语句或语句组。循环主体执行之前会先测试条件。

**语法**

语法格式如下所示：

```
while(condition)
{
   statement(s);
}
```

在这里，statement(s) 可以是一个单独的语句，也可以是几个语句组成的代码块。

condition 可以是任意的表达式，当条件为 true 时执行循环。 当条件为 false 时，程序流将退出循环。

**流程图**

![img](tyscript.assets/cpp_while_loop.png)

图表中，*while* 循环的关键点是循环可能一次都不会执行。当条件为 false 时，会跳过循环主体，直接执行紧接着 while 循环的下一条语句。

**实例**

```ts
var num:number = 5; 
var factorial:number = 1; 
 
while(num >=1) { 
    factorial = factorial * num; 
    num--; 
} 
console.log("5 的阶乘为："+factorial);
```

编译以上代码得到如下 JavaScript 代码：

```js
var num = 5;
var factorial = 1;
while (num >= 1) {
    factorial = factorial * num;
    num--;
}
console.log("5 的阶乘为：" + factorial);
```

执行以上 JavaScript 代码，输出结果为：

```
5 的阶乘为：120
```

------

### 1-9-5 do...while 循环

不像 **for** 和 **while** 循环，它们是在循环头部测试循环条件。**do...while** 循环是在循环的尾部检查它的条件。

**语法**

语法格式如下所示：

```
do
{
   statement(s);
}while( condition );
```

请注意，条件表达式出现在循环的尾部，所以循环中的 statement(s) 会在条件被测试之前至少执行一次。

如果条件为 true，控制流会跳转回上面的 do，然后重新执行循环中的 statement(s)。这个过程会不断重复，直到给定条件变为 false 为止。

**流程图**

![Perl 中的 do...while 循环](tyscript.assets/cpp_do_while_loop.jpg)

实例

```tsx
var n:number = 10;
do { 
    console.log(n); 
    n--; 
} while(n>=0);
```

编译以上代码得到如下 JavaScript 代码：

```js
var num = 5;
var n = 10;
do {
    console.log(n);
    n--;
} while (n >= 0);
```

执行以上 JavaScript 代码，输出结果为：

```
10
9
8
7
6
5
4
3
2
1
0
```

------

### 1-9-6 break 语句

**break** 语句有以下两种用法：

1. 当 **break** 语句出现在一个循环内时，循环会立即终止，且程序流将继续执行紧接着循环的下一条语句。
2. 它可用于终止 **switch** 语句中的一个 case。

如果您使用的是嵌套循环（即一个循环内嵌套另一个循环），break 语句会停止执行最内层的循环，然后开始执行该块之后的下一行代码。

**语法**

语法格式如下所示：

```
break;
```

**流程图**

![img](tyscript.assets/cpp_break_statement.jpg)

**实例**

```tsx
var i:number = 1 
while(i<=10) { 
    if (i % 5 == 0) {   
        console.log ("在 1~10 之间第一个被 5 整除的数为 : "+i) 
        break     // 找到一个后退出循环
    } 
    i++ 
}  // 输出 5 然后程序执行结束
```

编译以上代码得到如下 JavaScript 代码：

```tsx
var i = 1;
while (i <= 10) {
    if (i % 5 == 0) {
        console.log("在 1~10 之间第一个被 5 整除的数为 : " + i);
        break; // 找到一个后退出循环
    }
    i++;
} // 输出 5 然后程序执行结束
```

执行以上 JavaScript 代码，输出结果为：

```
在 1~10 之间第一个被 5 整除的数为 : 5
```

------

### 1-9-7 continue 语句

**continue** 语句有点像 **break** 语句。但它不是强制终止，continue 会跳过当前循环中的代码，强迫开始下一次循环。

对于 **for** 循环，**continue** 语句执行后自增语句仍然会执行。对于 **while** 和 **do...while** 循环，**continue** 语句重新执行条件判断语句。

**语法**

语法格式如下所示：

```
continue;
```

**流程图**

![C continue 语句](tyscript.assets/cpp_continue_statement.jpg)

**实例**

```tsx
var num:number = 0
var count:number = 0;
 
for(num=0;num<=20;num++) {
    if (num % 2==0) {
        continue
    }
    count++
}
console.log ("0 ~20 之间的奇数个数为: "+count)    //输出10个偶数
```

编译以上代码得到如下 JavaScript 代码：

```tsx
var num = 0;
var count = 0;
for (num = 0; num <= 20; num++) {
    if (num % 2 == 0) {
        continue;
    }
    count++;
}
console.log("0 ~20 之间的奇数个数为: " + count); //输出 10
```

执行以上 JavaScript 代码，输出结果为：

```
0 ~20 之间的奇数个数为: 10
```

------

### 1-9-8 无限循环

无限循环就是一直在运行不会停止的循环。 for 和 while 循环都可以创建无限循环。

for 创建无限循环语法格式：

```
for(;;) { 
   // 语句
}
```

实例

```
for(;;) { 
   console.log("这段代码会不停的执行") 
}
```

while 创建无限循环语法格式：

```
while(true) { 
   // 语句
} 
```

实例

```
while(true) { 
   console.log("这段代码会不停的执行") 
}
```

## 1-10 TypeScript 函数

### 1-10-1 函数定义

函数就是包裹在花括号中的代码块，前面使用了关键词 function：

语法格式如下所示：

```
function function_name()
{
    // 执行代码
}
```

**实例**

```tsx
function () {   
    // 函数定义
    console.log("调用函数") 
}
```

### 1-10-2 调用函数

函数只有通过调用才可以执行函数内的代码。

语法格式如下所示：

```
function_name()
```

**实例**

```tsx
function test() {   // 函数定义
    console.log("调用函数") 
} 
test()              // 调用函数
```

### 1-10-3 函数返回值

有时，我们会希望函数将执行的结果返回到调用它的地方。

通过使用 return 语句就可以实现。

在使用 return 语句时，函数会停止执行，并返回指定的值。

语法格式如下所示：

```
function function_name():return_type { 
    // 语句
    return value; 
}
```

- return_type 是返回值的类型。
- return 关键词后跟着要返回的结果。
- 一般情况下，一个函数只有一个 return 语句。
- 返回值的类型需要与函数定义的返回类型(return_type)一致。

**实例**

```tsx
// 函数定义
function greet():string { // 返回一个字符串
    return "Hello World" 
} 
 
function caller() { 
    var msg = greet() // 调用 greet() 函数 
    console.log(msg) 
} 
 
// 调用函数
caller()
```

- 实例中定义了函数 *greet()*，返回值的类型为 string。
- *greet()* 函数通过 return 语句返回给调用它的地方，即变量 msg，之后输出该返回值。。

编译以上代码，得到以下 JavaScript 代码：

```js
// 函数定义
function greet() {
    return "Hello World";
}
function caller() {
    var msg = greet(); // 调用 greet() 函数 
    console.log(msg);
}
// 调用函数
caller();
```

### 1-10-4 带参数函数

在调用函数时，您可以向其传递值，这些值被称为参数。

这些参数可以在函数中使用。

您可以向函数发送多个参数，每个参数使用逗号 **,** 分隔：

语法格式如下所示：

```
function func_name( param1 [:datatype], param2 [:datatype]) {   
}
```

- param1、param2 为参数名。
- datatype 为参数类型。

**实例**

```tsx
function add(x: number, y: number): number {
    return x + y;
}
console.log(add(1,2))
```

- 实例中定义了函数 *add()*，返回值的类型为 number。
- *add()* 函数中定义了两个 number 类型的参数，函数内将两个参数相加并返回。

编译以上代码，得到以下 JavaScript 代码：

```tsx
function add(x, y) {
    return x + y;
}
console.log(add(1, 2));
```

输出结果为：

```
3
```

------

### 1-10-5 可选参数和默认参数

#### 5-1 可选参数

在 TypeScript 函数里，如果我们定义了参数，则我们必须传入这些参数，除非将这些参数设置为可选，可选参数使用问号标识 ？。

**实例**

```tsx
function buildName(firstName: string, lastName: string) {
    return firstName + " " + lastName;
}
 
let result1 = buildName("Bob");                  // 错误，缺少参数
let result2 = buildName("Bob", "Adams", "Sr.");  // 错误，参数太多了
let result3 = buildName("Bob", "Adams");         // 正确
```

以下实例，我们将 lastName 设置为可选参数：

```tsx
function buildName(firstName: string, lastName?: string) {
    if (lastName)
        return firstName + " " + lastName;
    else
        return firstName;
}
 
let result1 = buildName("Bob");  // 正确
let result2 = buildName("Bob", "Adams", "Sr.");  // 错误，参数太多了
let result3 = buildName("Bob", "Adams");  // 正确
```

可选参数必须跟在必需参数后面。 如果上例我们想让 firstName 是可选的，lastName 必选，那么就要调整它们的位置，把 firstName 放在后面。

如果都是可选参数就没关系。

#### 5-3 默认参数

我们也可以设置参数的默认值，这样在调用函数的时候，如果不传入该参数的值，则使用默认参数，语法格式为：

```
function function_name(param1[:type],param2[:type] = default_value) { 
}
```

注意：参数不能同时设置为可选和默认。

**实例**

以下实例函数的参数 rate 设置了默认值为 0.50，调用该函数时如果未传入参数则使用该默认值：

```tsx
function calculate_discount(price:number,rate:number = 0.50) { 
    var discount = price * rate; 
    console.log("计算结果: ",discount); 
} 
calculate_discount(1000) 
calculate_discount(1000,0.30)
```

编译以上代码，得到以下 JavaScript 代码：

```tsx
function calculate_discount(price, rate) {
    if (rate === void 0) { rate = 0.50; }
    var discount = price * rate;
    console.log("计算结果: ", discount);
}
calculate_discount(1000);
calculate_discount(1000, 0.30);
```

输出结果为：

```
计算结果:  500
计算结果:  300
```

------

#### 5-3  剩余参数

有一种情况，我们不知道要向函数传入多少个参数，这时候我们就可以使用剩余参数来定义。

剩余参数语法允许我们将一个不确定数量的参数作为一个数组传入。

```tsx
function buildName(firstName: string, ...restOfName: string[]) {
    return firstName + " " + restOfName.join(" ");
}
  
let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
```

函数的最后一个命名参数 restOfName 以 ... 为前缀，它将成为一个由剩余参数组成的数组，索引值从0（包括）到 restOfName.length（不包括）。

```tsx
function addNumbers(...nums:number[]) {  
    var i;   
    var sum:number = 0; 
    
    for(i = 0;i<nums.length;i++) { 
       sum = sum + nums[i]; 
    } 
    console.log("和为：",sum) 
 } 
 addNumbers(1,2,3) 
 addNumbers(10,10,10,10,10)
```

编译以上代码，得到以下 JavaScript 代码：

```tsx
function addNumbers() {
    var nums = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        nums[_i] = arguments[_i];
    }
    var i;
    var sum = 0;
    for (i = 0; i < nums.length; i++) {
        sum = sum + nums[i];
    }
    console.log("和为：", sum);
}
addNumbers(1, 2, 3);
addNumbers(10, 10, 10, 10, 10);
```

输出结果为：

```
和为： 6
和为： 50
```

------

### 1-10-6 匿名函数

匿名函数是一个没有函数名的函数。

匿名函数在程序运行时动态声明，除了没有函数名外，其他的与标准函数一样。

我们可以将匿名函数赋值给一个变量，这种表达式就成为函数表达式。

语法格式如下：

```
var res = function( [arguments] ) { ... }
```

**实例**

#### 6-1 不带参数匿名函数：

```tsx
var msg = function() { 
    return "hello world";  
} 
console.log(msg())
```

编译以上代码，得到以下 JavaScript 代码：

```js
var msg = function () {
    return "hello world";
};
console.log(msg());
```

输出结果为：

```
hello world
```

#### 6-2 带参数匿名函数：

```tsx
var res = function(a:number,b:number) { 
    return a*b;  
}; 
console.log(res(12,2))
```

编译以上代码，得到以下 JavaScript 代码：

```tsx
var res = function (a, b) {
    return a * b;
};
console.log(res(12, 2));
```

输出结果为：

```
24
```

### 1-10-7 匿名函数自调用

匿名函数自调用在函数后使用 () 即可：

```tsx
(function () { 
    var x = "Hello!!";   
    console.log(x)     
 })()
```

编译以上代码，得到以下 JavaScript 代码：

```tsx
(function () { 
    var x = "Hello!!";   
    console.log(x)    
})()
```

输出结果为：

```
Hello!!
```

### 1-10-8 构造函数

TypeScript 也支持使用 JavaScript 内置的构造函数 Function() 来定义函数：

语法格式如下：

```
var res = new Function ([arg1[, arg2[, ...argN]],] functionBody)
```

参数说明：

- **arg1, arg2, ... argN**：参数列表。
- **functionBody**：一个含有包括函数定义的 JavaScript 语句的字符串。

**实例**

```tsx
var myFunction = new Function("a", "b", "return a * b"); 
var x = myFunction(4, 3); 
console.log(x);
```

编译以上代码，得到以下 JavaScript 代码：

```tsx
var myFunction = new Function("a", "b", "return a * b"); 
var x = myFunction(4, 3); 
console.log(x);
```

输出结果为：

```
12
```

------

### 1-10-9 递归函数

递归函数即在函数内调用函数本身。

> 举个例子：
> 从前有座山，山里有座庙，庙里有个老和尚，正在给小和尚讲故事呢！故事是什么呢？"从前有座山，山里有座庙，庙里有个老和尚，正在给小和尚讲故事呢！故事是什么呢？'从前有座山，山里有座庙，庙里有个老和尚，正在给小和尚讲故事呢！故事是什么呢？……'"

**实例**

```tsx
function factorial(number) {
    if (number <= 0) {         // 停止执行
        return 1; 
    } else {     
        return (number * factorial(number - 1));     // 调用自身
    } 
}; 
console.log(factorial(6));      // 输出 720
```

编译以上代码，得到以下 JavaScript 代码：

```tsx
function factorial(number) {
    if (number <= 0) { // 停止执行
        return 1;
    }
    else {
        return (number * factorial(number - 1)); // 调用自身
    }
}
;
console.log(factorial(6)); // 输出 720
```

输出结果为：

```
720
```

------

### 1-10-10 Lambda 函数

Lambda 函数也称之为箭头函数。

箭头函数表达式的语法比函数表达式更短。

函数只有一行语句：

```
( [param1, param2,…param n] )=>statement;
```

**实例**

以下实例声明了 lambda 表达式函数，函数返回两个数的和：

```tsx
var foo = (x:number)=>10 + x 
console.log(foo(100))      //输出结果为 110
```

编译以上代码，得到以下 JavaScript 代码：

```tsx
var foo = function (x) { return 10 + x; };
console.log(foo(100)); //输出结果为 110
```

输出结果为：

```
110
```

函数是一个语句块：

```
( [param1, param2,…param n] )=> {
 
    // 代码块
}
```

**实例**

以下实例声明了 lambda 表达式函数，函数返回两个数的和：

```tsx
var foo = (x:number)=> {    
    x = 10 + x 
    console.log(x)  
} 
foo(100)
```

编译以上代码，得到以下 JavaScript 代码：

```js
var foo = function (x) {
    x = 10 + x;
    console.log(x);
};
foo(100);
```

输出结果为：

```
110
```

我们可以不指定函数的参数类型，通过函数内来推断参数类型:

```tsx
var func = (x)=> { 
    if(typeof x=="number") { 
        console.log(x+" 是一个数字") 
    } else if(typeof x=="string") { 
        console.log(x+" 是一个字符串") 
    }  
} 
func(12) 
func("Tom")
```

编译以上代码，得到以下 JavaScript 代码：

```js
var func = function (x) {
    if (typeof x == "number") {
        console.log(x + " 是一个数字");
    }
    else if (typeof x == "string") {
        console.log(x + " 是一个字符串");
    }
};
func(12);
func("Tom");
```

输出结果为：

```
12 是一个数字
Tom 是一个字符串
```

单个参数 **()** 是可选的：

```tsx
var display = x => { 
    console.log("输出为 "+x) 
} 
display(12)
```

编译以上代码，得到以下 JavaScript 代码：

```js
var display = function (x) {
    console.log("输出为 " + x);
};
display(12);
```

输出结果为：

```
输出为 12
```

无参数时可以设置空括号：

```tsx
var disp =()=> { 
    console.log("Function invoked"); 
} 
disp();
```

编译以上代码，得到以下 JavaScript 代码：

```tsx
var disp = function () {
    console.log("调用函数");
};
disp();
```

输出结果为：

```
调用函数
```

------

### 1-10-11 函数重载

重载是方法名字相同，而参数不同，返回类型可以相同也可以不同。

每个重载的方法（或者构造函数）都必须有一个独一无二的参数类型列表。

参数类型不同：

```ts
function disp(string):void; 
function disp(number):void;
```

参数数量不同：

```ts
function disp(n1:number):void; 
function disp(x:number,y:number):void;
```

参数类型顺序不同：

```tsx
function disp(n1:number,s1:string):void; 
function disp(s:string,n:number):void;
```

如果参数类型不同，则参数类型应设置为 **any**。

参数数量不同你可以将不同的参数设置为可选。

**实例**

以下实例定义了参数类型与参数数量不同：

```tsx
function disp(s1:string):void; 
function disp(n1:number,s1:string):void; 
 
function disp(x:any,y?:any):void { 
    console.log(x); 
    console.log(y); 
} 
disp("abc") 
disp(1,"xyz");
```

编译以上代码，得到以下 JavaScript 代码：

```tsx
function disp(x, y) {
    console.log(x);
    console.log(y);
}
disp("abc");
disp(1, "xyz");
```

输出结果为：

```
abc
undefined
1
xyz
```

## 1-11 TypeScript Number

TypeScript 与 JavaScript 类似，支持 Number 对象。

Number 对象是原始数值的包装对象。

**语法**

```
var num = new Number(value);
```

**注意：** 如果一个参数值不能转换为一个数字将返回 NaN (非数字值)。

### 1-11-1 Number 对象属性

下表列出了 Number 对象支持的属性：

![image-20240609111454935](tyscript.assets/image-20240609111454935.png)

```tsx
console.log("TypeScript Number 属性: "); 
console.log("最大值为: " + Number.MAX_VALUE); 
console.log("最小值为: " + Number.MIN_VALUE); 
console.log("负无穷大: " + Number.NEGATIVE_INFINITY); 
console.log("正无穷大:" + Number.POSITIVE_INFINITY);
```

编译以上代码，得到以下 JavaScript 代码：

```tsx
console.log("TypeScript Number 属性: ");
console.log("最大值为: " + Number.MAX_VALUE);
console.log("最小值为: " + Number.MIN_VALUE);
console.log("负无穷大: " + Number.NEGATIVE_INFINITY);
console.log("正无穷大:" + Number.POSITIVE_INFINITY);
```

输出结果为：

```
TypeScript Number 属性:
最大值为: 1.7976931348623157e+308
最小值为: 5e-324
负无穷大: -Infinity
正无穷大:Infinity
```

### 1-11-2 NaN 实例

```tsx
var month = 0 
if( month<=0 || month >12) { 
    month = Number.NaN 
    console.log("月份是："+ month) 
} else { 
    console.log("输入月份数值正确。") 
}
```

编译以上代码，得到以下 JavaScript 代码：

```js
var month = 0;
if (month <= 0 || month > 12) {
    month = Number.NaN;
    console.log("月份是：" + month);
}
else {
    console.log("输入月份数值正确。");
}
```

输出结果为：

```
月份是：NaN
```

### 1-11-3 prototype 实例

```tsx
function employee(id:number,name:string) { 
    this.id = id 
    this.name = name 
} 
 
var emp = new employee(123,"admin") 
employee.prototype.email = "admin@runoob.com" 
 
console.log("员工号: "+emp.id) 
console.log("员工姓名: "+emp.name) 
console.log("员工邮箱: "+emp.email)
```

编译以上代码，得到以下 JavaScript 代码：

```tsx
function employee(id, name) {
    this.id = id;
    this.name = name;
}
var emp = new employee(123, "admin");
employee.prototype.email = "admin@runoob.com";
console.log("员工号: " + emp.id);
console.log("员工姓名: " + emp.name);
console.log("员工邮箱: " + emp.email);
```

输出结果为：

```
员工号: 123
员工姓名: admin
员工邮箱: admin@runoob.com
```

------

### 1-11-4 Number 对象方法

Number对象 支持以下方法：

![image-20240609111918366](tyscript.assets/image-20240609111918366.png)

## 1-12 TypeScript String（字符串）

String 对象用于处理文本（字符串）。

**语法**

```
var txt = new String("string");
或者更简单方式：
var txt = "string";
```

### 1-12-1 String 对象属性

下表列出了 String 对象支持的属性：

![image-20240609112038967](tyscript.assets/image-20240609112038967.png)

### 1-12-2 String 方法

下表列出了 String 对象支持的方法：

![image-20240609112204879](tyscript.assets/image-20240609112204879.png)

## 1-13 typeScript Array(数组)

数组对象是使用单独的变量名来存储一系列的值。

数组非常常用。

假如你有一组数据（例如：网站名字），存在单独变量如下所示：

```tsx
var site1="Google";
var site2="Runoob";
var site3="Taobao";
```

如果有 10 个、100 个这种方式就变的很不实用，这时我们可以使用数组来解决：

```tsx
var sites:string[]; 
sites = ["Google","Runoob","Taobao"]
```

这样看起来就简洁多了。

TypeScript 声明数组的语法格式如下所示：

```
var array_name[:datatype];        //声明 
array_name = [val1,val2,valn..]   //初始化
```

或者直接在声明时初始化：

```
var array_name[:datatype] = [val1,val2…valn]
```

如果数组声明时未设置类型，则会被认为是 any 类型，在初始化时根据第一个元素的类型来推断数组的类型。

**实例**

创建一个 number 类型的数组：

```
var numlist:number[] = [2,4,6,8]
```

整个数组结构如下所示：

![img](tyscript.assets/declaring_and_initializing_arrays.png)

索引值第一个为 0，我们可以根据索引值来访问数组元素：

```tsx
var sites:string[]; 
sites = ["Google","Runoob","Taobao"] 
console.log(sites[0]); 
console.log(sites[1]);
```

编译以上代码，得到以下 JavaScript 代码：

```tsx
var sites;
sites = ["Google", "Runoob", "Taobao"];
console.log(sites[0]);
console.log(sites[1]);
```

输出结果为：

```
Google
Runoob
```

以下实例我们在声明时直接初始化：

```tsx
var nums:number[] = [1,2,3,4] 
console.log(nums[0]); 
console.log(nums[1]); 
console.log(nums[2]); 
console.log(nums[3]);
```

编译以上代码，得到以下 JavaScript 代码：

```tsx
var nums = [1, 2, 3, 4];
console.log(nums[0]);
console.log(nums[1]);
console.log(nums[2]);
console.log(nums[3]);
```

输出结果为：

```
1 
2 
3 
4 
```

------

### 1-13-1 Array 对象

我们也可以使用 Array 对象创建数组。

Array 对象的构造函数接受以下两种值：

- 表示数组大小的数值。
- 初始化的数组列表，元素使用逗号分隔值。

**实例**

指定数组初始化大小：

```tsx
var arr_names:number[] = new Array(4)  
 
for(var i = 0; i<arr_names.length; i++) { 
        arr_names[i] = i * 2 
        console.log(arr_names[i]) 
}
```

编译以上代码，得到以下 JavaScript 代码：

```js
var arr_names = new Array(4);
for (var i = 0; i < arr_names.length; i++) {
        arr_names[i] = i * 2;
        console.log(arr_names[i]);
}
```

输出结果为：

```
0
2
4
6
```

以下实例我们直接初始化数组元素：

```tsx
var sites:string[] = new Array("Google","Runoob","Taobao","Facebook") 
 
for(var i = 0;i<sites.length;i++) { 
        console.log(sites[i]) 
}
```

编译以上代码，得到以下 JavaScript 代码：

```js
var sites = new Array("Google", "Runoob", "Taobao", "Facebook");
for (var i = 0; i < sites.length; i++) {
        console.log(sites[i]);
}
```

输出结果为：

```
Google
Runoob
Taobao
Facebook
```

------

### 1-13-2 数组解构

我们也可以把数组元素赋值给变量，如下所示：

```tsx
var arr:number[] = [12,13] 
var[x,y] = arr // 将数组的两个元素赋值给变量 x 和 y
console.log(x) 
console.log(y)
```

编译以上代码，得到以下 JavaScript 代码：

```tsx
var arr = [12, 13];
var x = arr[0], y = arr[1]; // 将数组的两个元素赋值给变量 x 和 y
console.log(x);
console.log(y);
```

输出结果为：

```
12
13
```

------

### 1-13-3 数组迭代

我们可以使用 for 语句来循环输出数组的各个元素：

```tsx
var j:any; 
var nums:number[] = [1001,1002,1003,1004] 
 
for(j in nums) { 
    console.log(nums[j]) 
}
```

编译以上代码，得到以下 JavaScript 代码：

```js
var j;
var nums = [1001, 1002, 1003, 1004];
for (j in nums) {
    console.log(nums[j]);
}
```

输出结果为：

```
1001
1002
1003
1004
```

------

### 1-13-4 多维数组

一个数组的元素可以是另外一个数组，这样就构成了多维数组（Multi-dimensional Array）。

最简单的多维数组是二维数组，定义方式如下：

```
var arr_name:datatype[][]=[ [val1,val2,val3],[v1,v2,v3] ]
```

**实例**

定义一个二维数组，每一个维度的数组有三个元素。

![img](tyscript.assets/multidimensional_arrays.png)

```tsx
var multi:number[][] = [[1,2,3],[23,24,25]]  
console.log(multi[0][0]) 
console.log(multi[0][1]) 
console.log(multi[0][2]) 
console.log(multi[1][0]) 
console.log(multi[1][1]) 
console.log(multi[1][2])
```

编译以上代码，得到以下 JavaScript 代码：

```tsx
var multi = [[1, 2, 3], [23, 24, 25]];
console.log(multi[0][0]);
console.log(multi[0][1]);
console.log(multi[0][2]);
console.log(multi[1][0]);
console.log(multi[1][1]);
console.log(multi[1][2]);
```

输出结果为：

```
1
2
3
23
24
25
```

------

### 1-13-5 数组在函数中的使用

#### 5-1 作为参数传递给函数

```tsx
var sites:string[] = new Array("Google","Runoob","Taobao","Facebook") 
 
function disp(arr_sites:string[]) {
        for(var i = 0;i<arr_sites.length;i++) { 
                console.log(arr_sites[i]) 
        }  
}  
disp(sites);
```

编译以上代码，得到以下 JavaScript 代码：

```js
var sites = new Array("Google", "Runoob", "Taobao", "Facebook");
function disp(arr_sites) {
        for (var i = 0; i < arr_sites.length; i++) {
                console.log(arr_sites[i]);
        }
}
disp(sites);
```

输出结果为：

```
Google
Runoob
Taobao
Facebook
```

#### 5-2 作为函数的返回值

```tsx
function disp():string[] { 
        return new Array("Google", "Runoob", "Taobao", "Facebook");
} 
 
var sites:string[] = disp() 
for(var i in sites) { 
        console.log(sites[i]) 
}
```

编译以上代码，得到以下 JavaScript 代码：

```ts
function disp() {
        return new Array("Google", "Runoob", "Taobao", "Facebook");
}
var sites = disp();
for (var i in sites) {
        console.log(sites[i]);
}
```

输出结果为：

```
Google
Runoob
Taobao
Facebook
```

------

### 1-13-6 数组方法

下表列出了一些常用的数组方法：

![image-20240609113220094](tyscript.assets/image-20240609113220094.png)

## 1-14 TypeScript Map 对象

Map 对象保存键值对，并且能够记住键的原始插入顺序。

任何值(对象或者原始值) 都可以作为一个键或一个值。

Map 是 ES6 中引入的一种新的数据结构，可以参考 [ES6 Map 与 Set](https://www.runoob.com/w3cnote/es6-map-set.html)。

------

### 1-14-1 创建 Map

TypeScript 使用 Map 类型和 new 关键字来创建 Map：

```
let myMap = new Map();
```

初始化 Map，可以以数组的格式来传入键值对：

```
let myMap = new Map([
        ["key1", "value1"],
        ["key2", "value2"]
    ]); 
```

Map 相关的函数与属性：

- **map.clear()** – 移除 Map 对象的所有键/值对 。
- **map.set()** – 设置键值对，返回该 Map 对象。
- **map.get()** – 返回键对应的值，如果不存在，则返回 undefined。
- **map.has()** – 返回一个布尔值，用于判断 Map 中是否包含键对应的值。
- **map.delete()** – 删除 Map 中的元素，删除成功返回 true，失败返回 false。
- **map.size** – 返回 Map 对象键/值对的数量。
- **map.keys()** - 返回一个 Iterator 对象， 包含了 Map 对象中每个元素的键 。
- **map.values()** – 返回一个新的Iterator对象，包含了Map对象中每个元素的值 。

```tsx
let nameSiteMapping = new Map();
 
// 设置 Map 对象
nameSiteMapping.set("Google", 1);
nameSiteMapping.set("Runoob", 2);
nameSiteMapping.set("Taobao", 3);
 
// 获取键对应的值
console.log(nameSiteMapping.get("Runoob"));     // 2
 
// 判断 Map 中是否包含键对应的值
console.log(nameSiteMapping.has("Taobao"));       // true
console.log(nameSiteMapping.has("Zhihu"));        // false
 
// 返回 Map 对象键/值对的数量
console.log(nameSiteMapping.size);                // 3
 
// 删除 Runoob
console.log(nameSiteMapping.delete("Runoob"));    // true
console.log(nameSiteMapping);
// 移除 Map 对象的所有键/值对
nameSiteMapping.clear();             // 清除 Map
console.log(nameSiteMapping);
```

使用 **es6** 编译：

```
tsc --target es6 test.ts
```

编译以上代码得到如下 JavaScript 代码：

```js
let nameSiteMapping = new Map();
// 设置 Map 对象
nameSiteMapping.set("Google", 1);
nameSiteMapping.set("Runoob", 2);
nameSiteMapping.set("Taobao", 3);
// 获取键对应的值
console.log(nameSiteMapping.get("Runoob")); //40
// 判断 Map 中是否包含键对应的值
console.log(nameSiteMapping.has("Taobao")); //true
console.log(nameSiteMapping.has("Zhihu")); //false
// 返回 Map 对象键/值对的数量
console.log(nameSiteMapping.size); //3
// 删除 Runoob
console.log(nameSiteMapping.delete("Runoob")); // true
console.log(nameSiteMapping);
// 移除 Map 对象的所有键/值对
nameSiteMapping.clear(); //清除 Map
console.log(nameSiteMapping);
```

执行以上 JavaScript 代码，输出结果为：

```
2
true
false
3
true
Map { 'Google' => 1, 'Taobao' => 3 }
Map {}
```

### 1-14-2 迭代 Map

Map 对象中的元素是按顺序插入的，我们可以迭代 Map 对象，每一次迭代返回 [key, value] 数组。

TypeScript使用 **for...of** 来实现迭代：

```tsx
let nameSiteMapping = new Map();
 
nameSiteMapping.set("Google", 1);
nameSiteMapping.set("Runoob", 2);
nameSiteMapping.set("Taobao", 3);
 
// 迭代 Map 中的 key
for (let key of nameSiteMapping.keys()) {
    console.log(key);                  
}
 
// 迭代 Map 中的 value
for (let value of nameSiteMapping.values()) {
    console.log(value);                 
}
 
// 迭代 Map 中的 key => value
for (let entry of nameSiteMapping.entries()) {
    console.log(entry[0], entry[1]);   
}
 
// 使用对象解析
for (let [key, value] of nameSiteMapping) {
    console.log(key, value);            
}
```

使用 **es6** 编译：

```
tsc --target es6 test.ts
```

编译以上代码得到如下 JavaScript 代码：

```js
let nameSiteMapping = new Map();
nameSiteMapping.set("Google", 1);
nameSiteMapping.set("Runoob", 2);
nameSiteMapping.set("Taobao", 3);
// 迭代 Map 中的 key
for (let key of nameSiteMapping.keys()) {
    console.log(key);
}
// 迭代 Map 中的 value
for (let value of nameSiteMapping.values()) {
    console.log(value);
}
// 迭代 Map 中的 key => value
for (let entry of nameSiteMapping.entries()) {
    console.log(entry[0], entry[1]);
}
// 使用对象解析
for (let [key, value] of nameSiteMapping) {
    console.log(key, value);
}
```

执行以上 JavaScript 代码，输出结果为：

```
Google
Runoob
Taobao
1
2
3
Google 1
Runoob 2
Taobao 3
Google 1
Runoob 2
Taobao 3
```

## 1-15 TypeScript 元组

我们知道数组中元素的数据类型都一般是相同的（any[] 类型的数组可以不同），如果存储的元素数据类型不同，则需要使用元组。

元组中允许存储不同类型的元素，元组可以作为参数传递给函数。

创建元组的语法格式如下：

```
var tuple_name = [value1,value2,value3,…value n]
```

**实例**

声明一个元组并初始化：

```
var mytuple = [10,"Runoob"];
```

或者我们可以先声明一个空元组，然后再初始化：

```
var mytuple = []; 
mytuple[0] = 120 
mytuple[1] = 234
```

**访问元组**

元组中元素使用索引来访问，第一个元素的索引值为 0，第二个为 1，以此类推第 n 个为 n-1，语法格式如下:

```
tuple_name[index]
```

**实例**

以下实例定义了元组，包含了数字和字符串两种类型的元素：

```tsx
var mytuple = [10,"Runoob"]; // 创建元组
console.log(mytuple[0]) 
console.log(mytuple[1])
```

编译以上代码，得到以下 JavaScript 代码：

```js
var mytuple = [10, "Runoob"]; // 创建元组
console.log(mytuple[0]);
console.log(mytuple[1]);
```

输出结果为：

```
10
Runoob
```

------

### 1-15-1 元组运算

我们可以使用以下两个函数向元组添加新元素或者删除元素：

- push() 向元组添加元素，添加在最后面。

- pop() 从元组中移除元素（最后一个），并返回移除的元素。

  

  ```tsx
  var mytuple = [10,"Hello","World","typeScript"]; 
  console.log("添加前元素个数："+mytuple.length)    // 返回元组的大小
   
  mytuple.push(12)                                    // 添加到元组中
  console.log("添加后元素个数："+mytuple.length) 
  console.log("删除前元素个数："+mytuple.length) 
  console.log(mytuple.pop()+" 元素从元组中删除") // 删除并返回删除的元素
          
  console.log("删除后元素个数："+mytuple.length)
  ```

  编译以上代码，得到以下 JavaScript 代码：

  ```js
  var mytuple = [10, "Hello", "World", "typeScript"];
  console.log("添加前元素个数：" + mytuple.length); // 返回元组的大小
  mytuple.push(12); // 添加到元组中
  console.log("添加后元素个数：" + mytuple.length);
  console.log("删除前元素个数：" + mytuple.length);
  console.log(mytuple.pop() + " 元素从元组中删除"); // 删除并返回删除的元素
  console.log("删除后元素个数：" + mytuple.length);
  ```

  输出结果为：

  ```
  添加前元素个数：4
  添加后元素个数：5
  删除前元素个数：5
  12 元素从元组中删除
  删除后元素个数：41-15-2 更新元组
  ```



输出结果为：

```
添加前元素个数：4
添加后元素个数：5
删除前元素个数：5
12 元素从元组中删除
删除后元素个数：4
```

------

### 1-15-2 更新元组

元组是可变的，这意味着我们可以对元组进行更新操作：

```tsx
var mytuple = [10, "Runoob", "Taobao", "Google"]; // 创建一个元组
console.log("元组的第一个元素为：" + mytuple[0]) 
 
// 更新元组元素
mytuple[0] = 121     
console.log("元组中的第一个元素更新为："+ mytuple[0])
```

编译以上代码，得到以下 JavaScript 代码：

```js
var mytuple = [10, "Runoob", "Taobao", "Google"]; // 创建一个元组
console.log("元组的第一个元素为：" + mytuple[0]);
// 更新元组元素
mytuple[0] = 121;
console.log("元组中的第一个元素更新为：" + mytuple[0]);
```

输出结果为：

```
元组的第一个元素为：10
元组中的第一个元素更新为：121
```

------

### 1-15-3 解构元组

我们也可以把元组元素赋值给变量，如下所示：

```tsx
var a =[10,"Runoob"] 
var [b,c] = a 
console.log( b )    
console.log( c )
```

编译以上代码，得到以下 JavaScript 代码：

```js
var a = [10, "Runoob"];
var b = a[0], c = a[1];
console.log(b);
console.log(c);
```

输出结果为：

```
10
Runoob
```

## 1-16 TypeScript 联合类型

联合类型（Union Types）可以通过管道(|)将变量设置多种类型，赋值时可以根据设置的类型来赋值。

**注意**：只能赋值指定的类型，如果赋值其它类型就会报错。

创建联合类型的语法格式如下：

```
Type1|Type2|Type3 
```

**实例**

声明一个联合类型：

```tsx
var val:string|number 
val = 12 
console.log("数字为 "+ val) 
val = "Runoob" 
console.log("字符串为 " + val)
```

编译以上代码，得到以下 JavaScript 代码：

```js
var val;
val = 12;
console.log("数字为 " + val);
val = "Runoob";
console.log("字符串为 " + val);
```

输出结果为：

```
数字为 12
字符串为 Runoob
```

如果赋值其它类型就会报错：

```
var val:string|number 
val = true 
```

也可以将联合类型作为函数参数使用：

```tsx
function disp(name:string|string[]) { 
        if(typeof name == "string") { 
                console.log(name) 
        } else { 
                var i; 
                for(i = 0;i<name.length;i++) { 
                console.log(name[i])
                } 
        } 
} 
disp("Runoob") 
console.log("输出数组....") 
disp(["Runoob","Google","Taobao","Facebook"])
```

编译以上代码，得到以下 JavaScript 代码：

```js
function disp(name) {
        if (typeof name == "string") {
                console.log(name);
        }
        else {
                var i;
                for (i = 0; i < name.length; i++) {
                console.log(name[i]);
                }
        }
}
disp("Runoob");
console.log("输出数组....");
disp(["Runoob", "Google", "Taobao", "Facebook"]);
```

输出结果为：

```
Runoob
输出数组....
Runoob
Google
Taobao
Facebook
```

------

### 1-16-1 联合类型数组

我们也可以将数组声明为联合类型：

```tsx
var arr:number[]|string[]; 
var i:number; 
arr = [1,2,4] 
console.log("**数字数组**")  
 
for(i = 0;i<arr.length;i++) { 
   console.log(arr[i]) 
}  
 
arr = ["Runoob","Google","Taobao"] 
console.log("**字符串数组**")  
 
for(i = 0;i<arr.length;i++) { 
   console.log(arr[i]) 
}
```

编译以上代码，得到以下 JavaScript 代码：

```js
var arr;
var i;
arr = [1, 2, 4];
console.log("**数字数组**");
for (i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}
arr = ["Runoob", "Google", "Taobao"];
console.log("**字符串数组**");
for (i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}
```

输出结果为：

```js
**数字数组**
1
2
4
**字符串数组**
Runoob
Google
Taobao
```

## 1-17 typeScript 接口

接口是一系列抽象方法的声明，是一些方法特征的集合，这些方法都应该是抽象的，需要由具体的类去实现，然后第三方就可以通过这组抽象方法调用，让具体的类执行具体的方法。

TypeScript 接口定义如下：

```
interface interface_name { 
}
```

**实例**

以下实例中，我们定义了一个接口 IPerson，接着定义了一个变量 customer，它的类型是 IPerson。

customer 实现了接口 IPerson 的属性和方法。

```tsx
interface IPerson { 
    firstName:string, 
    lastName:string, 
    sayHi: ()=>string 
} 
 
var customer:IPerson = { 
    firstName:"Tom",
    lastName:"Hanks", 
    sayHi: ():string =>{return "Hi there"} 
} 
 
console.log("Customer 对象 ") 
console.log(customer.firstName) 
console.log(customer.lastName) 
console.log(customer.sayHi())  
 
var employee:IPerson = { 
    firstName:"Jim",
    lastName:"Blakes", 
    sayHi: ():string =>{return "Hello!!!"} 
} 
 
console.log("Employee  对象 ") 
console.log(employee.firstName) 
console.log(employee.lastName)
```

需要注意接口不能转换为 JavaScript。 它只是 TypeScript 的一部分。

编译以上代码，得到以下 JavaScript 代码：

```js
var customer = {
    firstName: "Tom",
    lastName: "Hanks",
    sayHi: function () { return "Hi there"; }
};
console.log("Customer 对象 ");
console.log(customer.firstName);
console.log(customer.lastName);
console.log(customer.sayHi());
var employee = {
    firstName: "Jim",
    lastName: "Blakes",
    sayHi: function () { return "Hello!!!"; }
};
console.log("Employee  对象 ");
console.log(employee.firstName);
console.log(employee.lastName);
```

输出结果为：

```
Customer 对象
Tom
Hanks
Hi there
Employee  对象
Jim
Blakes
```

------

### 1-17-1 联合类型和接口

以下实例演示了如何在接口中使用联合类型：

```tsx
interface RunOptions { 
    program:string; 
    commandline:string[]|string|(()=>string); 
} 
 
// commandline 是字符串
var options:RunOptions = {program:"test1",commandline:"Hello"}; 
console.log(options.commandline)  
 
// commandline 是字符串数组
options = {program:"test1",commandline:["Hello","World"]}; 
console.log(options.commandline[0]); 
console.log(options.commandline[1]);  
 
// commandline 是一个函数表达式
options = {program:"test1",commandline:()=>{return "**Hello World**";}}; 
 
var fn:any = options.commandline; 
console.log(fn());
```

编译以上代码，得到以下 JavaScript 代码：

```js
// commandline 是字符串
var options = { program: "test1", commandline: "Hello" };
console.log(options.commandline);
// commandline 是字符串数组
options = { program: "test1", commandline: ["Hello", "World"] };
console.log(options.commandline[0]);
console.log(options.commandline[1]);
// commandline 是一个函数表达式
options = { program: "test1", commandline: function () { return "**Hello World**"; } };
var fn = options.commandline;
console.log(fn());
```

输出结果为：

```
Hello
Hello
World
**Hello World**
```

------

### 1-17-2 接口和数组

接口中我们可以将数组的索引值和元素设置为不同类型，索引值可以是数字或字符串。

设置元素为字符串类型：

```tsx
interface namelist { 
   [index:number]:string 
} 
 
// 类型一致，正确
var list2:namelist = ["Google","Runoob","Taobao"]
// 错误元素 1 不是 string 类型
// var list2:namelist = ["Runoob",1,"Taobao"]
```

如果使用了其他类型会报错：

```js
interface namelist { 
   [index:number]:string 
} 
 
// 类型一致，正确
// var list2:namelist = ["Google","Runoob","Taobao"]
// 错误元素 1 不是 string 类型
var list2:namelist = ["John",1,"Bran"]
```

执行后报错如下，显示类型不一致：

```tsx
test.ts:8:30 - error TS2322: Type 'number' is not assignable to type 'string'.

8 var list2:namelist = ["John",1,"Bran"]
                               ~

  test.ts:2:4
    2    [index:number]:string
         ~~~~~~~~~~~~~~~~~~~~~
    The expected type comes from this index signature.


Found 1 error.
```

```js
interface ages { 
   [index:string]:number 
} 
 
var agelist:ages; 
 // 类型正确 
agelist["runoob"] = 15  
 
// 类型错误，输出  error TS2322: Type '"google"' is not assignable to type 'number'.
// agelist[2] = "google"
```

### 1-17-3 接口继承

接口继承就是说接口可以通过其他接口来扩展自己。

Typescript 允许接口继承多个接口。

继承使用关键字 **extends**。

单接口继承语法格式：

```
Child_interface_name extends super_interface_name
```

多接口继承语法格式：

```
Child_interface_name extends super_interface1_name, super_interface2_name,…,super_interfaceN_name
```

继承的各个接口使用逗号 **,** 分隔。

#### 3-1 单继承实例

```tsx
interface Person { 
   age:number 
} 
 
interface Musician extends Person { 
   instrument:string 
} 
 
var drummer = <Musician>{}; 
drummer.age = 27 
drummer.instrument = "Drums" 
console.log("年龄:  "+drummer.age)
console.log("喜欢的乐器:  "+drummer.instrument)
```

编译以上代码，得到以下 JavaScript 代码：

```js
var drummer = {};
drummer.age = 27;
drummer.instrument = "Drums";
console.log("年龄:  " + drummer.age);
console.log("喜欢的乐器:  " + drummer.instrument);
```

输出结果为：

```
年龄:  27
喜欢的乐器:  Drums
```

#### 3-2 多继承实例

```tsx
interface IParent1 { 
    v1:number 
} 
 
interface IParent2 { 
    v2:number 
} 
 
interface Child extends IParent1, IParent2 { } 
var Iobj:Child = { v1:12, v2:23} 
console.log("value 1: "+Iobj.v1+" value 2: "+Iobj.v2)
```

编译以上代码，得到以下 JavaScript 代码：

```js
var Iobj = { v1: 12, v2: 23 };
console.log("value 1: " + Iobj.v1 + " value 2: " + Iobj.v2);
```

输出结果为：

```
value 1: 12 value 2: 23
```

## 1-18 TypeScript 类

TypeScript 是面向对象的 JavaScript。

类描述了所创建的对象共同的属性和方法。

TypeScript 支持面向对象的所有特性，比如 类、接口等。

TypeScript 类定义方式如下：

```
class class_name { 
    // 类作用域
}
```

定义类的关键字为 class，后面紧跟类名，类可以包含以下几个模块（类的数据成员）：

- **字段** − 字段是类里面声明的变量。字段表示对象的有关数据。
- **构造函数** − 类实例化时调用，可以为类的对象分配内存。
- **方法** − 方法为对象要执行的操作。

**实例**

创建一个 Person 类：

```tsx
class Person {
}
```

编译以上代码，得到以下 JavaScript 代码：

```js
var Person = /** @class */ (function () {
    function Person() {
    }
    return Person;
}());
```

### 1-18-1 创建类的数据成员

以下实例我们声明了类 Car，包含字段为 engine，构造函数在类实例化后初始化字段 engine。

this 关键字表示当前类实例化的对象。注意构造函数的参数名与字段名相同，this.engine 表示类的字段。

此外我们也在类中定义了一个方法 disp()。

```tsx
class Car { 
    // 字段 
    engine:string; 
 
    // 构造函数 
    constructor(engine:string) { 
        this.engine = engine 
    }  
 
    // 方法 
    disp():void { 
        console.log("发动机为 :   "+this.engine) 
    } 
}
```

编译以上代码，得到以下 JavaScript 代码：

```js
var Car = /** @class */ (function () {
    // 构造函数 
    function Car(engine) {
        this.engine = engine;
    }
    // 方法 
    Car.prototype.disp = function () {
        console.log("发动机为 :   " + this.engine);
    };
    return Car;
}());
```

### 1-18-2  创建实例化对象

我们使用 new 关键字来实例化类的对象，语法格式如下：

```tsx
var object_name = new class_name([ arguments ])
```

类实例化时会调用构造函数，例如：

```tsx
var obj = new Car("Engine 1")
```

类中的字段属性和方法可以使用 **.** 号来访问：

```tsx
// 访问属性
obj.field_name 

// 访问方法
obj.function_name()
```

**完整实例**

以下实例创建来一个 Car 类，然后通过关键字 new 来创建一个对象并访问属性和方法：

```tsx
class Car { 
   // 字段
   engine:string; 
   
   // 构造函数
   constructor(engine:string) { 
      this.engine = engine 
   }  
   
   // 方法
   disp():void { 
      console.log("函数中显示发动机型号  :   "+this.engine) 
   } 
} 
 
// 创建一个对象
var obj = new Car("XXSY1")
 
// 访问字段
console.log("读取发动机型号 :  "+obj.engine)  
 
// 访问方法
obj.disp()
```

编译以上代码，得到以下 JavaScript 代码：

```tsx
var Car = /** @class */ (function () {
    // 构造函数
    function Car(engine) {
        this.engine = engine;
    }
    // 方法
    Car.prototype.disp = function () {
        console.log("函数中显示发动机型号  :   " + this.engine);
    };
    return Car;
}());
// 创建一个对象
var obj = new Car("XXSY1");
// 访问字段
console.log("读取发动机型号 :  " + obj.engine);
// 访问方法
obj.disp();
```

输出结果为：

```js
读取发动机型号 :  XXSY1
函数中显示发动机型号  :   XXSY1
```

### 1-18-3 类的继承

TypeScript 支持继承类，即我们可以在创建类的时候继承一个已存在的类，这个已存在的类称为父类，继承它的类称为子类。

类继承使用关键字 **extends**，子类除了不能继承父类的私有成员(方法和属性)和构造函数，其他的都可以继承。

TypeScript 一次只能继承一个类，不支持继承多个类，但 TypeScript 支持多重继承（A 继承 B，B 继承 C）。

语法格式如下：

```
class child_class_name extends parent_class_name
```

**实例**

类的继承：实例中创建了 Shape 类，Circle 类继承了 Shape 类，Circle 类可以直接使用 Area 属性：

```tsx
class Shape { 
   Area:number 
   
   constructor(a:number) { 
      this.Area = a 
   } 
} 
 
class Circle extends Shape { 
   disp():void { 
      console.log("圆的面积:  "+this.Area) 
   } 
}
  
var obj = new Circle(223); 
obj.disp()
```

编译以上代码，得到以下 JavaScript 代码：

```js
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Shape = /** @class */ (function () {
    function Shape(a) {
        this.Area = a;
    }
    return Shape;
}());
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Circle.prototype.disp = function () {
        console.log("圆的面积:  " + this.Area);
    };
    return Circle;
}(Shape));
var obj = new Circle(223);
obj.disp();
```

输出结果为：

```
圆的面积:  223
```

需要注意的是子类只能继承一个父类，TypeScript 不支持继承多个类，但支持多重继承，如下实例：

```tsx
class Root { 
   str:string; 
} 
 
class Child extends Root {} 
class Leaf extends Child {} // 多重继承，继承了 Child 和 Root 类
 
var obj = new Leaf(); 
obj.str ="hello" 
console.log(obj.str)
```

编译以上代码，得到以下 JavaScript 代码：

```js
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Root = /** @class */ (function () {
    function Root() {
    }
    return Root;
}());
var Child = /** @class */ (function (_super) {
    __extends(Child, _super);
    function Child() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Child;
}(Root));
var Leaf = /** @class */ (function (_super) {
    __extends(Leaf, _super);
    function Leaf() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Leaf;
}(Child)); // 多重继承，继承了 Child 和 Root 类
var obj = new Leaf();
obj.str = "hello";
console.log(obj.str);
```

输出结果为：

```
hello
```

------

### 1-18-4 继承类的方法重写

类继承后，子类可以对父类的方法重新定义，这个过程称之为方法的重写。

其中 super 关键字是对父类的直接引用，该关键字可以引用父类的属性和方法。

```tsx
class PrinterClass { 
   doPrint():void {
      console.log("父类的 doPrint() 方法。") 
   } 
} 
 
class StringPrinter extends PrinterClass { 
   doPrint():void { 
      super.doPrint() // 调用父类的函数
      console.log("子类的 doPrint()方法。")
   } 
}
```

编译以上代码，得到以下 JavaScript 代码：

```js
var obj = new StringPrinter() 
obj.doPrint()
 
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var PrinterClass = /** @class */ (function () {
    function PrinterClass() {
    }
    PrinterClass.prototype.doPrint = function () {
        console.log("父类的 doPrint() 方法。");
    };
    return PrinterClass;
}());
var StringPrinter = /** @class */ (function (_super) {
    __extends(StringPrinter, _super);
    function StringPrinter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StringPrinter.prototype.doPrint = function () {
        _super.prototype.doPrint.call(this); // 调用父类的函数
        console.log("子类的 doPrint()方法。");
    };
    return StringPrinter;
}(PrinterClass));
var obj = new StringPrinter();
obj.doPrint();
```

输出结果为：

```
父类的 doPrint() 方法。
子类的 doPrint()方法。
```

------

### 1-18-5 static 关键字

static 关键字用于定义类的数据成员（属性和方法）为静态的，静态成员可以直接通过类名调用。

```tsx
class StaticMem {  
   static num:number; 
   
   static disp():void { 
      console.log("num 值为 "+ StaticMem.num) 
   } 
} 
 
StaticMem.num = 12     // 初始化静态变量
StaticMem.disp()       // 调用静态方法
```

编译以上代码，得到以下 JavaScript 代码：

```js
var StaticMem = /** @class */ (function () {
    function StaticMem() {
    }
    StaticMem.disp = function () {
        console.log("num 值为 " + StaticMem.num);
    };
    return StaticMem;
}());
StaticMem.num = 12; // 初始化静态变量
StaticMem.disp(); // 调用静态方法
```

输出结果为：

```
num 值为 12
```

------

### 1-18-6 instanceof 运算符

instanceof 运算符用于判断对象是否是指定的类型，如果是返回 true，否则返回 false。

```tsx
class Person{ } 
var obj = new Person() 
var isPerson = obj instanceof Person; 
console.log("obj 对象是 Person 类实例化来的吗？ " + isPerson);
```

编译以上代码，得到以下 JavaScript 代码：

```js
var Person = /** @class */ (function () {
    function Person() {
    }
    return Person;
}());
var obj = new Person();
var isPerson = obj instanceof Person;
console.log(" obj 对象是 Person 类实例化来的吗？ " + isPerson);
```

输出结果为：

```
obj 对象是 Person 类实例化来的吗？ true
```

### 1-18-7 访问控制修饰符

TypeScript 中，可以使用访问控制符来保护对类、变量、方法和构造方法的访问。TypeScript 支持 3 种不同的访问权限。

- **public（默认）** : 公有，可以在任何地方被访问。
- **protected** : 受保护，可以被其自身以及其子类访问。
- **private** : 私有，只能被其定义所在的类访问。

以下实例定义了两个变量 str1 和 str2，str1 为 public，str2 为 private，实例化后可以访问 str1，如果要访问 str2 则会编译错误。

```tsx
class Encapsulate { 
   str1:string = "hello" 
   private str2:string = "world" 
}
 
var obj = new Encapsulate() 
console.log(obj.str1)     // 可访问 
console.log(obj.str2)   // 编译错误， str2 是私有的
```

### 1-18-8 类和接口

类可以实现接口，使用关键字 implements，并将 interest 字段作为类的属性使用。

以下实例中 AgriLoan 类实现了 ILoan 接口：

```tsx
interface ILoan { 
   interest:number 
} 
 
class AgriLoan implements ILoan { 
   interest:number 
   rebate:number 
   
   constructor(interest:number,rebate:number) { 
      this.interest = interest 
      this.rebate = rebate 
   } 
} 
 
var obj = new AgriLoan(10,1) 
console.log("利润为 : "+obj.interest+"，抽成为 : "+obj.rebate )
```

编译以上代码，得到以下 JavaScript 代码：

```js
var AgriLoan = /** @class */ (function () {
    function AgriLoan(interest, rebate) {
        this.interest = interest;
        this.rebate = rebate;
    }
    return AgriLoan;
}());
var obj = new AgriLoan(10, 1);
console.log("利润为 : " + obj.interest + "，抽成为 : " + obj.rebate);
```

输出结果为：

```
利润为 : 10，抽成为 : 1
```

## 1-19 TypeScript 对象

对象是包含一组键值对的实例。 值可以是标量、函数、数组、对象等，如下实例：

```tsx
var object_name = { 
    key1: "value1", // 标量
    key2: "value",  
    key3: function() {
        // 函数
    }, 
    key4:["content1", "content2"] //集合
}
```

以上对象包含了标量，函数，集合(数组或元组)。

### 1-19-1 对象实例

```tsx
var sites = { 
   site1:"Runoob", 
   site2:"Google" 
}; 
// 访问对象的值
console.log(sites.site1) 
console.log(sites.site2)
```

编译以上代码，得到以下 JavaScript 代码：

```js
var sites = { 
   site1:"Runoob", 
   site2:"Google" 
}; 
// 访问对象的值
console.log(sites.site1) 
console.log(sites.site2)
```

输出结果为：

```
Runoob
Google
```

------

### 1-19-2 TypeScript 类型模板

假如我们在 JavaScript 定义了一个对象：

```tsx
var sites = { 
   site1:"Runoob", 
   site2:"Google" 
};
```

这时如果我们想在对象中添加方法，可以做以下修改：

```
sites.sayHello = function(){ return "hello";}
```

如果在 TypeScript 中使用以上方式则会出现编译错误，因为Typescript 中的对象必须是特定类型的实例。

```tsx
var sites = {
    site1: "Runoob",
    site2: "Google",
    sayHello: function () { } // 类型模板
};
sites.sayHello = function () {
    console.log("hello " + sites.site1);
};
sites.sayHello();
```

编译以上代码，得到以下 JavaScript 代码：

```js
var sites = {
    site1: "Runoob",
    site2: "Google",
    sayHello: function () { } // 类型模板
};
sites.sayHello = function () {
    console.log("hello " + sites.site1);
};
sites.sayHello();
```

输出结果为：

```
hello Runoob
```

此外对象也可以作为一个参数传递给函数，如下实例：

```tsx
var sites = { 
    site1:"Runoob", 
    site2:"Google",
}; 
var invokesites = function(obj: { site1:string, site2 :string }) { 
    console.log("site1 :"+obj.site1) 
    console.log("site2 :"+obj.site2) 
} 
invokesites(sites)
```

编译以上代码，得到以下 JavaScript 代码：

```js
var sites = {
    site1: "Runoob",
    site2: "Google"
};
var invokesites = function (obj) {
    console.log("site1 :" + obj.site1);
    console.log("site2 :" + obj.site2);
};
invokesites(sites);
```

输出结果为：

```
site1 :Runoob
site2 :Google
```

------

### 1-19-3 鸭子类型(Duck Typing)

鸭子类型（英语：duck typing）是动态类型的一种风格，是多态(polymorphism)的一种形式。

在这种风格中，一个对象有效的语义，不是由继承自特定的类或实现特定的接口，而是由"当前方法和属性的集合"决定。

> 可以这样表述：
>
> "当看到一只鸟走起来像鸭子、游泳起来像鸭子、叫起来也像鸭子，那么这只鸟就可以被称为鸭子。"

在鸭子类型中，关注点在于对象的行为能做什么，而不是关注对象所属的类型。例如，在不使用鸭子类型的语言中，我们可以编写一个函数，它接受一个类型为"鸭子"的对象，并调用它的"走"和"叫"方法。在使用鸭子类型的语言中，这样的一个函数可以接受一个任意类型的对象，并调用它的"走"和"叫"方法。如果这些需要被调用的方法不存在，那么将引发一个运行时错误。任何拥有这样的正确的"走"和"叫"方法的对象都可被函数接受的这种行为引出了以上表述，这种决定类型的方式因此得名。

```js
interface IPoint { 
    x:number 
    y:number 
} 
function addPoints(p1:IPoint,p2:IPoint):IPoint { 
    var x = p1.x + p2.x 
    var y = p1.y + p2.y 
    return {x:x,y:y} 
} 
 
// 正确
var newPoint = addPoints({x:3,y:4},{x:5,y:1})  
 
// 错误 
var newPoint2 = addPoints({x:1},{x:4,y:3})
```

## 1-20 TypeScript 泛型

泛型（Generics）是一种编程语言特性，允许在定义函数、类、接口等时使用占位符来表示类型，而不是具体的类型。

泛型是一种在编写可重用、灵活且类型安全的代码时非常有用的功能。

使用泛型的主要目的是为了处理不特定类型的数据，使得代码可以适用于多种数据类型而不失去类型检查。

**泛型的优势包括：**

- **代码重用：** 可以编写与特定类型无关的通用代码，提高代码的复用性。
- **类型安全：** 在编译时进行类型检查，避免在运行时出现类型错误。
- **抽象性：** 允许编写更抽象和通用的代码，适应不同的数据类型和数据结构。

### 1-20-1 泛型标识符

在泛型中，通常使用一些约定俗成的标识符，比如常见的 `T`（表示 Type）、`U`、`V` 等，但实际上你可以使用任何标识符。

**T**: 代表 "Type"，是最常见的泛型类型参数名。

```
function identity<T>(arg: T): T {
    return arg;
}
```

**K, V**: 用于表示键（Key）和值（Value）的泛型类型参数。

```
interface KeyValuePair<K, V> {
    key: K;
    value: V;
}
```

**E**: 用于表示数组元素的泛型类型参数。

```
function printArray<E>(arr: E[]): void {
    arr.forEach(item => console.log(item));
}
```

**R**: 用于表示函数返回值的泛型类型参数。

```
function getResult<R>(value: R): R {
    return value;
}
```

**U, V**: 通常用于表示第二、第三个泛型类型参数。

```
function combine<U, V>(first: U, second: V): string {
    return `${first} ${second}`;
}
```

这些标识符是约定俗成的，实际上你可以选择任何符合标识符规范的名称。关键是使得代码易读和易于理解，所以建议在泛型类型参数上使用描述性的名称，以便于理解其用途。

### 1-20-2 泛型函数（Generic Functions）

使用泛型来创建一个可以处理不同类型的函数：

```js
function identity<T>(arg: T): T {
    return arg;
}

// 使用泛型函数
let result = identity<string>("Hello");
console.log(result); // 输出: Hello

let numberResult = identity<number>(42);
console.log(numberResult); // 输出: 42
```

**解析：** 以上例子中，`identity` 是一个泛型函数，使用 `<T>` 表示泛型类型。它接受一个参数 `arg` 和返回值都是泛型类型 `T`。在使用时，可以通过尖括号 `<>` 明确指定泛型类型。第一个调用指定了 `string` 类型，第二个调用指定了 `number` 类型。

### 1-20-3 泛型接口（Generic Interfaces）

可以使用泛型来定义接口，使接口的成员能够使用任意类型：

```tsx
// 基本语法
interface Pair<T, U> {
    first: T;
    second: U;
}

// 使用泛型接口
let pair: Pair<string, number> = { first: "hello", second: 42 };
console.log(pair); // 输出: { first: 'hello', second: 42 }
```

**解析：** 这里定义了一个泛型接口 `Pair`，它有两个类型参数 `T` 和 `U`。然后，使用这个泛型接口创建了一个对象 `pair`，其中 `first` 是字符串类型，`second` 是数字类型。

### 1-20-4 泛型类（Generic Classes）

泛型也可以应用于类的实例变量和方法：

```tsx
// 基本语法
class Box<T> {
    private value: T;

    constructor(value: T) {
        this.value = value;
    }

    getValue(): T {
        return this.value;
    }
}

// 使用泛型类
let stringBox = new Box<string>("TypeScript");
console.log(stringBox.getValue()); // 输出: TypeScript
```

**解析：** 在这个例子中，`Box` 是一个泛型类，使用 `<T>` 表示泛型类型。构造函数和方法都可以使用泛型类型 `T`。通过实例化 `Box<string>`，我们创建了一个存储字符串的 `Box` 实例，并通过 `getValue` 方法获取了存储的值。

### 1-20-5 泛型约束（Generic Constraints）

有时候你想限制泛型的类型范围，可以使用泛型约束：

```tsx
// 基本语法
interface Lengthwise {
    length: number;
}

function logLength<T extends Lengthwise>(arg: T): void {
    console.log(arg.length);
}

// 正确的使用
logLength("hello"); // 输出: 5

// 错误的使用，因为数字没有 length 属性
logLength(42); // 错误
```

**解析：** 在这个例子中，定义了一个泛型函数 `logLength`，它接受一个类型为 `T` 的参数，但有一个约束条件，即 `T` 必须实现 `Lengthwise` 接口，该接口要求有 `length` 属性。因此，可以正确调用 `logLength("hello")`，但不能调用 `logLength(42)`，因为数字没有 `length` 属性。

### 1-20-6 泛型与默认值

可以给泛型设置默认值，使得在不指定类型参数时能够使用默认类型：

```tsx
// 基本语法
function defaultValue<T = string>(arg: T): T {
    return arg;
}

// 使用带默认值的泛型函数
let result1 = defaultValue("hello"); // 推断为 string 类型
let result2 = defaultValue(42);      // 推断为 number 类型
```

**说明：** 这个例子展示了带有默认值的泛型函数。函数 `defaultValue` 接受一个泛型参数 `T`，并给它设置了默认类型为 `string`。在使用时，如果没有显式指定类型，会使用默认类型。在例子中，第一个调用中 `result1` 推断为 `string` 类型，第二个调用中 `result2` 推断为 `number` 类型。

## 1-21 TypeScript 命名空间

命名空间一个最明确的目的就是解决重名问题。

假设这样一种情况，当一个班上有两个名叫小明的学生时，为了明确区分它们，我们在使用名字之外，不得不使用一些额外的信息，比如他们的姓（王小明，李小明），或者他们父母的名字等等。

命名空间定义了标识符的可见范围，一个标识符可在多个命名空间中定义，它在不同命名空间中的含义是互不相干的。这样，在一个新的命名空间中可定义任何标识符，它们不会与任何已有的标识符发生冲突，因为已有的定义都处于其他命名空间中。

TypeScript 中命名空间使用 **namespace** 来定义，语法格式如下：

```tsx
namespace SomeNameSpaceName { 
   export interface ISomeInterfaceName {      }  
   export class SomeClassName {      }  
}
```

以上定义了一个命名空间 SomeNameSpaceName，如果我们需要在外部可以调用 SomeNameSpaceName 中的类和接口，则需要在类和接口添加 **export** 关键字。

要在另外一个命名空间调用语法格式为：

```
SomeNameSpaceName.SomeClassName;
```

如果一个命名空间在一个单独的 TypeScript 文件中，则应使用三斜杠 /// 引用它，语法格式如下：

```
/// <reference path = "SomeFileName.ts" />
```





