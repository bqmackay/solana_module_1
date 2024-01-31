import "dotenv/config"
import { getKeypairFromEnvironment } from "@solana-developers/helpers"

const keypair = getKeypairFromEnvironment("SECRET_KEY");
console.log(keypair)


console.log('Finished lowding our secret key securly from the env file!')