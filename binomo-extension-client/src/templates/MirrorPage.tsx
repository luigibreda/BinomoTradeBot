import { ActionButton } from "../components/ActionButton";

export const MirrorPage = () => {
  return (
    <div>
      <ActionButton
        color="emerald"
        onClick={() => alert("hi")}
        placeholder="opa"
      />
    </div>
  );
};
