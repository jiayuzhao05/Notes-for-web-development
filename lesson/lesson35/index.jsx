function CounterCom(props) {
  const { count, setCount } = useContext(CounterContext);
  return (
    <div>
      <h1>Countername</h1>
      <p>{props.count}</p>
    </div>
  );
}

const CounterContext = createContext();

function funcFather() {
  const [count, setCount] = useState(0);
  return (
    <Context.Provider value={count}>
      <div>
        <CounterCom />
      </div>
    </Context.Provider>
  );
}

export default funcFather;
