import { HTMLAttributes, InputHTMLAttributes } from "react";

type InputProps = {
  register: any;
  icon?: React.ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = (props: InputProps) => {
  return (
    <div className="relative">
      {props.icon && (
        <div className="absolute left-4 top-4 text-neutral-400">
          {props.icon}
        </div>
      )}
      <input
        type="text"
        {...props}
        {...props.register(props.id, { required: true })}
        className="w-full placeholder-neutral-400 rounded-xl bg-dark-900 text-md py-3 px-12
          placeholder:text-center focus:outline-none focus:ring-2 focus:ring-primary
          focus:bg-dark-600 transition-all
        "
      />
    </div>
  );
};
