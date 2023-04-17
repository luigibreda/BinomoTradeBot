import { useQuery } from "@tanstack/react-query";
import { entryServices } from "../../../services/http/entry";

export const useHistory = () =>
  useQuery({
    queryKey: ["history"],
    queryFn: entryServices.getEntrys,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    // 1 minute
    staleTime: 40000,
  });
