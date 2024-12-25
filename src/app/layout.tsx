import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast"
import ReactQueryProvider from "@/store/query-client";
import Providers from "@/store/provider";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
    title: "CFI-Admin Panel",
    description: "Created by CFI Web Team",
};

const inter = Inter({
    subsets: ["latin"],
    weight: ['400', '500', '600', '700']
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={` ${inter.className} w-full h-screen flex  bg-[#F1F1F1]`}>
                <Providers>
                    <ReactQueryProvider>
                        {children}
                        <Toaster />
                    </ReactQueryProvider>
                </Providers>
            </body>
        </html>
    );
}
