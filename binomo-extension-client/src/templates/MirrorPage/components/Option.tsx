type OptionProps = {
  placeholder: string;
  isActive?: boolean;
  onClick?: () => void;
};

export const Option = ({ placeholder, onClick, isActive }: OptionProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex cursor-pointer ${isActive && "bg-neutral-700"} px-2 py-1
          transition-colors duration-200
        rounded-full border-2 bg-opacity-40 border-neutral-800`}
    >
      <p className="opacity-100 text-sm">{placeholder}</p>
    </div>
  );
};
