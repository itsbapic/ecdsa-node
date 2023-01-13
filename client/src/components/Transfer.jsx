import { useState } from "react";
import server from "../server";
import { keccak256 } from "ethereum-cryptography/keccak"
import { hexToBytes } from "ethereum-cryptography/utils"
import * as secp from "ethereum-cryptography/secp256k1";

import scripts from "../utils/cryptoScripts"

function Transfer({ address, setBalance, privKey }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);
  
  
  async function transfer(evt) {
    evt.preventDefault();
    const message = {
        amount: parseInt(sendAmount),
        recipient: recipient
    }
    // console.log(message)
    // console.log(messageHash)
    // TODO: PRIVATE KEY
    const signature = await scripts.sign(hexToBytes(privKey), message)
    // console.log(signature);
    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        signature: signature,
        message: message,
        amount: parseInt(sendAmount),
        recipient,
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
