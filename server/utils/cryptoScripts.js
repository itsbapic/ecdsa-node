const secp = require("ethereum-cryptography/secp256k1")
const { hexToBytes, toHex } = require("ethereum-cryptography/utils")
const { keccak256 } = require("ethereum-cryptography/keccak")

const hashMessage = (message) => keccak256(Uint8Array.from(message));

const signatureToPubKey = (message, signature) => {
    const hash = hashMessage(message);
    const fullSignatureBytes = hexToBytes(signature);
    const recoveryBit = fullSignatureBytes[0];
    const signatureBytes = fullSignatureBytes.slice(1);

    return secp.recoverPublicKey(hash, signatureBytes, recoveryBit);
};

module.exports = {
    hashMessage,
    signatureToPubKey
}    