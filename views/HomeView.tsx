'use client'

import BLinkDemo from '@/components/BlinkDemo'
import { WalletMultiButton } from '@/components/dynamic/WalletAdapters'

const HomeView = () => {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24 bg-black'>
      <WalletMultiButton />

      <div className='max-w-[100vw'>
        <BLinkDemo />
      </div>
    </main>
  )
}

export default HomeView
