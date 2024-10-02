pragma solidity ^0.4.21;

contract PublicKeyChallenge {
    //address owner = 0x92b28647ae1f3264661f72fb2eb9625a89d88a31;
    address owner = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;
    bool public isComplete;

    function authenticate(bytes publicKey) public {
        require(address(keccak256(publicKey)) == owner);

        isComplete = true;
    }
}
