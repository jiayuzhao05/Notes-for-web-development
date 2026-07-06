react.PureComponent （类似react.memo）浅比较
react.Component
都是类组件基类 差别：父组件更新时 子组件要不要重新render
都有state props render() 生命周期
父组件re-render时 默认走到更新流程

浅比较只比引用（===），不比对象内部字段

如果props是基本类型 比较值 发现变化 purecomponent会re-render
props是对象
const oldProps = { user: { name: "jack" } };
const newProps = { user: { name: "jack2" } };
A.父组件创建新对象
setState({user: { name: "jack2" }})
oldProps.user !== newProps.user（引用不同）触发re-render
B. 改对象内部
this.props.user.name = "jack2"; 
oldProps.user === newProps.user（还是同一个对象）：UI不更新

类组件用PureComponent做性能优化 函数组件里相当于
const Child = React.memo(function Child({name}){
    return <div>{name}</div>
}



const oldProps = {
  user: "name"
};
const newProps = {
  user: "name1"
};



const oldProps = {
  user: {
    name: "jack",
  },
};
const newProps = {
  user: {
    name: "jack2",
  },
};