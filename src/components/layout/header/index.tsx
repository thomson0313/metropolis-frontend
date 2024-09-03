'use client'

import { useWallet } from '@/core/hooks/use-wallet'

import { useConnectWalletModalState } from '../connect-wallet'
import { UserWallets } from './user-wallets'
import { Button } from "@/components/ui/button";
import Link from "next/link";

const NAV_LINKS = [
  {
    label: 'Token Tracker',
    href: '',
  },
  {
    label: 'Profile',
    href: '/create',
  },
  {
    label: 'Launch Token',
    href: '/create',
  },
  {
    label: 'Mission',
    href: '/create',
  },
]

export function Header() {
  const { isConnected } = useWallet()

  const onOpenWalletConnectChange = useConnectWalletModalState(
    (s) => s.onOpenChange,
  )

  return (
    <header className="border-b bg-bg-white-0">
      <div className="max-w-content flex items-center gap-2 py-5 md:gap-6">
        <div className="flex items-center gap-2">
          {/*LOGO*/}
        </div>

        <nav>
          <ul className="hidden items-center gap-2 md:flex">
            {NAV_LINKS.map((item, index) => (
              <li key={index}>
                <Link href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ms-auto flex items-center gap-2">
          {isConnected ? (
            <div className="flex gap-2">
              <UserWallets />
            </div>
          ) : (
            <>
              <Button
                variant="secondary"
                onClick={() => onOpenWalletConnectChange(true)}
              >
                Connect wallet
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
