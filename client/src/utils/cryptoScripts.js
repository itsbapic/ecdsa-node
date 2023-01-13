import * as secp from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { toHex } from "ethereum-cryptography/utils";

const getAddress = (publicKey) => {
    const hash = keccak256(publicKey.slice(1));
    return toHex(hash.slice(-20)).toUpperCase();
};

const hashMessage = (message) => keccak256(Uint8Array.from(message));

const sign = async (privKey, message) => {
    const hash = hashMessage(message);
    const [signature, recoveryBit] = await secp.sign(hash, privKey, {
        recovered: true,
    });
    const fullSignature = new Uint8Array([recoveryBit, ...signature]);
    return toHex(fullSignature);
};

const scripts = {
    getAddress,
    hashMessage,
    sign
}

export default scripts;