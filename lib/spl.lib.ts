import {
  createTransferInstruction,
  getAssociatedTokenAddress,
} from '@solana/spl-token'
import {
  Connection,
  ParsedAccountData,
  PublicKey,
  Transaction,
  VersionedTransaction,
} from '@solana/web3.js'

export const getSplTokenAddress = (token: string) =>
  ({
    send: 'SENDdRQtYMWaQrBroBrJ2Q53fgVuq95CV9UPGEvpCxa',
    usdc: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  }[token])

async function getNumberDecimals(
  connection: Connection,
  mintAddress: PublicKey
): Promise<number> {
  const info = await connection.getParsedAccountInfo(mintAddress)
  const result = (info.value?.data as ParsedAccountData).parsed.info
    .decimals as number
  return result
}

export const sendSPLToken = async (
  connection: Connection,
  {
    amount,
    fromPubKey,
    toPubKey,
    mintAddress,
  }: {
    amount: number
    fromPubKey: PublicKey
    toPubKey: PublicKey
    mintAddress: PublicKey
  }
) => {
  console.log(
    `Sending ${amount} mint ${mintAddress.toBase58()} from ${fromPubKey.toString()} to ${toPubKey.toBase58()}.`
  )

  const numberDecimals_ = await getNumberDecimals(connection, mintAddress)
  console.log(`    Number of Decimals: ${numberDecimals_}`)

  const associatedTokenAddress = await getAssociatedTokenAddress(
    mintAddress,
    fromPubKey
  )

  const txInstruction = await createTransferInstruction(
    associatedTokenAddress,
    toPubKey,
    fromPubKey,
    amount * Math.pow(10, numberDecimals_),
    undefined,
    mintAddress
  )

  const tx = new Transaction()
  tx.add(txInstruction)

  const latestBlockHash = await connection.getLatestBlockhash('confirmed')
  tx.recentBlockhash = await latestBlockHash.blockhash

  console.log(
    '\x1b[32m', //Green Text
    `   Transaction Success!🎉`,
    `\n    https://explorer.solana.com/tx/${signature}?cluster=devnet`
  )

  return tx
}

export const jupSwap = async ({
  amount,
  userPubKey,
}: {
  amount: number
  userPubKey: PublicKey
}) => {
  const quoteResponse = await (
    await fetch(
      `https://quote-api.jup.ag/v6/quote?inputMint=So11111111111111111111111111111111111111112\
&outputMint=SENDdRQtYMWaQrBroBrJ2Q53fgVuq95CV9UPGEvpCxa\
&amount=${amount}\
&slippageBps=50`
    )
  ).json()

  console.log('quoteResponse', { quoteResponse })

  // get serialized transactions for the swap
  const { swapTransaction } = await (
    await fetch('https://quote-api.jup.ag/v6/swap', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // quoteResponse from /quote api
        quoteResponse,
        // user public key to be used for the swap
        userPublicKey: userPubKey.toString(),
        // auto wrap and unwrap SOL. default is true
        wrapAndUnwrapSol: true,
        // feeAccount is optional. Use if you want to charge a fee.  feeBps must have been passed in /quote API.
        // feeAccount: "fee_account_public_key"
      }),
    })
  ).json()
  console.log('swap transaction', swapTransaction)

  // deserialize the transaction
  const swapTransactionBuf = Buffer.from(swapTransaction, 'base64')
  const transaction = VersionedTransaction.deserialize(swapTransactionBuf)
  console.log(transaction)

  // sign the transaction
  return transaction
}
