const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

const { signatureToPubKey } = require("./utils/cryptoScripts")

app.use(cors());
app.use(express.json());

const balances = {
  "0xe937a7be83f0d58de25d74b3c732b9c8e1e9d24f": 100,
  "0xdd19514ac4189464bf1cace0f37c6c2420b17dcd": 50,
  "0xe762aab006d2746c23f04ee102bed5e216ee01ab": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});


app.post("/send", (req, res) => {
  // get a signature from the client
  const { signature, message } = req.body;

  const { amount, recipient } = message;

  console.log(`signature: ${signature}\nmessage: ${message}\namount: ${amount}\nrecipient: ${recipient}`);


  // recover the address from the signature (to be sender)
  const sender = signatureToPubKey(message, signature)

  console.log(`sender: ${sender}`);

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
