import { useEffect, useState } from "react";

export function useTimer(initialValue: number = 5) {
  const [timer, setTimer] = useState(initialValue);
  const [timerIsDone, setTimerIsDone] = useState<boolean>(false);

  useEffect(() => {
    let interval: number;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setTimerIsDone(true);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  return { timer, timerIsDone };
}
