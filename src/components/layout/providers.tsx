"use client";

import {
  darkTheme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import React, { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

import { State, WagmiProvider } from 'wagmi';
import { wagmiConfig } from "@/core/lib/wagmi";
import { ConnectWalletModal } from "@/components/layout/connect-wallet";
import { BlockchainProvider } from "@/components/blockchain-provider";

const queryClient = new QueryClient();

type ProvidersProps = {
  children: ReactNode
  initialState?: State
}

export default function Providers({ children, initialState }: ProvidersProps) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <BlockchainProvider initialState={initialState}>
          <RainbowKitProvider
            theme={darkTheme({
              accentColor: '#9957FF',
              accentColorForeground: 'white',
              borderRadius: 'small',
              fontStack: 'system',
              overlayBlur: 'small',
            })}
            appInfo={{
              appName: "Memetropolis",
            }}
          >
            {children}
            <ToastContainer />
            <ConnectWalletModal />
          </RainbowKitProvider>
        </BlockchainProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}