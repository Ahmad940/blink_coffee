import {
  ActionGetResponse,
  ActionPostRequest,
  ActionPostResponse,
  ACTIONS_CORS_HEADERS,
  createPostResponse,
} from '@solana/actions'
import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from '@solana/web3.js'

export const GET = async (req: Request) => {
  const payload: ActionGetResponse = {
    title: 'Actions Example - Simple On-chain Memo',
    icon: 'https://ucarecdn.com/7aa46c85-08a4-4bc7-9376-88ec48bb1f43/-/preview/880x864/-/quality/smart/-/format/auto/',
    description: 'Send a message on-chain using a Memo',
    label: 'Send Memo',
    type: 'action',
  }

  console.log('payload')

  return Response.json(payload, {
    headers: ACTIONS_CORS_HEADERS,
  })
}

// export const OPTIONS = GET

export const POST = async (req: Request) => {
  try {
    const body: ActionPostRequest = await req.json()

    // insert transaction logic here
    const { searchParams } = new URL(req.url)
    // amount is just to show how to decide the next action
    const amount = searchParams.get('amount') as string

    // stage is the stage of the action in the chain
    const stage = searchParams.get('stage') as string

    if (!amount) {
      return new Response('Amount is required', {
        status: 400,
        headers: ACTIONS_CORS_HEADERS,
      })
    }

    const sender = new PublicKey(body.account)
    const tx = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: sender,
        toPubkey: new PublicKey('CRtPaRBqT274CaE5X4tFgjccx5XXY5zKYfLPnvitKdJx'),
        lamports: LAMPORTS_PER_SOL * 0,
      })
    )
    tx.recentBlockhash = (
      await new Connection(clusterApiUrl('devnet')).getLatestBlockhash()
    ).blockhash
    tx.feePayer = sender

    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        transaction: tx,
        message: 'Optional message to include with transaction',
      },
    })

    return Response.json(payload, {
      headers: ACTIONS_CORS_HEADERS,
    })
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
