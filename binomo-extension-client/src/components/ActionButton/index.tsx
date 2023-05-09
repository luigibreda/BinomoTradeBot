type ActionButtonProps = {
  onClick?: () => void;
  color: string;
  placeholder: string;
  disabled?: boolean;
  outlined?: boolean;
};

export const ActionButton = ({
  onClick,
  color,
  placeholder,
  disabled = false,
  outlined = false,
}: ActionButtonProps) => {
  return (
    <div>
      <button
        onClick={onClick}
        disabled={disabled}
        className={`bg-${color} text-black text-sm disabled:opacity-60 font-bold w-full p-3 rounded-xl hover:bg-${color} transition-all active:scale-95  ${
          outlined && `border-2 border-${color} text-${color} bg-transparent`
        } `}
      >
        {placeholder}
      </button>
    </div>
  );
};
