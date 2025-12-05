function hello(name:string):string {
    if (typeof value === 'string') {
        return 'hello ' + value;
    } else if (typeof value === 'number') {
        return 'hello, my age is ${value}';
    } else {
        return 'unknown format';
    }
}

hello('John');

//接口继承
interface Parent {
    prop1: string;
    prop2: number;
}

interface Child extends Parent {
    prop3: boolean;
}

const myObj: Child = {
    prop1: 'hello',
    prop2: 20,
    prop3: true,
}

//class 
//修饰符
class Article {
    title: string;
    content: string;
    isLock: boolean;
    comments: Comment[];
    aaa?: string; //可选属性
    bbb = 100; //默认属性
    protected ccc = 200; //受保护属性
    private ddd = 300; //私有属性
    public eee = 400; //公共属性

    constructor(title: string, content: string) {
        this.title = title;
        this.content = content;
    }
}

const a = new Article('Hello', 'This is a test article');


//接口定义
export interface IArticle {
	id: string;
	title: string;
	content: string;
	preview: string;
}

//标签
var num = 0;

outermost:
  for(var i = 0; i < 10; i++){
    for(var j = 0; j < 10; j++){
      if(j == 5){
        break outermost;  // 跳出外层循环
      }
      console.log(i + "," + j);
      num++;
    }
  }

console.log(num);  // 输出：5

//如果不使用标签
var num = 0;

for(var i = 0; i < 10; i++){
  for(var j = 0; j < 10; j++){
    if(j == 5){
      break;  // 只跳出内层循环
    }
    console.log(i + "," + j);
    num++;
  }
}

console.log(num);  // 输出：50

//method3： continue
var num = 0;

outermost:
  for(var i = 0; i < 10; i++){
    for(var j = 0; j < 10; j++){
      if(j == 5){
        continue outermost;  // 跳到外层循环的下一次迭代
      }
      console.log(i + "," + j);
      num++;
    }
  }

console.log(num);  // 输出：50