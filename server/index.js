const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

const { hashMessage, signatureToPubKey } = require("./utils/cryptoScripts")

app.use(cors());
app.use(express.json());

const balances = {
  "0x99153b7bcad5762ca765363cf452b6cb49e1fafc": 100,
  "0xb073e367b6f24a92e2742bd85a6b9b4ed2984801": 50,
  "0x4084c6a22e7e0a76e017bde3faebb2a5ca2464e5": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

// app.post("/balance/:address", (req, res) => {
//   const { address, balance } = req.body;
//   balances[address] = balance;
//   res.send(`Address ${address} added!`)
// })

app.post("/send", (req, res) => {
  // get a signature from the client
  const { signature, message, amount, recipient } = req.body;

  // recover the address from the signature (to be sender)
  const sender = signatureToPubKey(message, signature)

  console.log(sender);

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
