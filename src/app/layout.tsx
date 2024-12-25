import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast" 
import ReactQueryProvider from "@/store/query-client";
import Providers from "@/store/provider";

export const metadata: Metadata = {
    title: "CFI-Admin Panel",
    description: "Created by CFI Web Team",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`w-full h-screen flex  bg-[#F1F1F1]`}>
                <Providers>
                    <ReactQueryProvider>
                        {children}
                        <Toaster />
                    </ReactQueryProvider>
                </Providers>
                {/* <SpeedInsights />
                <Analytics /> */}
            </body>
        </html>
    );
}
