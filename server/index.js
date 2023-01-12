const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "04dd3c48db462e6925a0510599b61f853be6cbc56c6b7dc4022657ba60fd7f8874a5cfab55b97bff90bbb741854eae18da1877e581c34eddd67d73d0986bf0263a": 100,
  "046cfe6f2525892402395bb88442c9a97021ae35b7c2a41fe1773b7c9bcae1c2cb4eb02d3a65f5220627f19626b9efa80b725a98e876a59915df5da0169171a11b": 50,
  "0xa9eb1e853c4de31b2e88ea7bf5e5ffb76fed28cc": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

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
