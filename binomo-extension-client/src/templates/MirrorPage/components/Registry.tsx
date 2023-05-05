import moment from "moment";
import { History } from "../hooks/useRegHistory";

export const Registry = ({ item }: { item: History }) => (
  <div className="flex gap-2 border p-2 border-neutral-700 rounded-md items-center justify-between">
    <div className="min-w-fit">
      <p className="text-xs text-neutral-200 font-thin">
        Executou por: {moment.utc(moment(item.timeEnd).diff(moment(item.timeStart))).format("HH[h] mm[m] ss[s]")}
      </p>
    </div>
    <div>
      <p className="text-xs text-neutral-200">
        {item.count} Entradas
      </p>
    </div>
    <p>
      <span
        className={`
        font-normal
        bg-neutral-800
        border-2
        bg-opacity-70
        border-neutral-700
        p-1 rounded-full
        text-xs
        ${item.isProfit ? "text-emerald-500" : "text-rose-500"}
      `}
      >
        {item.profit} R$
      </span>
    </p>
  </div>
);
