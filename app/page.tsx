"use client";

import Image from "next/image";
import Link from "next/link";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { WalletModal } from "./components/WalletModal";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 5,
      staleTime: 30 * 1000,
    },
  },
});

export default function Home() {
  const scrollToTop = () => {
    const distance =
      document.documentElement.scrollTop || document.body.scrollTop;
    if (distance > 0) {
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, distance - distance / 8);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <QueryClientProvider client={client}>
        {/* header */}
        <Header />
        {/* main */}
        <Main />
        {/* wallet modal */}
        <WalletModal />
      </QueryClientProvider>
    </main>
  );
}
