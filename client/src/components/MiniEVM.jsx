import server from "../server";
import * as secp from "ethereum-cryptography/secp256k1";
import { hexToBytes, toHex } from "ethereum-cryptography/utils"
import { keccak256 } from "ethereum-cryptography/keccak"


function MiniEVM({ address, setAddress, balance, setBalance, pubKey, setPubKey, privKey, setPrivKey }) {

    const generateAddress = () => {}
  return (
    <div className="container miniEVM">
      <h1>bapic's MiniEVM™️</h1>
      <form className="container transfer" onSubmit={generateAddress}>
      <h2>Generate Address</h2>

      <label>
        Address Balance
        <input
          placeholder="1, 2, 3..."
          // value={sendAmount}
          // onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <input type="submit" className="button" value="Generate" />
      {/* <div className="balance">Generated Signature: {generatedSignature}</div> */}
    </form>
    
      <a className="balance" href={`https://etherscan.io/address/${address}`} target="_blank">
      <div href={`https://etherscan.io/address/${address}`}>Address: {address}</div>
      </a>
      <input type="submit" className="button" value={`ADDRESS: ${address}0x213234234... BALANCE: ${balance}`} />
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default MiniEVM;
