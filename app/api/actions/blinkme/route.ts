import { BlinkInterface } from '@/interfaces/models.interface'
import {
  blinkError,
  generatePaymentBlink,
  validatedQueryParams,
} from '@/lib/blink.lib'
import { BlinkService } from '@/lib/services/blink.service'
import {
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

const headers = ACTIONS_CORS_HEADERS

export const GET = async (req: Request) => {
  const requestUrl = new URL(req.url)
  const blink_id = requestUrl.searchParams.get('blink')

  if (!blink_id) {
    return blinkError("'blink' url param not found")
  }

  // "1ydnsKJhktH6ipyUJWKg"
  const blink = await BlinkService.getOneBlink(blink_id)
  console.log('blink', blink)

  if (!blink.data) {
    return blinkError('Blink Not Found')
  }

  const data = blink.data as BlinkInterface

  const toPubkey = new PublicKey(data?.pub_key)

  const baseHref = new URL(
    `/api/actions/blinkme?blink=${blink_id}&to=${toPubkey.toBase58()}`,
    requestUrl.origin
  ).toString()

  console.log('baseHREF', baseHref)

  return generatePaymentBlink({
    title: data.title,
    description: data.description || '',
    icon: data.image_url || '',
    label: data.image_url || '',
    baseURL: baseHref,
  })
}

// export const OPTIONS = GET

export const POST = async (req: Request) => {
  const requestUrl = new URL(req.url)
  const { amount, toPubkey, blink_id } = validatedQueryParams(requestUrl)

  console.log('amount', amount, 'toPubkey', toPubkey.toBase58())

  try {
    const body: ActionPostRequest = await req.json()

    // validate the client provided input
    let account: PublicKey
    try {
      account = new PublicKey(body.account)
    } catch (err) {
      return new Response('Invalid "account" provided', {
        status: 400,
        headers,
      })
    }

    const connection = new Connection(
      process.env.SOLANA_RPC! || clusterApiUrl('mainnet-beta')
    )

    // ensure the receiving account will be rent exempt
    const minimumBalance = await connection.getMinimumBalanceForRentExemption(
      0 // note: simple accounts that just store native SOL have `0` bytes of data
    )
    if (amount * LAMPORTS_PER_SOL < minimumBalance) {
      throw `account may not be rent exempt: ${toPubkey.toBase58()}`
    }

    // create an instruction to transfer native SOL from one wallet to another
    const transferSolInstruction = SystemProgram.transfer({
      fromPubkey: account,
      toPubkey: toPubkey,
      lamports: amount * LAMPORTS_PER_SOL,
    })

    // get the latest blockhash amd block height
    const { blockhash, lastValidBlockHeight } =
      await connection.getLatestBlockhash()

    // create a legacy transaction
    const transaction = new Transaction({
      feePayer: account,
      blockhash,
      lastValidBlockHeight,
    }).add(transferSolInstruction)

    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        transaction,
        message: `Sent ${amount} SOL to Alice: ${toPubkey.toBase58()}`,
      },
      // note: no additional signers are needed
      // signers: [],
    })

    return Response.json(payload, {
      headers,
    })
  } catch (error: any) {
    console.log(error)
    // return blinkError(error.message || 'unknown error occurred')
    return Response.json({
      error: error.message || 'An unknown error occurred',
    })
  }
}

export const OPTIONS = (req: Request) => {
  return Response.json(null, {
    headers,
  })
}
