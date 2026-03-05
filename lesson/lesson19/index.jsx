import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p onClick={() => setCount((c) => c + 1)}>{count}</p>;
    </div>
  );
}
