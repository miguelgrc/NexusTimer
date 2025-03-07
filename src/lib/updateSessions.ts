import { Cube } from "@/interfaces/Cube";
import { Solve } from "@/interfaces/Solve";
import updateCubeOnList from "./updateCubeOnList";

export default function updateSessions(selectedCube: Cube) {
  const sessionSolves: Solve[] = selectedCube.solves.session;
  const allSolves: Solve[] = selectedCube.solves.all;
  const combinedSolves = [...allSolves, ...sessionSolves];
  selectedCube.solves.all = combinedSolves;
  selectedCube.solves.session = [];

  return updateCubeOnList(selectedCube);
}
