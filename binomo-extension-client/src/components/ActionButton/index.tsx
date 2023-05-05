type ActionButtonProps = {
  onClick?: () => void;
  color: string;
  placeholder: string;
  disabled?: boolean;
};

export const ActionButton = ({
  onClick,
  color,
  placeholder,
  disabled = false,
}: ActionButtonProps) => {
  return (
    <div>
      <button
        onClick={onClick}
        disabled={disabled}
        className={`bg-${color}-500 text-black disabled:opacity-60 font-bold w-full p-2 rounded-md hover:bg-${color}-600 transition-all active:scale-95`}
      >
        {placeholder}
      </button>
    </div>
  );
};
