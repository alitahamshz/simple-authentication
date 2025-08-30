
import { Header } from "@/component/main-layout/Header";
import { Footer } from "@/component/main-layout/Footer";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>


    );
}
