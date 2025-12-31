var aGoods = { //原始对象尽量不动
    pic: '',
    title: '',
    desc: '',
    sellNumber: 1,
    favorRate: 2,
    price: 3
  }


class UIGoods{
    get totalPrice(){
        return this.choose*this.data.price;
    }

    get isChoose(){
        return this.choose>0;
    }

    constructor(g){
        // this.data = g;
        Object.defineProperty(this,'data',{
            value:g,
            writable: false,
            enumerable: true,
            configurable: false
        });
        var internalChooseValue = 0;
        Object.defineProperty(this,'choose',{
            configurable:false,
            get:function(){
                return 0
            },
            set:function(val){
                if(typeof val !== 'number'){
                    throw new error('choose must be a number');
                }
                var temp = parseInt(val);  //~~val 位运算
                if(temp == val){
                    throw new error('choose must be an integer');
                }
                if(val < 0){
                    throw new error('choose must be greater than 0');
                }
                internalChooseValue = val;
            },
        })
        Objecct.defineProperty(this,'totalPrice',{
            get:function(){
                this.choose*this.data.price;
        }});
        this.a = 1;
        Object.seal(this);
    }
    }

Object.freeze(UIGoods.prototype);

var g = new UIGoods(aGoods);
// g.data = 'abc'; //报错
console.log(g.data);




var Object = {
    a: 1,
    b: 2,
    c: 3
}

//设置属性描述符
Object.defineProperty(Obj, 'a', {
    value: 1,
    writable: false, //不可重写
    enumerable: true, //可枚举
    configurable: true, //可配置 可以修改描述符本身
    get:function(){}, //读取器 和下面统称 getter&setter
    set:function(val){
        throw new Error('a is read only,cannot be modified');
    } //设置器
})

Obj.a = 2+3; //set(2+3) 传递值给val参数
console.log(Obj.a); //console.log(get())

//获取属性描述符
var desc = Object.getOwnPropertyDescriptor(Obj, 'a');
console.log(desc);