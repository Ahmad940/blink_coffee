import { BlinkLoader } from '@/components/BlinkLoader'
import LoadingIcon from '@/components/ui/LoadingIcon'
import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@/contexts/AuthContext'
import { BlinkInterface } from '@/interfaces/models.interface'
import { BlinkService } from '@/lib/services/blink.service'
import { useActionsRegistryInterval } from '@dialectlabs/blinks'
import { useActionSolanaWalletAdapter } from '@dialectlabs/blinks/hooks/solana'
import '@dialectlabs/blinks/index.css'
import { clusterApiUrl } from '@solana/web3.js'
import { useEffect, useMemo, useState } from 'react'

interface Props {
  search: String
}

export const SearchLayout = ({ search }: Props) => {
  const [actionUrl, setActionUrl] = useState('')
  //const actionApiUrl = 'solana-action:http://localhost:3000/api/actions/blinkme'
  const actionApiUrls = useMemo(
    () => [
      'https://dial.to/?action=solana-action:https://blinkathon.fun/api/form',
      'solana-action:http://localhost:3000/api/actions/blinkme?blink=MkdorIIH5D8gGMrc42M0',
    ],
    []
  )

  const [blinks, setBlinks] = useState<BlinkInterface[]>([])
  const [blinkLoading, setBlinksLoading] = useState(false)
  const { user } = useAuth()
  const { toast } = useToast()

  const { isRegistryLoaded } = useActionsRegistryInterval()
  const { adapter } = useActionSolanaWalletAdapter(
    clusterApiUrl('mainnet-beta')
  )

  const computeUrl = (id: string) => {
    return typeof window !== undefined
      ? `solana-action:${window?.location?.href}api/actions/blinkme?blink=${id}`
      : ''
  }

  const fetchBlinks = async () => {
    setBlinksLoading(true)
    const { message, success, data } = await BlinkService.fetchBlinks(0)
    if (!success)
      return toast({
        title: 'Error while fetching blink',
        variant: 'destructive',
        description: message,
      })

    setBlinks(data)
    console.log(data)
  }

  useEffect(() => {
    if (user) fetchBlinks().finally(() => setBlinksLoading(false))
  }, [user])

  return (
    <div className='w-full mt-14 '>
      <p className='text-sm text-center font-bold font-fredoka'></p>

      {blinkLoading && (
        <div className='flex items-center justify-center'>
          <LoadingIcon className='mt-10 w-36 h-36' />
        </div>
      )}

      {isRegistryLoaded ? (
        <div className='mt-3 px-5 md:px-10 lg:px-28 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 auto-cols-max w-full ml-auto min-h-screen items-start'>
          {blinks?.map((item, i) => (
            <BlinkLoader key={i} url={computeUrl(item?.id)} adapter={adapter} />
          ))}
        </div>
      ) : (
        <LoadingIcon className='mt-10 w-36 h-36' />
      )}
    </div>
  )
}
