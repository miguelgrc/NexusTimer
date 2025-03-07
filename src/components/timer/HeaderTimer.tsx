import Reload from "@/icons/Reload";
import Select from "../Select";
import Settings from "@/icons/Settings";
import { useSettingsModalStore } from "@/store/SettingsModalStore";
import { useTimerStore } from "@/store/timerStore";
import { InteractiveIcon } from "./InteractiveIcon";
import { ScrambleZone } from "./ScrambleZone";
import { useTimerStatistics } from "@/hooks/useTimerStatistics";
import translation from "@/translations/global.json";
import Link from "next/link";

export default function HeaderTimer() {
  const { selectedCube, setNewScramble, isSolving, timerStatus } =
    useTimerStore();
  const { setSettingsOpen, settingsOpen, lang, settings } =
    useSettingsModalStore();
  const { global } = useTimerStatistics();
  const { lastSolve } = useTimerStore();

  if (isSolving || timerStatus !== "IDLE") return null;
  return (
    <div className="flex flex-col items-center justify-center gap-5 p-4">
      <div className="flex items-center gap-3">
        <Link
          href={{
            pathname: "/",
            hash: `${translation.settings["settings"][lang]}`,
          }}
        >
          <InteractiveIcon
            icon={<Settings />}
            handleClick={() => {
              setSettingsOpen(!settingsOpen);
            }}
          />
        </Link>

        <Select />
        <InteractiveIcon
          icon={<Reload />}
          handleClick={() => {
            if (selectedCube) {
              setNewScramble(selectedCube);
            }
          }}
        />
      </div>
      <ScrambleZone />
      {lastSolve != null &&
      lastSolve.time <= global.best &&
      settings.alerts.bestTime.status ? (
        <div id="touch" className="mt-10 text-center">
          <p>{translation.timer["congrats"][lang]}</p>
          <p>{translation.timer["personal_best"][lang]}</p>
        </div>
      ) : null}
    </div>
  );
}
