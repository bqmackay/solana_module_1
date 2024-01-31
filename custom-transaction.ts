import * as web3 from "@solana/web3.js"
import "dotenv/config"
import base58 from "bs58"
import { getKeypairFromEnvironment, requestAndConfirmAirdropIfRequired } from "@solana-developers/helpers"

const pubkey = process.argv[2] || null

if (!pubkey) {
    console.error("account not accessed")
    process.exit(1)
}

const receiver = new web3.PublicKey(pubkey);

const sender = getKeypairFromEnvironment("SECRET_KEY")

const connection = new web3.Connection("https://api.devnet.solana.com", "confirmed")

const transaction = new web3.Transaction()
const LAMPORTS_TO_SEND = 5000

const sendSolInstruction = web3.SystemProgram.transfer({
    fromPubkey: sender.publicKey,
    toPubkey: receiver,
    lamports: LAMPORTS_TO_SEND
})

transaction.add(sendSolInstruction)

const sendConfirmation = await web3.sendAndConfirmTransaction(connection, transaction, [sender])

console.log(`💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${receiver}.`)
console.log(`Transaction signature is ${sendConfirmation}`)