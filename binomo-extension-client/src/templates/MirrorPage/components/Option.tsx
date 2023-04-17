type OptionProps = {
  placeholder: string;
  isActive?: boolean;
  onClick?: () => void;
};

export const Option = ({ placeholder, onClick, isActive }: OptionProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex cursor-pointer ${isActive && "bg-cyan-500"} px-2 py-1
          transition-colors duration-200
        rounded-full border-2 border-neutral-700`}
    >
      <p className="opacity-100 text-sm">{placeholder}</p>
    </div>
  );
};
