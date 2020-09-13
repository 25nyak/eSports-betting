
var eSportsContract = require("./build/contracts/eSports.json");
var contract = require("truffle-contract");

var Web3 = require("web3");
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

const oracleContract = contract(eSportsContract);
oracleContract.setProvider(web3.currentProvider);

web3.eth.getAccounts((err, accounts) => {
  oracleContract.deployed()
    .then((oracleInstance) => {
    const oraclePromises = [
      oracleInstance.getGameWinner(),
	  oracleInstance.getName1(), 
	  oracleInstance.getName2(),
      oracleInstance.updateGameWinner({from: accounts[0]}),
	  oracleInstance.updateNames({from: accounts[0]}) 
    ]

    Promise.all(oraclePromises)
    .then((result) => {
      console.log('Winning team: ' +result [0])
	  console.log('Name of team 1: ' +result[1])
	  console.log('Name of team 2: ' +result[2])
	  
    })
    .catch((err) => {
      console.log(err)
    })
  })
  .catch((err) => {
    console.log(err)
  })
})