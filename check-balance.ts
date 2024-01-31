import { Connection, LAMPORTS_PER_SOL, PublicKey} from "@solana/web3.js";
import "dotenv/config"
import { getKeypairFromEnvironment } from "@solana-developers/helpers"

// const keypair = getKeypairFromEnvironment("SECRET_KEY");
// const publicKey = new PublicKey(keypair.publicKey)
const suppliedPublicKey = process.argv[2];
if (!suppliedPublicKey) {
  throw new Error("Provide a public key to check the balance of!");
}

try {
    const publicKey = new PublicKey(suppliedPublicKey)
    const connection = new Connection("https://api.mainnet.solana.com", "confirmed");
    const balanceInLamports = await connection.getBalance(publicKey);
    const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

    console.log(`💰 Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`)    
} catch(error) {
    console.error(`getBalance error: ${error.message}. Please ensure your public key is valid.`)
}


