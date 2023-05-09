import moment from "moment";
import { History } from "../hooks/useRegHistory";

export const Registry = ({ item }: { item: History }) => (
  <div className="flex px-4 py-3 items-center justify-between">
    <div className="flex items-center gap-2">
      <p className="font-bold text-sm text-neutral-200">
        {item.count} Entradas
      </p>
      <p className="text-xs text-neutral-500 font-bold">
        Executou por:{" "}
        {moment
          .utc(moment(item.timeEnd).diff(moment(item.timeStart)))
          .format("HH[h] mm[m] ss[s]")}
      </p>
    </div>

    <div>
      <p
        className={`font-bold ${
          item.isProfit ? "text-primary" : "text-red-500"
        }`}
      >
        R$ {item.profit}
      </p>
    </div>
  </div>
);
