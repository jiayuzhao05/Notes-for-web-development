function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setTimeout(() => {
      console.log(count);
    }, 3000);
  }

  useEffect(() => {
    const timer = setInterval(() => setCount((prev) => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <div>{count}</div>
      <button onClick={handleClick}>log</button>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}

//过期闭包
//timer可能一直是 0 没有同步
//useRef
