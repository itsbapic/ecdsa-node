import server from "../server";
import * as secp from "ethereum-cryptography/secp256k1";
import { hexToBytes, toHex } from "ethereum-cryptography/utils"
import { keccak256 } from "ethereum-cryptography/keccak"


function Wallet({ address, setAddress, balance, setBalance, privKey, setPrivKey }) {

  const getAddress = (publicKey) => {
    return `0x${toHex(keccak256(publicKey.slice(1)).slice(-20))}`
}

  async function onChange(evt) {
    const privKey = evt.target.value;
    console.log(privKey);
    setPrivKey(privKey)
    
    const address = secp.getPublicKey(privKey, true);
    // const address = evt.target.value;
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input placeholder="Provide your private key" value={privKey} onChange={onChange}></input>
      </label>

      <div className="balance">Public Key: {getAddress(address)}</div>
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
