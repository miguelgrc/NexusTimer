import { Cube } from "@/interfaces/Cube";
import { Solve } from "@/interfaces/Solve";
import { TimerStatus } from "@/interfaces/TimerStatus";
import { cubeCollection } from "@/lib/cubeCollection";
import genScramble from "@/lib/timer/genScramble";
import { create } from "zustand";

type TimerStore = {
  cubes: Cube[] | null;
  selectedCube: Cube | null;
  scramble: string | null;
  event: string;
  lastSolve: Solve | null;
  solvingTime: number;
  isSolving: boolean;
  timerStatus: TimerStatus;
  setNewScramble: (cube: Cube | null) => void;
  setCubes: (cubes: Cube[]) => void;
  setSelectedCube: (cube: Cube | null) => void;
  setLastSolve: (solve: Solve | null) => void;
  setSolvingTime: (newTime: number) => void;
  setIsSolving: (isSolving: boolean) => void;
  setTimerStatus: (timerStatus: TimerStatus) => void;
};

export const useTimerStore = create<TimerStore>((set) => ({
  selectedCube: null,
  scramble: null,
  cubes: null,
  event: "333",
  lastSolve: null,
  solvingTime: 0,
  isSolving: false,
  timerStatus: "IDLE",
  setNewScramble: (cube: Cube | null) => {
    set({ scramble: cube ? genScramble(cube.category) : null });
  },
  setCubes: (cubes: Cube[]) => {
    set({ cubes });
  },
  setSelectedCube: (cube: Cube | null) => {
    set((state: any) => {
      if (!cube) {
        return {
          ...state,
          event: null,
          selectedCube: null,
        };
      }

      const selectedEvent = cubeCollection.find(
        (item) => item.name === cube.category
      );
      return {
        ...state,
        event: selectedEvent?.event,
        selectedCube: cube,
      };
    });
  },
  setLastSolve: (solve: Solve | null) => {
    set({ lastSolve: solve });
  },
  setSolvingTime: (newTime: number) => {
    set({ solvingTime: newTime });
  },
  setIsSolving: (isSolving: boolean) => {
    set({ isSolving: isSolving });
  },
  setTimerStatus: (timerStatus: TimerStatus) => {
    set({ timerStatus });
  },
}));
