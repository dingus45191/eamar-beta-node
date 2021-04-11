import express from "express";

interface Block {
  index: number;
  timestamp: Date;
  data: any;
  precedingHash: string;
}

const app = express();

app.get("/", (req, res) => {
  res.send("Hello Eamar User!");
});

const SHA256 = require("crypto-js/sha256");
class CryptoBlock {
  index: number;
  timestamp: any;
  data: any;
  precedingHash: any;
  hash: string;
  nonce?: any;
  constructor(
    index: number,
    timestamp: any,
    data: any,
    precedingHash: any = " ",
    nonce?: any
  ) {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.precedingHash = precedingHash;
    this.hash = this.computeHash();
  }


  computeHash() {
    return SHA256(
      this.index +
        this.precedingHash +
        this.timestamp +
        JSON.stringify(this.data) +
        this.nonce
    ).toString();
  }
}
class CryptoBlockchain {
  blockchain: any;
  difficulty?: any;
  constructor() {
    this.blockchain = [this.startGenesisBlock()];
  }
  startGenesisBlock() {
    return new CryptoBlock(0, "28/03/2021", "Initial Block in the Chain", "0");
  }
  obtainLatestBlock() {
    return this.blockchain[this.blockchain.length - 1];
  }
  addNewBlock(newBlock: any) {
    newBlock.precedingHash = this.obtainLatestBlock().hash;
    //newBlock.hash = newBlock.computeHash();
    this.blockchain.push(newBlock);
  }

  checkChainValidity() {
    for (let i = 1; i < this.blockchain.length; i++) {
      const currentBlock = this.blockchain[i];
      const precedingBlock = this.blockchain[i - 1];

      if (currentBlock.hash !== currentBlock.computeHash()) {
        return false;
        console.log(
          "This blockchain has been tampered with. It is now modified or corrupted"
        );
      }
      if (currentBlock.precedingHash !== precedingBlock.hash) return false;
    }
    return true;
  }
}

let eamar = new CryptoBlockchain();
eamar.addNewBlock(
  new CryptoBlock(1, "27/3/2021", {
    sender: "Iris Ljesnjanin",
    recipient: "Cosima Mielke",
    quantity: 50,
  })
);
eamar.addNewBlock(
  new CryptoBlock(2, "28/03/2021", {
    sender: "Vitaly Friedman",
    recipient: "Ricardo Gimenes",
    quantity: 100,
  })
);

eamar.addNewBlock(
  new CryptoBlock(3, "28/03/2021", {
    sender: "Mohammed Mubashir Hasan",
    recipient: "Donald Trump",
    quantity: 1000000,
  })
);
console.log(JSON.stringify(eamar, null, 4));


// @ts-ignore
app.listen(5000, (req, res) => {
  console.log("listening on port 5000");
});

app.post('/mineBlock',(req,res)=>{
  const time= new Date().toUTCString()
  console.log(time)
  eamar.addNewBlock(
      new CryptoBlock(5,time,{
        sender: req.body.sender,
        recipient:req.body.recipient,
        quantity:req.body.quantity,
      })
  )
})
