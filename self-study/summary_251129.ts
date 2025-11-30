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