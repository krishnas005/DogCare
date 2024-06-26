import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import { GlobalProvider } from "@/context";

export const metadata: Metadata = {
  title: "DogCare",
  description: "Your go to place for DogCare",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <body>
        <GlobalProvider>
        <Navbar />
        {children}
        </GlobalProvider>
      </body>
    </html>
  );
}
