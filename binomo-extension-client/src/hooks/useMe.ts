import { UserServices } from "../services/http/user";
import { useQuery } from "@tanstack/react-query";

const useMe = () =>
  useQuery({
    queryKey: ["me"],
    queryFn: UserServices.me,
    retry: 4,
    staleTime: 60 * 1000,
  });

export default useMe;
