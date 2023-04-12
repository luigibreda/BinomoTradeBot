import { HTMLAttributes, InputHTMLAttributes } from "react";

type InputProps = {
  label: string;
  register: any;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = (props: InputProps) => {
  return (
    <div>
      {props.label && (
        <label className="text-sm text-neutral-300">{props.label}</label>
      )}
      <input
        type="text"
        {...props}
        {...props.register(props.id, { required: true })}
        className="w-full placeholder-neutral-400 rounded-md bg-transparent border border-neutral-500 text-sm outline-none p-3"
      />
    </div>
  );
};
