import moment from "moment";
import { History } from "../hooks/useRegHistory";

export const Registry = ({ item }: { item: History }) => (
  <div className="flex gap-2 border p-2 border-neutral-700 rounded-md items-center justify-between">
    <div>
      <p className="text-xs text-neutral-500 font-bold">
        {moment(item.timeStart).format("DD/MM/YYYY")} -{" "}
        {moment(item.timeStart).format("HH:mm")} {"até"}
      </p>

      <p className="text-xs text-neutral-500 font-bold">
        {moment(item.timeEnd).format("DD/MM/YYYY")} -{" "}
        {moment(item.timeEnd).format("HH:mm")}
      </p>
    </div>
    <div>
      <p className="text-xs text-neutral-500 font-bold">
        {item.count} entradas
      </p>
    </div>
    <p>
      <span
        className={`
        font-bold
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
