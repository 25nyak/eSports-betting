pragma solidity ^0.4.2;

contract eSports  {
 string public teamName1;
 string public teamName2;
   string public gameWinner;
   uint256 public minimum;
   uint256 public totalBetsOne;
   uint256 public totalBetsTwo;
   address[] public playersID;
   address public owner;
   event CallbackGetGameWinner();
   event CallbackGetNames();
   struct Player {
      uint256 amt;
      uint16 teamSelected;
    }
   mapping(address => Player) public playerInfo;
    function() public payable {}
  function eSports() public {
      owner = msg.sender;
      minimum = 0.01 ether;
	  
    }
function updateGameWinner() public {
     emit CallbackGetGameWinner();
  }
  function updateNames() public {
      emit CallbackGetNames();
  }
function setWinningTeam(string teamname) public {
    require(msg.sender == owner);
    gameWinner = teamname;
  }
  function setNames(string teamname, string teamname2) public{
      require(msg.sender==owner);
      teamName1=teamname;
      teamName2=teamname2;
  }

function getGameWinner() public view returns (string) {
    return gameWinner;
  }
  function getName1() public view returns (string){
      return teamName1;
  }
  function getName2() public view returns (string){
      return teamName2;
      
  }

function checkPlayer(address player) public view returns(bool){
      for(uint256 i = 0; i < playersID.length; i++){
         if(playersID[i] == player) return true;
      }
      return false;
    }
function bet(uint8 _teamSelected) public payable {
      require(!checkPlayer(msg.sender));
      require(msg.value >= minimum);
      playerInfo[msg.sender].amt = msg.value;
      playerInfo[msg.sender].teamSelected = _teamSelected;
      playersID.push(msg.sender);
      if (_teamSelected == 1){
          totalBetsOne += msg.value;
      }
      else{
          totalBetsTwo += msg.value;
      }
    }
    function AmountOne() public view returns(uint256){
           return totalBetsOne;
        }
    function AmountTwo() public view returns(uint256){
           return totalBetsTwo;
        }
    function kill() public {
      if(msg.sender == owner) selfdestruct(owner);
    }
    
    function distributePrizes(uint16 teamwinner) public {
      address[1000] memory winners;
      uint256 count = 0;
      uint256 totalWin = 0;
      uint256 totalLost = 0;
      address playerAddress;
      for(uint256 i = 0; i < playersID.length; i++){
         playerAddress = playersID[i];
         if(playerInfo[playerAddress].teamSelected==teamwinner){
            winners[count] = playerAddress;
            count++;
         }
      }
      if ( teamwinner==1 ){
         totalWin = totalBetsOne;
         totalLost = totalBetsTwo;
      }
      else{
          totalWin = totalBetsTwo;
          totalLost = totalBetsOne;
      }
      for(uint256 j = 0; j < count; j++){
         if(winners[j] != address(0))
            address winner = winners[j];
         uint256 bett = playerInfo[winner].amt;
         winners[j].transfer(bett+(bett/totalWin)*totalLost);
      }
      delete playerInfo[playerAddress];
      playersID.length = 0;
      totalLost = 0;
      totalWin = 0;
      totalBetsOne = 0;
      totalBetsTwo = 0;
    }

}