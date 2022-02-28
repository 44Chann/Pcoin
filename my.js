import SHA256 from "crypto-js/sha256.js";




class Block {
    constructor(index, timestamp, data, previoushash = "") {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previoushash = previoushash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(
            this.index +
            this.timestamp +
            JSON.stringify(this.data) +
            this.nonce +
            this.previoushash
        ).toString();
    }

    minBlock(difficulty) {
        while (
            this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
        ) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenasissBLock()];
        this.difficulty = 5;
    }

    createGenasissBLock() {
        return new Block(0, "28/2/2022", "First Block", "0");
    }

    getlatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addNewBlock(newBlock) {
        newBlock.previoushash = this.getlatestBlock().hash;
        newBlock.minBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChianValid() {
        for (let i = 1; i < this.chain.length - 1; i++) {
            let cureentBlock = this.chain[i];
            let previousBlock = this.chain[i - 1];

            if (cureentBlock.hash !== cureentBlock.calculateHash()) {
                return false;
            }
            if (cureentBlock.previoushash == previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

let pokCoin = new Blockchain();

console.log("mining new block .......");
pokCoin.addNewBlock(new Block(1, "28/01/2022", { ammount: 2 }));
console.log(pokCoin);
console.log("is our chian vallid " + pokCoin.isChianValid());
