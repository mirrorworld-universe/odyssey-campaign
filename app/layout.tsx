import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import AppWalletProvider from "./components/AppWalletProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sonic - The First Atomic SVM Chain",
  description:
    "Sonic is a Solana Layer2 built to enable sovereign game economies on Solana, utilizing the HyperGrid horizontal scaling Solana Virtual Machine (SVM) rollup framework.",
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
