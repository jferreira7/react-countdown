import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
  // Com o recarregamento do componente o valor do useRef não será perdido, igual a uma variável normal
  const timer = useRef();
  const dialog = useRef();

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

  console.log(timeRemaining);

  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    dialog.current.open();
  }

  const handleStop = () => {
    clearInterval(timer.current);
    dialog.current.open();
  };
  const handleStart = () => {
    timer.current = setInterval(() => setTimeRemaining((prevValue) => prevValue - 10), 10);
  };

  const handleReset = () => setTimeRemaining(targetTime * 1000);

  return (
    <>
      <ResultModal ref={dialog} targetTime={targetTime} remainingTime={timeRemaining} onReset={handleReset} />
      <section className="challenge">
        <h2>{title}</h2>
        {timerIsActive && <p>You lost!</p>}
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>{timerIsActive ? "Stop" : "Start"} Challenge</button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>{timerIsActive ? "Timer is running..." : "Timer inactive"}</p>
      </section>
    </>
  );
}
