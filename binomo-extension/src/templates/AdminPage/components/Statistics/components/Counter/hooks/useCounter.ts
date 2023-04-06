import { useEffect } from "react";
import { useExtensionStore } from "../../../../../../../store/extensionStore";
import moment from "moment";

export const useCounter = () => {
  const secondsPassed = useExtensionStore((state) => state.secondsPassed);
  const startCounter = useExtensionStore((state) => state.startCount);
  const startedMirroring = useExtensionStore((state) => state.startedMirroring);
  const resetCounter = useExtensionStore((state) => state.resetCounter);

  const elapsedTime = moment.utc(secondsPassed * 1000).format("HH:mm:ss");

  useEffect(() => {
    if (startedMirroring) {
      startCounter();
    } else {
      resetCounter();
    }
  }, [startedMirroring]);

  return { elapsedTime };
};
