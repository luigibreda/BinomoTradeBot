type BagdeProps = {
  color: string;
  placeholder: string | number;
};

export const Bagde = ({ color, placeholder }: BagdeProps) => {
  return (
    <div className="flex">
      <div
        className={`bg-${color}-600 bg-opacity-20 px-3 py-1 rounded-full text-sm border-2 border-${color}-900`}
      >
        <p className={`text-${color}-200`}>{placeholder}</p>
      </div>
    </div>
  );
};
