"use strict";
import express from "express";

Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var app = express_1.default();
app.get("/", function (req, res) {
  res.send("Hello Eamar User!");
});
var SHA256 = require("crypto-js/sha256");
var CryptoBlock = /** @class */ (function () {
  function CryptoBlock(index, timestamp, data, precedingHash, nonce) {
    if (precedingHash === void 0) {
      precedingHash = " ";
    }
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.precedingHash = precedingHash;
    this.hash = this.computeHash();
  }
  CryptoBlock.prototype.computeHash = function () {
    return SHA256(
      this.index +
        this.precedingHash +
        this.timestamp +
        JSON.stringify(this.data) +
        this.nonce
    ).toString();
  };
  return CryptoBlock;
})();
var CryptoBlockchain = /** @class */ (function () {
  function CryptoBlockchain() {
    this.blockchain = [this.startGenesisBlock()];
  }
  CryptoBlockchain.prototype.startGenesisBlock = function () {
    return new CryptoBlock(0, "28/03/2021", "Initial Block in the Chain", "0");
  };
  CryptoBlockchain.prototype.obtainLatestBlock = function () {
    return this.blockchain[this.blockchain.length - 1];
  };
  CryptoBlockchain.prototype.addNewBlock = function (newBlock) {
    newBlock.precedingHash = this.obtainLatestBlock().hash;
    //newBlock.hash = newBlock.computeHash();
    this.blockchain.push(newBlock);
  };
  CryptoBlockchain.prototype.checkChainValidity = function () {
    for (var i = 1; i < this.blockchain.length; i++) {
      var currentBlock = this.blockchain[i];
      var precedingBlock = this.blockchain[i - 1];
      if (currentBlock.hash !== currentBlock.computeHash()) {
        return false;
        console.log(
          "This blockchain has been tampered with. It is now modified or corrupted"
        );
      }
      if (currentBlock.precedingHash !== precedingBlock.hash) return false;
    }
    return true;
  };
  return CryptoBlockchain;
})();
var eamar = new CryptoBlockchain();
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
eamar.addNewBlock(
  new CryptoBlock(4, "28/03/2021", {
    sender: "Mohammed Mubashir Hasan",
    recipient: "Flintheart Glomgold",
    quantity: 1000000,
  })
);
console.log(JSON.stringify(eamar, null, 4));
// @ts-ignore
app.listen(5000, function (req, res) {
  console.log("listening on port 5000");
});
app.use(express.json());
app.post("/mineBlock", function (req, res) {
  var time = new Date().toUTCString();
  console.log(time);
  eamar.addNewBlock(
    new CryptoBlock(6, "17/04/21", {
      sender: req.body.sender,
      recipient: req.body.recipient,
      quantity: req.body.quantity,
    })
  );
  res.send(eamar);
});
