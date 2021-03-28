"use strict";
exports.__esModule = true;
var express_1 = require("express");
var app = express_1["default"]();
app.get("/", function (req, res) {
    res.send("Hello Eamar User!");
});
var SHA256 = require("crypto-js/sha256");
var CryptoBlock = /** @class */ (function () {
    function CryptoBlock(index, timestamp, data, precedingHash) {
        if (precedingHash === void 0) { precedingHash = " "; }
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.precedingHash = precedingHash;
        this.hash = this.computeHash();
    }
    CryptoBlock.prototype.computeHash = function () {
        return SHA256(this.index +
            this.precedingHash +
            this.timestamp +
            JSON.stringify(this.data)).toString();
    };
    return CryptoBlock;
}());
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
        newBlock.hash = newBlock.computeHash();
        this.blockchain.push(newBlock);
    };
    return CryptoBlockchain;
}());
var smashingCoin = new CryptoBlockchain();
smashingCoin.addNewBlock(new CryptoBlock(1, "27/3/2021", {
    sender: "Iris Ljesnjanin",
    recipient: "Cosima Mielke",
    quantity: 50
}));
smashingCoin.addNewBlock(new CryptoBlock(2, "28/03/2021", {
    sender: "Vitaly Friedman",
    recipient: "Ricardo Gimenes",
    quantity: 100
}));
smashingCoin.addNewBlock(new CryptoBlock(3, "28/03/2021", {
    sender: "Mohammed Mubashir Hasan",
    recipient: "Donald Trump",
    quantity: 1000000
}));
console.log(JSON.stringify(smashingCoin, null, 4));
app.listen(5000, function (req, res) {
    console.log("listening on port 5000");
});
