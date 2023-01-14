const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

const { signatureToPubKey } = require("./utils/cryptoScripts")

//Middleware for handling CORS 
app.use(cors());
app.use(express.json());

// Initialize an empty object to store the balances of different addresses
let balances = {};

// Endpoint to get the balance of a specific address
app.get("/balance/:address", (req, res) => {
  // Get the address from the request parameters
  const { address } = req.params;
  // Get the balance of the address or return 0 if it doesn't exist
  const balance = balances[address] || 0;
  // Send the balance back to the client
  res.send({ balance });
});

// Endpoint to add a balance to a specific address
app.post("/addBalance", (req, res) => {
  // Get the address and balance from the request body
  const { address, balance } = req.body;
  // Add the balance to the address
  balances[address] = balance;
  // Send the balance back to the client
  res.send({ balance })
})

// Endpoint to handle sending funds from one address to another
app.post("/send", (req, res) => {
  // Get the signature and message from the request body
  const { signature, message } = req.body;

  // Extract the amount and recipient from the message
  const { amount, recipient } = message;

  // Recover the address of the sender from the signature and message
  const sender = signatureToPubKey(message, signature)

  // Make sure that the sender and recipient have an initial balance of 0
  setInitialBalance(sender);
  setInitialBalance(recipient);

  // Check if the sender has enough funds
  if (balances[sender] < amount) {
    // Return an error if they don't
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    // Otherwise, subtract the amount from the sender's balance
    balances[sender] -= amount;
    // And add it to the recipient's balance
    balances[recipient] += amount;
    // Send the updated balance of the sender back to the client
    res.send({ balance: balances[sender] });
  }
});

// Start the server on the specified port
app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

// Helper function to set the initial balance of an address to 0
function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
