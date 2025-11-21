  //泛型 generics
      // 复用函数时，动态传递不同类型参数
      function dump<T>(arg:T): T {
        return arg;
      }
      let hd = dump<string>('houdunren.com');

      let xj = dump<boolean>(true);

    //   function dump(arg:string): string {
    //     return arg;
    //   }
    //   let hd = dump('houdunren.com');

    //   function dumpBoolean(arg:boolean): boolean {
    //     return arg;
    //   }
    //   let xj = dumpBoolean(true);
    //泛型约束
    // type t = {} & {length:number}
    // interface T {}
    // interface LengthInterface {length:number}
    // T extends LengthInterface
    // type stringS = {length:number, substring():void}
    // type t = {} t& stringS
    // type t = {length:number} & {substring():void}
    function getLength<T extends {length:number}>(arg:T): number {
        return arg.length;
    }
    getLength<string>('fenney.com');
    getLength<number>(123);
    getLength<boolean>(true);
    getLength<object>({});
    getLength<array>([1,2,3]);
    getLength<function>(()=>{});
    getLength<class>(class{}).length;
    
    console.log(getLength<string>('fenney.com'));
    
// class CollectionNumber<HD> {
//     data: string[] = [];
//     public push(...item: number[]) {
//         this.data.push(...items);
//     }
// }
//     public shift():HD {
//         return this.data.shift();
//     }

//     type User = {name:string;age:number}
//     const user:User = {name:'John',age:20}

// const numberCollection = new CollectionNumber();
// numberCollection.push(user);   
// console.log(numberCollection.shift());

// {
//     class User <T> {
//         public constructor(private _user) {
//             this._user = _user;
//         }
//         public get(): T {
//             return this.user
//         }
//     }
//     interface UserInterface {
//         name:string;
//         age:number;
//     }
//     const obj = new User<UserInterface>({name:'John',age:20});
//     console.log(obj.get().name);
// }

// 接口中用泛型
interface ArticleInterface<B> {
    title:string;
    isLock:B;
    comments: C[];
}

type Comment = {
    content:string;
    author:string;
}

const hd:ArticleInterface<boolean,CommentType> = {
    title: 'Hello',
    isLock: true,
    comments: [
        {
            content: 'Hello',
            author: 'John'
        }
    ]
}
