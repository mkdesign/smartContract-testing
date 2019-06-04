pragma solidity 0.5.4;

contract Lab3PersonalAccounting {
    enum State {ZERO ,DEBTOR, CREDITOR} 
    State public currentState;
    int256 public balance;
    address owner;

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "You must be owner in order to call this function");
        _;
    }


    function askCredit(int256 amount) public   {
        balance -= amount;
    }

    function payCredit(int256 amount) public  {
        balance +=amount;
    }

    function getBalance() public view returns (int256) {
        return balance;
    }

    function changeState() public  onlyOwner{
        if( balance > 0) {
            currentState = State.CREDITOR;
        } else if(balance < 0) {
            currentState = State.DEBTOR;
        }
        else {
            currentState = State.ZERO;
        }
    }
    

}