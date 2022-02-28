//SPDX-License-Identifier: UNLICENSE
pragma solidity ^0.8.11;

contract Lottery{
    address public manager;
    address[]public players;

    constructor(){
        manager=msg.sender;
    }
    function enter()public payable{
        require(msg.value >.01 ether){
            return;
        };
         players.push(msg.sender);
    }
 function random()private view returns(uint){
     // sha3()is a particular instance of keccak256 class
     //keccak256() is aclass of algo
     return uint(keccak256(abi.encodePacked(block.difficulty,block.timestamp,players)))
 ;
 }
function pickWinner()public restricted{
    uint index = random() % players.length;
    // address (contract).balance
    payable(players[index]).transfer(address(this).balance);//address
    players = new address[](0);
}
modifier restricted(){
    require(msg.sender ==manager);
    _;

}
function getPlayers() public  view returns(address[] memory){
return players;
}
}