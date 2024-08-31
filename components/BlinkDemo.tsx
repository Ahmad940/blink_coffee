import { Blink, useAction } from '@dialectlabs/blinks'
import { useActionSolanaWalletAdapter } from '@dialectlabs/blinks/hooks/solana'
import { clusterApiUrl } from '@solana/web3.js'

import '@dialectlabs/blinks/index.css'

const BLinkDemo = () => {
  // const [action, setAction] = useState<Action | null>(null)
  // const actionApiUrl = window.location.href + 'blinkme'
  const actionApiUrl = 'solana-action:http://localhost:3000/api/actions/blinkme'
  //const actionApiUrl = 'https://dial.to/?action=solana-action:https://blinkathon.fun/api/form'
  // useAction initiates registry, adapter and fetches the action.
  console.log(actionApiUrl)
  const { adapter } = useActionSolanaWalletAdapter(
    clusterApiUrl('mainnet-beta')
  )
  const { action } = useAction({ url: actionApiUrl, adapter })
  return action ? (
    <Blink
      action={action}
      websiteText={new URL(actionApiUrl).hostname}
      //stylePreset='x-dark'
    />
  ) : null
}

export default BLinkDemo
