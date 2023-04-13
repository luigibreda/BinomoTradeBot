import { ExtensionWrapper } from "../../components/ExtensionWrapper";

export const Loading = () => {
  return (
    <ExtensionWrapper header={false}>
      <div className="flex bd-red-200 items-center justify-center h-full">
        <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-yellow-400"></div>
      </div>
    </ExtensionWrapper>
  );
};
