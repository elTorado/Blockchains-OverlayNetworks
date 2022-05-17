pragma solidity ^0.8.7;

contract doodleJump{
    mapping (address => uint) highscore;
    mapping (address => bool) dead;
    mapping (address => bool) inGame;

    function setHighScore(uint hs) public {
        require( !dead[msg.sender], "the account of this character is dead");
        require( inGame[msg.sender], "this account is not in a game");
        if(highscore[msg.sender] < hs){
            highscore[msg.sender] = hs;
        }
        inGame[msg.sender] = false;
    }

   function getHighScore() public view returns (uint){
        return (highscore[msg.sender]);
    }

    function die() public {
        require( inGame[msg.sender], "this account is not in a game");
        require( !dead[msg.sender], "the character of this account is already dead");
        dead[msg.sender] = true;
    }

    function startGame() public {
        require( !dead[msg.sender], "the character of this account is dead");
        require( !inGame[msg.sender], "this account is already in a game");
        inGame[msg.sender] = true;
    }

    function getValue() public view returns (uint, uint, uint){
        require( !dead[msg.sender], "the account of this character is dead");
        return (random(255), random1(255), random2(255));
    }

    function isDead() public view returns(bool){
        return dead[msg.sender];
    }

    function random(uint number) public view returns(uint){
        return (uint(keccak256(abi.encodePacked(msg.sender)))%10000)*3 % number;
    }

    function random1(uint number) public view returns(uint){
        return (uint(keccak256(abi.encodePacked(msg.sender)))%10000)*2 % number;
    }

    function random2(uint number) public view returns(uint){
        return uint(keccak256(abi.encodePacked(msg.sender))) % number;
    }

}
