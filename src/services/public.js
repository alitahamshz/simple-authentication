// import { fetchClient } from "@/lib/fetchInstance";
import { api } from "../lib/axiosInstance";

export const simpleLoginApi = (data) =>
  api.get(
    `https://randomuser.me/api/?results=${data.results}&nat=${data.nat}`,
    {},
    {
      successMessage: "خوش آمدید",
    }
  );
