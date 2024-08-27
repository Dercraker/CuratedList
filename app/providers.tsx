"use client";

import { Toaster } from "@/components/ui/sonner";
import { DialogRenderer } from "@/features/dialogs-provider/DialogProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import type { PropsWithChildren } from "react";

const queryClient = new QueryClient();

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          <Toaster />
          <DialogRenderer />
          {children}
        </QueryClientProvider>
      </SessionProvider>
    </ThemeProvider>
  );
};
