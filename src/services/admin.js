import { customServerFetch } from "@/lib/fetch/serverCustomFetch";
import { useCustomQuery } from "@/lib/fetch/useCustomQuery";
import { useCustomMutation } from "@/lib/fetch/useCustomMutation";

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
//تست useMutation
// export const useCreatePostApi = (id) =>
//   useCustomMutation(`https://jsonplaceholder.typicode.com/posts`, "POST", {
//     id: id,
//     num: 4,
//   });

// .......................................................Address-management........................................................
export const useUserAddressesApi = (params,isLoggedIn) =>
  useCustomQuery(`user-location`, "userAddresses", params, {
    staleTime: 0,
    enabled : isLoggedIn
    // cacheTime: 10000,
  });
export const useCreateAddressApi = () =>
  useCustomMutation(`user-location/create`, "POST");
export const useUpdateAddressApi = (id) =>
  useCustomMutation(`user-location/${id}`, "PATCH");

// .....................................................Calculator........................................................
export const useProductsApi = (params) =>
  useCustomQuery(`vendor/product/bitime`, "calculator-products", params, {
    staleTime: 0,
    // cacheTime: 10000,
  });

// .....................................................Order............................................................../api/order

//create order
export const useCreateOrderApi = () => useCustomMutation(`order`, "POST");

//order list
export const useGetOrdersApi = (params,isLoggedIn) =>
  useCustomQuery(`order`, `orders-${params.status}`, params, {
    staleTime: 0,
    enabled:isLoggedIn
    // cacheTime: 10000,
  });

  // cancel order
  export const useDeleteOrderApi = (id) =>
  useCustomMutation(`order/${id}/cancel`, "PATCH");
// ......................................................notifications.....................................................

export const useNotificationsApi = (params,isLoggedIn) =>
  useCustomQuery(`notification`, `notifications`, params, {
    staleTime: 0,
    enabled:isLoggedIn
    // cacheTime: 10000,
  });
// ....................................................Blog-Section.........................................................
export const useGetCategoryApi = (params) =>
  useCustomQuery(`category`, `categories`, params, {
    staleTime: 0,
  });

  export const useCreateCategoryApi = () =>
  useCustomMutation(`admin/category`, "POST");
  export const useUpdateCategoryApi = (id) =>
  useCustomMutation(`admin/category/${id}`, "PUT");
  export const useDeleteCategoryApi = (id) =>
  useCustomMutation(`admin/category/${id}`, "DELETE");

//----------------------------------Tag--------------------------
  //Tag-create
    export const useCreateTagApi = () =>
  useCustomMutation(`admin/tag`, "POST")
    export const useUpdateTagApi = (id) =>
  useCustomMutation(`admin/tag/${id}`, "PATCH")
  //All-tags
  export const useGetTagsApi = (params) =>
  useCustomQuery(`tag`, `tags`, params, {
    staleTime: 0,
  });
  //delete tag
  export const useDeleteTagApi = (id) =>
  useCustomMutation(`admin/tag/${id}`, "DELETE");


  //------------------------------POSTS---------------------------
  // Post create 

  export const useCreatePostApi = () =>
  useCustomMutation(`post`, "POST");

  // Get Posts 
  export const useGetPostsApi = (params) =>
  useCustomQuery(`posts`, `posts`, params, {
    staleTime: 0,
  });