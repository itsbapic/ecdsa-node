import * as secp from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { toHex } from "ethereum-cryptography/utils";

// Get the address of an Ethereum account from a public key
const getAddress = (publicKey) => {
    // Hash the public key and take the last 20 bytes
    return `0x${toHex(keccak256(publicKey.slice(1)).slice(-20))}`
};

// Generate a new private key and corresponding Ethereum address
const generateKey = () => {
    // Generate a new random private key
    const privateKey = secp.utils.randomPrivateKey();
    // Get the public key from the private key
    const publicKey = secp.getPublicKey(privateKey);
    // Return the private key and the Ethereum address
    return {
        privateKey: toHex(privateKey),
        publicKey: getAddress(publicKey)
    }
}

// Hash a message using the keccak256 algorithm
const hashMessage = (message) => keccak256(Uint8Array.from(message));

// Sign a message with a private key
const sign = async (privKey, message) => {
    // Hash the message
    const hash = hashMessage(message);
    // Sign the hash with the private key
    const [signature, recoveryBit] = await secp.sign(hash, privKey, {
        recovered: true,
    });
    // Combine the recovery bit and signature into a full signature
    const fullSignature = new Uint8Array([recoveryBit, ...signature]);
    // Return the full signature as a hex string
    return toHex(fullSignature);
};

const scripts = {
    generateKey,
    getAddress,
    hashMessage,
    sign
}

export default scripts;
