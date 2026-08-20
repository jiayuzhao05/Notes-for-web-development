class App extends React.component {
    handleClick() {
        this.setState({count:this.state.count+1});
    }
    render() {
        return <button onClick = {this.handleClick.bind(this)}>+</button>;
    }
}

//function App() {
//  const [count, setCount]= useState(0);
//  return <button onClick = {()=> setCount(count+1)}>+</button>
//}