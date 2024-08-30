'use client'

import { WalletMultiButton } from '@/components/dynamic/WalletAdapters'
import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'

export const NavigationBar = () => {
  const { user } = useAuth()
  return (
    <div className='flex justify-between items-center w-screen px-16 py-5'>
      <Link href={'/'}>
        <div className='flex-1'>
          <p className='text-4xl'>😉</p>
        </div>
      </Link>

      <WalletMultiButton />
    </div>
  )
}
