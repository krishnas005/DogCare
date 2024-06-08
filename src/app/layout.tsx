import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Head from "next/head";

export const metadata: Metadata = {
  title: "DogCare",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>DogCare</title>
        <meta name="description" content="Your go-to platform for dog care" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
