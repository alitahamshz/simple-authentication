/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth } = NextAuth({
    trustHost: true, // ✅ این خط را اضافه کن
  providers: [
    Credentials({
      credentials: {
        verification_code: { label: "Verification Code", type: "text" },
        user_id: { label: "User ID", type: "text" },
        device: { label: "Device", type: "text" },
      },
      authorize: async (credentials) => {
        console.log("Raw credentials:", credentials);

        const user_id = Number(credentials.user_id);

        // اگر user_id عدد نبود، اعتبارسنجی رد میشه
        if (isNaN(user_id)) {
          console.error("Invalid user_id, must be a number");
          return null;
        }

        try {
          const res = await fetch(
            "https://app.bitimeapp.com/api/otp/verification",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                verification_code: credentials.verification_code,
                user_id: user_id,
                device: credentials.device,
              }),
            }
          );

          if (!res.ok) {
            console.error("Auth request failed", res.statusText);
            return null;
          }

          const user = await res.json();
          console.log("Authorized user:", user);

          return user;
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ user, token }: { user: any; token: any }) => {
      if (user) {
        token.accessToken = user?.data?.result.token;
        token.role = user?.data?.result.user?.role
        token.id = user?.data?.result.user?.id
        token.first_name = user?.data?.result.user?.first_name
        token.last_name = user?.data?.result.user?.last_name
      }
      return token;
    },
    session: async ({ session, token }: { session: any; token: any }) => {
      session.accessToken = token.accessToken;
      session.user.role = token?.role
      session.user.id = token?.id
      session.user.first_name = token?.first_name
      session.user.last_name = token?.last_name
      
      return session;
    },
    // authorized : async ({
    //   auth,
    //   request
    // } : {auth:any,request: any}) => {
    //   const isAuthrized = !!auth?.accessToken
    //   const is
    //   return true
    // }
  },
});
