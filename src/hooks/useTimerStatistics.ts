import calcStatistics from "@/lib/calcStatistics";
import { defaultTimerStatistics } from "@/lib/const/defaultTimerStatistics";
import { useTimerStore } from "@/store/timerStore";
import { useEffect, useState } from "react";

export function useTimerStatistics() {
  const { scramble, selectedCube } = useTimerStore();
  const [statistics, setStatistics] = useState({
    global: defaultTimerStatistics,
    session: defaultTimerStatistics,
    cubeSession: defaultTimerStatistics,
  });

  useEffect(() => {
    if (selectedCube) {
      const { global, session, cubeSession } = calcStatistics({
        cube: selectedCube,
      });
      setStatistics({ global, session, cubeSession });
    }
  }, [scramble, selectedCube]);

  return {
    global: statistics.global,
    session: statistics.session,
    cubeSession: statistics.cubeSession,
  };
}
