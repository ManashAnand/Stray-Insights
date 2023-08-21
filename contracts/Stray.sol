// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0  <=0.9.0;

contract stray {
    struct Stray{
        string name;
        string message;
        uint timeStamps;
        address from;
    }

    Stray[] strays;
    address payable owner;
    // ye deploy jo karega uska addreess hai

    constructor(){
        owner = payable(msg.sender);
        // owner ko assign kar rhe hai apna address aur sath me usko payable bana rhe hai
    }

    function pay(string memory _name,string memory _message) public payable {
            require(msg.value > 0,"Please pay more than 0 ether");
            // if(condition, if not satisfy);
            owner.transfer(msg.value);
            
            strays.push(Stray(_name,_message,block.timestamp,msg.sender));
            // strays ek Stray stuct ka array hai 
            // usme har func call pe ek struct push kar rhe hai
            // jiska argument name,message, 
            // block.timestamp -> har transaction ka time deta hai
            // msg.sender -> ab jo is function ko call karega uska address dega  
    }

    function getStrays() public view returns (Stray[] memory) {
        return strays;
    }
}