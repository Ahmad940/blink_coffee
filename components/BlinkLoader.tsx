import { ActionAdapter, Blink, useAction } from '@dialectlabs/blinks'

import '@dialectlabs/blinks/index.css'

interface Props {
  url: string
  adapter: ActionAdapter
}

export const BlinkLoader = ({ url, adapter }: Props) => {
  const { action } = useAction({ url: url, adapter })

  return (
    <div className='w-full'>
      {action ? (
        <Blink
          action={action}
          stylePreset='x-dark'
          websiteUrl={new URL(url).hostname}
        />
      ) : (
        <>Loading.. Blink</>
      )}
    </div>
  )
}
