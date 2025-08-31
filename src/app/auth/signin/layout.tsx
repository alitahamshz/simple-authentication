import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "صفحه ورود",
  description: "Admin Dashboard",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
