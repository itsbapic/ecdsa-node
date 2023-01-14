## ECDSA Node

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

### Video instructions
For an overview of this project as well as getting started instructions, check out the following video:

https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4
 
### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application 
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder 
2. Run `npm install` to install all the depedencies 
3. Run `node index` to start the server 

The application should connect to the default server port (3042) automatically! 

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.

### How I acheived the goals of this project, and my approach!


#### Private keys and signatures 
Seeing that this was the first time really getting into cryptography, dealing with different datatypes was a huge curveball. This project uses a signature algorithm from the private key of the sender, and a message from that sender, that can then be securly sent over a network to relay the message, while still keeping the private key intact and secure.

#### Server-side addresses & React State Managment
I very quickly got very tired of constantly generating new private keys, and associated public keys. Instead, I created a client-side key generator, that would then push the public key, with the balance amount, to the server. Private keys are kept client-side to not expose them.

PS: React state management is less than ideal.

