import { UserServices } from "../services/http/user";
import { useQuery } from "@tanstack/react-query";

const useMe = () =>
  useQuery({
    queryKey: ["me"],
    queryFn: UserServices.me,
    retry: false,
  });

export default useMe;
