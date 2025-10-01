import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";


export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar />
            <main className="min-h-dvh container mx-auto mt-10 px-5 md:px-8">{children}</main>
            <Footer />
        </>
    );
}
