import { BlinkInterface } from '@/interfaces/models.interface'
import { BlinkService } from '@/lib/services/blink.service'
import { ActionGetResponse, ACTIONS_CORS_HEADERS } from '@solana/actions'

const headers = ACTIONS_CORS_HEADERS

export const GET = async (req: Request) => {
  const requestUrl = new URL(req.url)
  const blink_id = requestUrl.searchParams.get('blink')

  const payload: ActionGetResponse = {
    title: 'Buy me a coffee',
    icon: 'https://ucarecdn.com/7aa46c85-08a4-4bc7-9376-88ec48bb1f43/-/preview/880x864/-/quality/smart/-/format/auto/',
    description: `Veniam Lorem esse enim excepteur commodo enim dolore velit excepteur elit consequat duis.`,
    label: 'Send Memo',
    type: 'action',
    links: {
      actions: [
        {
          label: 'Blink Me 😉',
          href: '/blinkme',
          parameters: [
            {
              name: 'sol',
              type: 'text',
              required: true,
              label: 'Send a custom amount',
            },
          ],
        },
      ],
    },
  }

  if (!blink_id) {
    payload.disabled = true
    payload.error = { message: "'blink' url param not found" }

    return Response.json(
      // payload
      payload,
      {
        headers,
      }
    )
  }

  // "1ydnsKJhktH6ipyUJWKg"
  const blink = await BlinkService.getOneBlink(blink_id)
  console.log('blink', blink)

  if (!blink.data) {
    payload.disabled = true
    payload.error = { message: 'Blink Not Found' }

    return Response.json(
      // payload
      payload,
      {
        headers,
      }
    )
  }

  const data = blink.data as BlinkInterface

  payload.title = data.title
  payload.description = data.description || payload.description
  payload.label = data.label || payload.label
  payload.icon = data.image_url || payload.icon

  return Response.json(payload, {
    headers,
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
      headers,
    })
  }
}

export const OPTIONS = (req: Request) => {
  return Response.json(null, {
    headers,
  })
}
