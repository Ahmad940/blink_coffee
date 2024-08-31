import { useActionsRegistryInterval } from '@dialectlabs/blinks'
import { useActionSolanaWalletAdapter } from '@dialectlabs/blinks/hooks/solana'
import '@dialectlabs/blinks/index.css'
import { clusterApiUrl } from '@solana/web3.js'
import dynamic from 'next/dynamic'
import { useMemo, useState } from 'react'

interface Props {
  search: String
}

export const BlinkLoader1 = dynamic(
  async () => (await import('@/components/BlinkLoader')).BlinkLoader,
  {
    ssr: false,
  }
)

export const SearchLayout = ({ search }: Props) => {
  const [actionUrl, setActionUrl] = useState('')
  //const actionApiUrl = 'solana-action:http://localhost:3000/api/actions/blinkme'
  const actionApiUrls = useMemo(
    () => [
      'https://blinkathon.fun/api/form',
      'http://localhost:3000/api/actions/blinkme?blink=MkdorIIH5D8gGMrc42M0',
      // 'solana-action:http://localhost:3000/api/actions/blinkme?blink=MkdorIIH5D8gGMrc42M0',
    ],
    []
  )

  const { isRegistryLoaded } = useActionsRegistryInterval()
  const { adapter } = useActionSolanaWalletAdapter(clusterApiUrl('devnet'))
  //  grid grid-cols-3
  return (
    <div className='w-full self-stretch'>
      {/* <div className='px-10 gap-10 grid grid-cols-3 w-full ml-auto min-h-screen items-start'> */}
      {/* {Array.from({ length: 100 }, (_, index) => ({
        id: index + 1,
        url: actionApiUrls[Math.floor(Math.random() * actionApiUrls.length)],
      })).map((item) => ( */}
      {isRegistryLoaded ? (
        <BlinkLoader urls={actionApiUrls} adapter={adapter} />
      ) : (
        <p>WHat so vere</p>
      )}
      {/* ))} */}
    </div>
  )
}
