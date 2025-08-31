import { api } from "../lib/axiosInstance";

export const simpleLoginApi = (data) =>
  api.get(
    `/?results=${data.results}&nat=${data.nat}`,
    {},
    {
      successMessage: "خوش آمدید",
    }
  );
