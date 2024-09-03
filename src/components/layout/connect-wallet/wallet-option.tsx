import { useMemo } from 'react'

import { Web3Wallet } from '@/core/types/web3'
import { getLatestWalletId } from '@/core/utils'

type WalletOptionProps = {
  connector: Web3Wallet.Connector
  isConnecting?: boolean
  onConnectWallet: (connectorId: string, provider: Web3Wallet.Providers) => void
  provider: Web3Wallet.Providers
}

export function WalletOption({
  connector,
  isConnecting,
  onConnectWallet,
  provider,
}: WalletOptionProps) {
  const isLatestId = useMemo(
    () => connector.id === getLatestWalletId(provider),
    [connector.id, provider],
  )

  return (
    <button
      type="button"
      onClick={() => onConnectWallet(connector.id, provider)}
      className="flex w-full items-center gap-3 rounded-lg border p-2 text-start transition-all enabled:hover:bg-bg-weak-100 enabled:hover:px-2 enabled:focus-visible:px-2 dark:hover:bg-bg-surface-700"
      aria-label={`Connect with ${connector.name}`}
    >
      <div className="flex-1">
        <span>{connector.name}</span>
        {isConnecting && (
          <span>
            Connecting to {connector.name}...
          </span>
        )}
        {!isConnecting && isLatestId && (
          <span>
            Recent
          </span>
        )}
      </div>
      {isConnecting && (
        <div className="aspect-square size-4 animate-spin rounded-full border-2 border-state-warning border-b-transparent" />
      )}
    </button>
  )
}
