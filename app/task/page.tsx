import React from "react";
import { NextPage } from "next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Header } from "../components/Header";

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

const TaskCenter: NextPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between"></main>
  );
};

export default TaskCenter;
