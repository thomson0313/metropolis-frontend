'use client'

import * as TabsPrimitive from '@radix-ui/react-tabs'
import { RiArrowLeftSLine, RiWalletLine } from '@remixicon/react'
import { ReactElement, useMemo, useState } from 'react'
import { create } from 'zustand'

import { Collapsible } from '@/components/ui/collapsible'
import { Web3Wallet } from '@/core/types/web3'

import { ResponsiveDialog } from '../../ui/responsive-dialog'
import { useConnectWallet } from './use-connect-wallet-modal'
import { Button } from "@/components/ui/button";
import { WalletOption } from "@/components/layout/connect-wallet/wallet-option";

type State = {
  open: boolean
  desiredChain?: number
}
type Actions = {
  onOpenChange: (open: boolean) => void
  setDesiredChain: (chainId?: number) => void
}

export const useConnectWalletModalState = create<State & Actions>((set) => ({
  open: false,
  desiredChain: undefined,
  onOpenChange: (open) => set(() => ({ open })),
  setDesiredChain: (chainId) => set(() => ({ desiredChain: chainId })),
}))

type ConnectorTab = {
  provider: Web3Wallet.Providers
  icon: ReactElement
  label: string
}

const CONNECTORS_TABS: ConnectorTab[] = [
  {
    provider: 'evm',
    icon: (
      <RiArrowLeftSLine
        className="size-6"
      />
    ),
    label: 'EVM Wallet',
  },
  {
    provider: 'solana',
    icon: (
      <RiArrowLeftSLine
        className="size-6"
      />
    ),
    label: 'Solana Wallet',
  },
]

export function ConnectWalletModal() {
  const { open, onOpenChange } = useConnectWalletModalState()
  const [view, setView] = useState<'connect' | 'compare'>('connect')

  return (
    <ResponsiveDialog.Root open={open} onOpenChange={onOpenChange}>
      <ResponsiveDialog.Content className="w-full md:w-[492px] md:rounded-xl">
        {
          {
            connect: (
              <ConnectWallet onCompareWallets={() => setView('compare')} />
            ),
            compare: <ConnectWallet onCompareWallets={() => setView('connect')} />,
          }[view]
        }
      </ResponsiveDialog.Content>
    </ResponsiveDialog.Root>
  )
}

function ConnectWallet({ onCompareWallets }: { onCompareWallets: () => void }) {
  const {
    activeTab,
    setActiveTab,
    connectingWith,
    connectors,
    handleConnectWallet,
  } = useConnectWallet()

  const connectorTabs = useMemo<
    (ConnectorTab & { connectors: Web3Wallet.Connector[] })[]
  >(() => {
    let filteredConnectors = CONNECTORS_TABS

    return filteredConnectors.map((c) => ({
      ...c,
      connectors:
        connectors.find((con) => con.provider === c.provider)?.connectors || [],
    }))
  }, [connectors])

  return (
    <div className="overflow-auto">
      <ResponsiveDialog.Header className="space-y-1 border-b-0">
        <ResponsiveDialog.Title>
          <span>Connect your wallet</span>
        </ResponsiveDialog.Title>
      </ResponsiveDialog.Header>
      <main>
        <TabsPrimitive.Root
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as Web3Wallet.Providers)}
        >
          <TabsPrimitive.List className="flex items-center gap-2 border-b-2 sm:gap-6 sm:px-5 [&>*]:flex-1">
            {connectorTabs.map(({ provider, icon, label }) => (
              <TabsPrimitive.Trigger
                key={`trigger_${provider}`}
                value={provider}
                className="group -mb-0.5 flex h-[52px] items-center justify-center gap-1.5 border-b-2 border-transparent px-3 text-center transition-all enabled:hover:border-primary-base enabled:hover:text-text-main-900 enabled:focus-visible:border-primary-base data-[state=active]:border-primary-base data-[state=inactive]:text-text-disabled-300"
              >
                {icon}
                {label}
              </TabsPrimitive.Trigger>
            ))}
          </TabsPrimitive.List>

          {connectorTabs.map(({ provider, connectors }) => (
            <TabsPrimitive.Content
              key={`content_${provider}`}
              value={provider}
              className="space-y-6 px-5 py-6"
            >
              <WalletConnectorsList
                connectors={connectors}
                connectingWith={connectingWith}
                onConnectWallet={handleConnectWallet}
                provider={provider}
              />
            </TabsPrimitive.Content>
          ))}
        </TabsPrimitive.Root>

        <div className="flex flex-col gap-3 px-5 py-4 text-center">
          <Button
            className="border-bg-weak-100 bg-bg-weak-100 hover:bg-bg-soft-200"
            onClick={onCompareWallets}
          >
            {`I don't have a wallet`}
            <RiWalletLine />
          </Button>
        </div>
      </main>
    </div>
  )
}

function WalletConnectorsList({
  connectors,
  connectingWith,
  provider = 'evm',
  onConnectWallet,
}: {
  connectors: Web3Wallet.Connector[]
  connectingWith?: string
  provider?: Web3Wallet.Providers
  onConnectWallet: (connectorId: string, provider: Web3Wallet.Providers) => void
}) {
  const splitConnectors = useMemo(() => {
    return [connectors.slice(0, 4), connectors.slice(4)]
  }, [connectors])

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        {splitConnectors[0].map((connector) => (
          <WalletOption
            key={connector.id}
            connector={connector}
            isConnecting={connector.id === connectingWith}
            provider={provider}
            onConnectWallet={onConnectWallet}
          />
        ))}
      </div>

      {splitConnectors[1].length > 0 && (
        <Collapsible.Root>
          <Collapsible.Trigger />
          <Collapsible.Content className="mt-6 space-y-2">
            {splitConnectors[1].map((connector) => (
              <WalletOption
                key={connector.id}
                connector={connector}
                isConnecting={connector.id === connectingWith}
                provider={provider}
                onConnectWallet={onConnectWallet}
              />
            ))}
          </Collapsible.Content>
        </Collapsible.Root>
      )}
    </div>
  )
}
