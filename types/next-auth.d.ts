import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user?: {
      id: number;
      role: string;
      first_name: string;
      last_name: string;
    };
  }
}