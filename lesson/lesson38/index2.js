function A() {
  const inputRef = useRef(null);
  const [countState, setCountState] = useState(0);
  const countRef = useRef(0);
  countRef.current++;

  const handleFocus = () => {
    inputRef.current.focus();
    setCountState(countState + 1);
  };

  useEffect(() => {
    const controller = new Abortcontroller();

    async function loadUserId() {
      try {
        const res = await fetch(`api/user/${userID}`, {
          signal: controller.signal,
        });
        const data = await res.json();
        setUser(data);
      } catch (err) {}
    }
    loadUserId();

    return () => {
      controller.abort();
    };
  }, [useId]);

  return (
    <>
      <input ref={inputRef}></input>
      <button onClick={handleFocus}></button>
      <div>{countState}</div>
      <div>{countRef.current}</div>
    </>
  );
}

//useRef vs useLayoutEffect useReducer 自定义hooks
//网络请求用到useRef
//AbortController如果不用 会造成静态竞争 用户快递切换userId 有一次请求速度慢 第二次请求速度快 可能会先得到第二个数据 再得到第一个数据 第一个数据会把第二个数据覆盖
