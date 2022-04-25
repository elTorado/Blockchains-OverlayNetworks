pragma solidity ^0.8.7;

contract doodleJump{
    uint red = random(255);
    uint green = random1(255);
    uint blue = random2(255);
    mapping (address => uint) highscore;

    function setValue(uint r, uint g, uint b) public {
        red = r;
        green = g;
        blue = b;
    }

    function setHighScore(uint hs) public {
        if(highscore[msg.sender] < hs){
            highscore[msg.sender] = hs;
        } else {
            highscore[msg.sender] = 1;
        }
    }

   function getHighScore() public view returns (uint){
        return (highscore[msg.sender]);
    }



    function getValue() public view returns (uint, uint, uint){
        return (random(255), random1(255), random2(255));
    }

    function random(uint number) public view returns(uint){
        return uint(keccak256(abi.encodePacked(block.timestamp,block.difficulty,  
        msg.sender))) % number;
    }

    function random1(uint number) public view returns(uint){
        return uint(keccak256(abi.encodePacked(block.difficulty,  
        msg.sender))) % number;
    }

    function random2(uint number) public view returns(uint){
        return uint(keccak256(abi.encodePacked(block.timestamp,  
        msg.sender))) % number;
    }

}