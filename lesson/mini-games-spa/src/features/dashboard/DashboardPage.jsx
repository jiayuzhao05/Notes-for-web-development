import { useEffect, useRef, useState } from "react";
import { useScore } from "../score/useScore";
import Child from "./Child";
import Child2 from "./Child2";

export function DashboardPage() {
  const { gamesLeft, isLoadingInitialScore, resetGamesLeft } = useScore();
  const hasShownCongratulationsRef = useRef(false);

  const [name, setName] = useState("jack");
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(count + 1);
    setName(`jack${count}`);
  };

  useEffect(() => {
    if (
      isLoadingInitialScore ||
      gamesLeft !== 0 ||
      hasShownCongratulationsRef.current
    ) {
      return;
    }

    hasShownCongratulationsRef.current = true;
    window.alert("Congratulations!");
    resetGamesLeft();
  }, [gamesLeft, isLoadingInitialScore, resetGamesLeft]);

  const displayedGamesLeft =
    isLoadingInitialScore || gamesLeft === null ? "..." : gamesLeft;

  return (
    <section className="dashboard-page">
      <p className="dashboard-title">
        Please choose an option from the sidebar.
      </p>
      <p>
        Games left to win: {displayedGamesLeft}{" "}
        <button className="reset-button" type="button" onClick={resetGamesLeft}>
          (reset)
        </button>
      </p>
      <h2>Child Component</h2>
      <button type="button" onClick={handleClick}>
        add+1 {count}
      </button>
      <Child name={name} />
      <Child2 name={name} />
    </section>
  );
}
