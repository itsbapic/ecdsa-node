const secp = require("ethereum-cryptography/secp256k1")
const { hexToBytes, toHex } = require("ethereum-cryptography/utils")
const { keccak256 } = require("ethereum-cryptography/keccak")

getAddress = (publicKey) => {
    return `0x${toHex(keccak256(publicKey.slice(1)).slice(-20))}`
}

const hashMessage = (message) => keccak256(Uint8Array.from(message));

const signatureToPubKey = (message, signature) => {
    const hash = hashMessage(message);
    const fullSignatureBytes = hexToBytes(signature);
    const recoveryBit = fullSignatureBytes[0];
    const signatureBytes = fullSignatureBytes.slice(1);

    const pubKey = secp.recoverPublicKey(hash, signatureBytes, recoveryBit);
    return getAddress(pubKey);
};

module.exports = {
    getAddress,
    hashMessage,
    signatureToPubKey
}    