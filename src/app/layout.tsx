// import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/component/theme/theme-provider";
import { Toaster } from "react-hot-toast";
import { RouteLoader } from "@/component/RouteLoader";
import Script from "next/script";
import localFont from "next/font/local";

import { UserProvider } from "@/context/UserContext";
const yekanBakh = localFont({
  src: [
    {
      path: "../../public/fonts/yekanBakh/Yekan-Bakh-FaNum-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/yekanBakh/Yekan-Bakh-FaNum-Medium.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/yekanBakh/Yekan-Bakh-FaNum-Bold.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-my-local",
  display: "swap",
});
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      suppressHydrationWarning
      className={`${yekanBakh.variable} font-main`}
    >
      <body
        className={`font-main antialiased h-full
        transition-colors duration-500 text-black dark:bg-zinc-900 dark:text-white
        `}
      >
        <Script id="init-color-theme" strategy="beforeInteractive">
          {`try {
              const t = localStorage.getItem('color-theme') || 'rose';
              document.documentElement.setAttribute('data-theme', t);
            } catch(e) {}`}
        </Script>
        <RouteLoader />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="relative mx-auto max-h-screen overflow-x-hidden bg-white">
            <UserProvider>{children}</UserProvider>
          </div>
          <Toaster position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
