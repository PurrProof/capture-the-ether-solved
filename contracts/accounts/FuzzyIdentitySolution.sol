pragma solidity ^0.4.21;

interface ILevel {
    function authenticate() external;
}

contract FuzzyIdentitySolution {
    bytes32 public name = "smarx";

    function authenticate(address levelAddress) external {
        ILevel(levelAddress).authenticate();
    }
}
