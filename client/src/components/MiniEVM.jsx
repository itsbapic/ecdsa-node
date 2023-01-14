import { useState, useEffect } from "react";
import server from "../server";
import scripts from "../utils/cryptoScripts" 


function MiniEVM({ }) {
  const [generatedBalance, setGeneratedBalance] = useState("");
  const [generatedBalances, setGeneratedBalances] = useState([]);
  const [newGenAddress, setNewGenAddress] = useState({});

  const newAddress = (evt) => {
    evt.preventDefault();

    const {privateKey, publicKey} = scripts.generateKey();
    setNewGenAddress({
      privateKey: privateKey,
      publicKey: publicKey,
      balance: generatedBalance
    });
  }
   useEffect(() => {
    if(newGenAddress.publicKey) {
      setGeneratedBalances(prevBalances => [...prevBalances, newGenAddress]);
      server.post("addBalance", {
        address: newGenAddress.publicKey,
        balance: parseInt(newGenAddress.balance)
      }).catch(ex => alert(ex.response.data.message));
    }
  }, [newGenAddress])

  // Function to copy the clicked value to the clipboard
  const handleClick = (value) => {
    navigator.clipboard.writeText(value);
  }

  return (
    <div className="container miniEVM">
      <h1>bapic's MiniEVM™️</h1>
      <form className="container generateAddress" onSubmit={newAddress}>
        <h2>Generate Address</h2>
        <label>
          Address Balance
          <input
            placeholder="1, 2, 3..."
            value={generatedBalance}
            onChange={e => setGeneratedBalance(e.target.value)}
            required={true}
          ></input>
        </label>
        <input type="submit" className="button" value="Generate" />
      </form>

      {generatedBalances.map((newAddress, index) => {
        return (
          <div key={index} className="address-group">
            <p>PRIVKEY: <button className="button" onClick={() => handleClick(newAddress.privateKey)}>{newAddress.privateKey.slice(0,10)}...</button></p>
            <p>ADDRESS: <button className="button" onClick={() => handleClick(newAddress.publicKey)}>{newAddress.publicKey.slice(0,10)}...</button></p>
          </div>
        )
      })}
    </div>
  );
}

export default MiniEVM;