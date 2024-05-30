import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import AppWalletProvider from "./components/AppWalletProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sonic Odyssey",
  description:
    "Description: Sonic testnet is live now! Join the Sonic Odyssey to earn potential airdrops!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#01030C]">
        <AppWalletProvider>{children}</AppWalletProvider>
      </body>
    </html>
  );
}
