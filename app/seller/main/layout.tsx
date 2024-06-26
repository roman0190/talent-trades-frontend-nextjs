import type { Metadata } from "next";
import Link from "next/link";
import AuthChecker from "../components/AuthChecker";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center min-h-screen ">
                <Navbar />
                <main className="w-full flex-1 px-6 py-4">{children}</main>
            </div>
            <Sidebar />
            <AuthChecker />
        </div>
    );
}
