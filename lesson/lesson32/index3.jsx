function App() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  let result = count * 2;

  return (
    <div>
      <button onClick={handleClick}>+1</button>
      <p>{count}</p>
      <p>{result}</p>
    </div>
  );
}
