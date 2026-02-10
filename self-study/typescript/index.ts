function getUserName():string | number { //联合类型
    if (Math.random() < 0.5) {
        return "yuan jin";
    }
    return 404;
}

let myname = getUserName();
if (typeof myname === "string") {
    myname = myname.split(" ")
        .filter(it => it)
        .map(it => it[0].toUpperCase() + it.substr(1))
        .join(" ");
}

//TS是一个可选的静态的类型系统 仅需要在 变量、函数的参数、函数的返回值位置加上```:类型```

//函数重载：在函数实现之前，对函数调用的多种情况声明

//practice:创建一副扑克牌（不包括大小王），打印该扑克牌
/*
type Deck = NormalCard[]
type Color = "♥" | "♠" | "♦" | "♣";
type NormalCard = {
    color: Color
    mark: number
}

function createDeck(): Deck {
    const deck: Deck = [];
    for (let i = 1; i <= 13; i++) {
        deck.push({
            mark: i,
            color: "♠"
        })
        deck.push({
            mark: i,
            color: "♣"
        })
        deck.push({
            mark: i,
            color: "♥"
        })
        deck.push({
            mark: i,
            color: "♦"
        })
    }
    return deck;
}

function printDeck(deck: Deck) {
    let result = "\n";
    deck.forEach((card, i) => {
        let str = card.color;
        if (card.mark <= 10) {
            str += card.mark;
        }
        else if (card.mark === 11) {
            str += "J";
        }
        else if (card.mark === 12) {
            str += "Q";
        }
        else {
            str += "K";
        }
        result += str + "\t";
        if ((i + 1) % 6 === 0) {
            result += "\n";
        }
    })
    console.log(result);
}

const deck = createDeck();
printDeck(deck);
*/

//上述使用枚举改造
type Deck = NormalCard[]
enum Color {
    heart = "♥",
    spade = "♠",
    club = "♣",
    diamond = "♦"
}

enum Mark {
    A = "A",
    two = "2",
    three = "3",
    four = "4",
    five = "5",
    six = "6",
    seven = "7",
    eight = "8",
    nine = "9",
    ten = "10",
    eleven = "J",
    twelve = "Q",
    king = "K"
}

type NormalCard = {
    color: Color
    mark: Mark
}

function createDeck(): Deck {
    const deck: Deck = [];
    const marks = Object.values(Mark)
    const colors = Object.values(Color)
    for (const m of marks) {
        for (const c of colors) {
            deck.push({
                color: c,
                mark: m
            })
        }
    }
    return deck;
}

function printDeck(deck: Deck) {
    let result = "\n";
    deck.forEach((card, i) => {
        let str = card.color + card.mark;
        result += str + "\t";
        if ((i + 1) % 6 === 0) {
            result += "\n";
        }
    })
    console.log(result);
}

const deck = createDeck();
printDeck(deck);

//位运算：两个数字换算成二进制后进行的运算

//接口可以继承
/*
|      配置名称       |              含义              |
| :-----------------: | :----------------------------: |
|       module        | 设置编译结果中使用的模块化标准 |
|  moduleResolution   |       设置解析模块的模式       |
| noImplicitUseStrict |  编译结果中不包含"use strict"  |
|   removeComments    |        编译结果移除注释        |
|    noEmitOnError    |      错误时不生成编译结果      |
|   esModuleInterop   |  启用es模块化交互非es模块导出  |
*/