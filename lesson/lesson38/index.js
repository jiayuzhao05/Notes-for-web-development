import { useMemo } from "react";

function App() {
  const [namek, setNamek] = useState("");
  const [keyWord, setKeyWord] = useState("");

  //const result = fn(keyword);
  const result = useMemo(() => {
    console.log("hello");
    return fn(keyWord);
  }, [keyWord]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);
}
