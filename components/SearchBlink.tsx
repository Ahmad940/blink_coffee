import { Blink, useAction } from '@dialectlabs/blinks'
import { useActionSolanaWalletAdapter } from '@dialectlabs/blinks/hooks/solana'
import { clusterApiUrl } from '@solana/web3.js'

import '@dialectlabs/blinks/index.css'
import { useState } from 'react'


export const SearchLayout = () => {
    const [actionUrl,setActionUrl] = useState('')
    //const actionApiUrl = 'solana-action:http://localhost:3000/api/actions/blinkme'
    const actionApiUrl = 'https://dial.to/?action=solana-action:https://blinkathon.fun/api/form'
    const { adapter } = useActionSolanaWalletAdapter(clusterApiUrl('devnet'))
    const { action } =useAction({url:actionApiUrl, adapter})

    return(
        <div className="w-[90%] ml-auto min-h-screen mr-auto flex items-center justify-center flex-col ">
            <div>
               <div>
                
               </div>
            </div>
            <div className='w-[50%] h-[20%]'>
               { action ? <Blink action={action} stylePreset='x-dark' websiteUrl={new URL(actionApiUrl).hostname} /> : <>Loading.. Blink</>}
            </div>
        </div>
    )
}