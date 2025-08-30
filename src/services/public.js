// import { fetchClient } from "@/lib/fetchInstance";
import { api } from "../lib/axiosInstance";
// import { http } from "../lib/axiosApi";
import { customServerFetch } from "@/lib/fetch/serverCustomFetch";
import { useCustomQuery } from "@/lib/fetch/useCustomQuery";
import { useCustomMutation } from "@/lib/fetch/useCustomMutation";

export const getPosts = () => api.get("/posts");
export const postPosts = (data) =>
  api.post("/posts", data, { successMessage: "پست شما با موفقیت ایجاد شد!" });
export const loginApi = (data) =>
  api.post("/auth/login", data, { successMessage: "خوش آمدید" });
export const otpPhone = (data) =>
  api.post("otp/authentication", data, {
    successMessage: "کد تایید با موفقیت برای شما ارسال شد",
  });

  export const simpleLoginApi = (data) =>
  api.post(`https://randomuser.me/api/?results=${data.results}&nat=${data.us}`, data, {
    successMessage: "کد تایید با موفقیت برای شما ارسال شد",
  });
// استفاده از فچ سروری
export const getUserInfoApi = async () =>
  await customServerFetch({
    url: `user/me`,
    method: "GET",
  });
//استفاده از react-query مثال
export const useUserInfoApi = (params) =>
  useCustomQuery("user/me", "user-info", params, {
    staleTime: 10000,
    // cacheTime: 10000,
  });
export const useLoginApi = (params) =>
  useCustomQuery("https://randomuser.me/api/", "user-info", params, {
    staleTime: 10000,
    // cacheTime: 10000,
  });
  //تست useMutation
export const useCreatePostApi = (id) =>
  useCustomMutation(`https://jsonplaceholder.typicode.com/posts`, "POST",{id : id,num:4});