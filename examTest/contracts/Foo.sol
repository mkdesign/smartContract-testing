pragma solidity ^0.5.4;

contract Foo {
  address  owner;
  uint256 bar;
  modifier onlyOwner() {
    require(owner == msg.sender, "require owner = msg.sender");
    _;
  }
  
  constructor () public payable { 
    owner = msg.sender;
  } 
  
  function baz(uint256 quz) public onlyOwner() {
    require(quz > 2, "quz must be > 2");
    // owner.transfer(quz); 
  }
}
