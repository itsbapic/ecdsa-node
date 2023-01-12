import server from "../server";
import * as secp from "ethereum-cryptography/secp256k1";
import { hexToBytes, toHex } from "ethereum-cryptography/utils"
import { keccak256 } from "ethereum-cryptography/keccak"


function Wallet({ address, setAddress, balance, setBalance, pubKey, setPubKey, privKey, setPrivKey }) {

  const getAddress = (publicKey) => {
      return `0x${toHex(keccak256(publicKey.slice(1)).slice(-20))}`
    }

  async function onChange(evt) {
    const privKey = evt.target.value;
    setPrivKey(privKey)
    console.log(privKey.length);
    
    // If the data is a valid private key
    if(privKey.length == 64) {
      const pubKey = secp.getPublicKey(privKey);
      pubKey ? setPubKey(toHex(pubKey)) : setPubKey("")

      // If there is a known associated public key (in our server balances object) 
      if (pubKey) {
        const {
          data: { balance },
        } = await server.get(`balance/${toHex(pubKey)}`);
        setBalance(balance);
        const address = getAddress(pubKey);
        setAddress(address)
      } else {
        setBalance(0);
        setAddress("");
      }
    } else {
      setBalance(0);
      setAddress("");
    }

    
    
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input placeholder="Enter a private key" value={privKey} onChange={onChange}></input>
      </label>
      <a className="balance" href={`https://etherscan.io/address/${address}`} target="_blank">
      <div href={`https://etherscan.io/address/${address}`}>Address: {address}</div>

      </a>
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
