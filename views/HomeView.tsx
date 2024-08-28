'use client'

import CreateBlinkForm from '@/components/core/profile/CreateBlinkForm'
import { WalletMultiButton } from '@/components/dynamic/WalletAdapters'

const HomeView = () => {
  return (
    <main>
      <div className='flex flex-col gap-10 items-center justify-between p-20'>
        <WalletMultiButton />

        <div className='mt-20'>
          <CreateBlinkForm />
        </div>
      </div>

      {/* <div className='max-w-[100vw'>
        <BLinkDemo />
      </div> */}
    </main>
  )
}

export default HomeView
