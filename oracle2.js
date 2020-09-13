var fetch = require("fetch");
var eSportsContract = require("./build/contracts/eSports.json");
var contract = require("truffle-contract");

var Web3 = require("web3");
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

var oracleContract = contract(eSportsContract);
oracleContract.setProvider(web3.currentProvider);

web3.eth.getAccounts((err, accounts) => {
  oracleContract.deployed()
    .then((oracleInstance) => {
      oracleInstance.CallbackGetGameWinner()
	  oracleInstance.CallbackGetNames()
        .watch((err, event) => {
          fetch.fetchUrl('https://api.pandascore.co/csgo/matches/past?search[tournament_id]=1861&token=oVyHtMAirKlr9w3WUMDwJTTj7q2DvjpdRGKAziqJm8I_OI0mRmE&page[size]=3', (err, m, response) => {
			const games = JSON.parse(response.toString())
            const winner = games[2].winner.name
			const name1= games[2].opponents[0].opponent.name
			const name2= games[2].opponents[1].opponent.name
            oracleInstance.setWinningTeam(winner, { from: accounts[0] })
			oracleInstance.setNames(name1, name2 , { from: accounts[0] })
          })
        })
    })
    .catch(err => console.log(err))
})