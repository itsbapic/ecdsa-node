const secp = require("ethereum-cryptography/secp256k1")
const { hexToBytes, toHex } = require("ethereum-cryptography/utils")
const { keccak256 } = require("ethereum-cryptography/keccak")

const privateKey = secp.utils.randomPrivateKey();
console.log(privateKey)
console.log(`private key: ${toHex(privateKey)}`)

const publicKey = secp.getPublicKey(privateKey);

getAddress = (publicKey) => {
    return `0x${toHex(keccak256(publicKey.slice(1)).slice(-20))}`
}
console.log(`public key: ${toHex(publicKey)}`)