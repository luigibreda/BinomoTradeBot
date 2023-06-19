type ActionButtonProps = {
  onClick?: () => void;
  color: string;
  placeholder: string;
  disabled?: boolean;
  outlined?: boolean;
  icon?: React.ReactNode;
};

export const ActionButton = ({
  color,
  placeholder,
  disabled = false,
  outlined = false,
  icon,
  onClick,
}: ActionButtonProps) => {
  return (
    <div>
      <button
        onClick={onClick}
        disabled={disabled}
        className={`bg-${color} text-black flex items-center justify-center gap-1 text-sm disabled:opacity-60 font-bold w-full p-3 rounded-xl hover:bg-${color} transition-all active:scale-95  ${
          outlined && `border-2 border-${color} text-${color} bg-transparent`
        } `}
      >
        {icon && icon}
        {placeholder}
      </button>
    </div>
  );
};
