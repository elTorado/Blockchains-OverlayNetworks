pragma solidity ^0.8.7;

contract doodleJump{
    int red = 0;
    int green = 0;
    int blue = 255;

    function setValue(int r, int g, int b) public {
        red = r;
        green = g;
        blue = b;
    }
 
    function getValue() public view returns (int, int, int){
        return (red, green, blue);
    }

}
