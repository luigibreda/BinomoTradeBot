import { Registry } from "../../templates/MirrorPage/components/Registry";

export function HistoryList({ history }: any) {
  return (
    <div
      className={`flex rounded-xl flex-col bg-dark-900 gap-3 h-full overflow-y-auto py-2`}
    >
      {history.map((item: any) => (
        <Registry key={item._id} item={item} />
      ))}
    </div>
  );
}
