// // hooks/useApi.tsx
// 'use client';
// import { useCallback } from 'react';
// import { http } from '@/lib/axiosApi';

// export function useApi() {
//     const request = useCallback(
//         async<T>(method: keyof typeof http, url: string, payload ?: any): Promise<T> => {
//         try {
//             // @ts-ignore
//             const res = await http[method]<T>(url, payload);
//             return res.data;
//         } catch (err) {
//             // خطا قبلاً در interceptor نشان داده شده
//             throw err;
//         }
//     },
//     []
//   );
//     return { request };
// }
// function async<T>(method: any, keyof: any, arg2: string, url: any, string: any, arg5: any): any {
//     throw new Error('Function not implemented.');
// }

