import { api, CustomAxiosRequestConfig } from "../lib/axiosInstance";

export const simpleLoginApi = (
  data: { results: number; nat: string },
  showToast = false
) => {
  const config: CustomAxiosRequestConfig = {
    successMessage: "خوش آمدید",
    showToast, // true یا false
  };

  return api.get(`/?results=${data.results}&nat=${data.nat}`, config);
};