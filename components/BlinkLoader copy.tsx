'use client'

import { Action, ActionAdapter, Blink } from '@dialectlabs/blinks'
import { useActionSolanaWalletAdapter } from '@dialectlabs/blinks/hooks/solana'
import { clusterApiUrl } from '@solana/web3.js'

import '@dialectlabs/blinks/index.css'
import { useEffect, useState } from 'react'

interface Props {
  urls: string[]
  adapter: ActionAdapter
}

export const BlinkLoader1 = ({ urls }: Props) => {
  const { adapter } = useActionSolanaWalletAdapter(
    clusterApiUrl('mainnet-beta')
  )
  const [actions, setActions] = useState<Action[]>([])

  const fetchActions = async () => {
    try {
      const promises = urls.map((url) =>
        Action.fetch(url).catch((err) => {
          console.log('fetch failed', err)
        })
      )
      const actions = await Promise.all(promises)
      console.log('actions', actions)
      console.log('hostname', new URL((actions as any)[0]?.url).hostname)

      setActions(actions.filter(Boolean) as Action[])
    } catch (error: any) {
      console.error('error occurred', error?.message)
    }
  }

  useEffect(() => {
    fetchActions()
  }, [])

  // we need to update the adapter every time, since it's dependent on wallet and walletModal states
  useEffect(() => {
    actions.forEach((action) => action.setAdapter(adapter))
  }, [actions, adapter])

  return actions.map((action) => (
    <div key={action.url} className='flex gap-2 flex-1 w-full'>
      <Blink action={action} websiteText={new URL(action.url).hostname} />
    </div>
  ))
}
