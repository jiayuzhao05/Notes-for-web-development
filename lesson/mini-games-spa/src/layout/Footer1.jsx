import { useState } from "react";
import Hello from "./Hello";

export function Footer(props) {
  //return <footer className="app-footer" />;
  console.log(props);
  const [count, setCount] = useState(10);
  const [count1, setCount1] = useState(10);
  const hasHello = true;
  const array = [1, 2, 3];

  const users = [
    {
      name: "张三",
      age: "12",
    },
    {
      name: "李四",
      age: "15",
    },
    {
      name: "王五",
      age: "32",
    },
  ];

  const handleClick = () => {
    //setCount(count + 1);
    //setCount({(prevCount) => prevCount + 1},
    //console.log(prevCount)); //不依赖于外部快照
    setCount(function (prevCount) {
      console.log(prevCount); //上一次状态
      return prevCount + 1;
    });
  };
  return (
    <footer className="app-footer">
      <button onClick={handleClick}>{count}</button>
      {props.name} //{name}
      {hasHello && Hello()}
      {array.map((item) => (
        <li key={item}>{item}</li>
      ))}
      {}
    </footer>
  );
}

//{}表示运算
//const {name} = props 对象分解 const {a,b,c} = props
//useEffect() 副作用:非正常输入输出 纯组件不会改变状态 除了渲染UI之外的操作 网络请求fetch (和函数无关) 定时器 手动修改DOM
//纯函数负责渲染UI

//用useEffect()弄定时器 3000ms后重置 count归零

//_jsx("footer", { className: "app-footer" }, "底部内容 ");

// {
//   props:{
//     className:"app-footer",
//     children:"底部内容"
//   },
//   type:"footer",
//   key:"ref"
// }

<footer className="app-footer">底部内容</footer>;
