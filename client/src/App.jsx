import Wallet from "./components/Wallet";
import Transfer from "./components/Transfer";
import MiniEVM from "./components/MiniEVM";


import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [pubKey, setPubKey] = useState("");
  const [privKey, setPrivKey] = useState("");

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
        pubKey={pubKey}
        setPubKey={setPubKey}
        privKey={privKey}
        setPrivKey={setPrivKey}
      />
      <Transfer setBalance={setBalance} address={address} />
      <br/>
      <MiniEVM />

    </div>
  );
}

export default App;
