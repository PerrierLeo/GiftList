const express = require("express");
const verifyProof = require("../utils/verifyProof");
const MerkleTree = require("../utils/MerkleTree");
const niceList = require("../utils/niceList");

const port = 1225;

const app = express();
app.use(express.json());

const merkleTree = new MerkleTree(niceList);
const root = merkleTree.getRoot();

app.post("/gift", (req, res) => {
  // grab the parameters from the front-end here
  const name = req.body.name;

  const index = niceList.findIndex((n) => n === name);
  const proof = merkleTree.getProof(index);
  console.log(verifyProof(proof, name, root));

  const isInTheList = false;
  if (isInTheList) {
    res.send("You got a toy robot!");
  } else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
