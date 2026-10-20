import { render } from "express/lib/response";

function App() {
  if (true) {
    const [num, setNum] = useState(0);
  }
  const countRef = useRef(0);

  let count = 0;
  const handleClick = () => {
    countRef.current++;
    console.log(countRef.current);
  };

  console.log("render");

  useEffect(() => {
    const timer = setInterval(() => {
      console.log("hello world");
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [num]);

  return (
    <div>
      <button onClick={handleClick}>{countRef.current}</button>
      <button onClick={() => setNum(num + 1)}>Num+1</button>
      <div></div>
    </div>
  );
}

//课后实现代码

function App() {
  useEffect(() => {
    const handleResize = () => {
      console.log("1");
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
}
