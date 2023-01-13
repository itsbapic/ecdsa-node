import server from "../server";
import * as secp from "ethereum-cryptography/secp256k1";
import { hexToBytes, toHex } from "ethereum-cryptography/utils"
import { keccak256 } from "ethereum-cryptography/keccak"
import scripts from "../utils/cryptoScripts" 


function MiniEVM({ address, setAddress, balance, setBalance, pubKey, setPubKey, privKey, setPrivKey }) {

    const newAddress = (balance) => {
      const {privateKey, publicKey} = scripts.generateKey();
      console.log(`priv: ${privateKey}\n pub: ${publicKey}`)
    }
  return (
    <div className="container miniEVM">
      <h1>bapic's MiniEVM™️</h1>
      <form className="container transfer" onSubmit={newAddress(balance)}>
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
    </form>
      <input type="submit" className="button" value={`ADDRESS: ${address}0x213234234... BALANCE: ${balance}`} />
    </div>
  );
}

export default MiniEVM;
