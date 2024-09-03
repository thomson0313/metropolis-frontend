import React from "react";
import type { Metadata } from "next";
import { headers } from 'next/headers'
import { cookieToInitialState } from 'wagmi'
import { Inter } from "next/font/google";
import Providers from "@/components/layout/providers";
import "./globals.css";
import '@rainbow-me/rainbowkit/styles.css';
import { Header } from "@/components/layout/header";
import { wagmiConfig } from "@/core/lib/wagmi";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Memetropolis Frontend",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(
    wagmiConfig,
    headers().get('cookie'),
  )

  return (
    <html lang="en">
      <body className={inter.className}>
      <Providers initialState={initialState}>
        <Header />
        <main className="flex min-h-screen flex-col items-center">
          {children}
        </main>
      </Providers>
      </body>
    </html>
  );
}
