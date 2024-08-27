import { ActionGetResponse, ACTIONS_CORS_HEADERS } from '@solana/actions'

export const GET = async (req: Request) => {
  const payload: ActionGetResponse = {
    title: 'Actions Example - Simple On-chain Memo',
    icon: 'https://ucarecdn.com/7aa46c85-08a4-4bc7-9376-88ec48bb1f43/-/preview/880x864/-/quality/smart/-/format/auto/',
    description: 'Send a message on-chain using a Memo',
    label: 'Send Memo',
    type: 'action',
    links: {
      actions: [
        {
          label: 'Send 0.1',
          href: '/blinkme',
        },
        {
          label: 'Send 0.5',
          href: '/blinkme',
        },
        {
          label: 'Select 0.7',
          href: '/blinkme',
        },
        {
          label: 'Send',
          href: '/blinkme',
          parameters: [
            {
              name: 'sol',
              type: 'text',
              required: true,
              label: 'Send Me Sol Ya ruhu ummuka',
            },
          ],
        },
      ],
    },
  }

  console.log('payload')

  return Response.json(payload, {
    headers: ACTIONS_CORS_HEADERS,
  })
}

// export const OPTIONS = GET

export const POST = async (req: Request) => {
  try {
  } catch (error) {
    console.log(error)
    let message = 'An unknown error occurred'
    if (typeof error == 'string') message = error
    return new Response(message, {
      status: 400,
      headers: ACTIONS_CORS_HEADERS,
    })
  }
}

export const OPTIONS = (req: Request) => {
  return Response.json(null, {
    headers: ACTIONS_CORS_HEADERS,
  })
}
