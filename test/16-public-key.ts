import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { expect } from "chai";
import { ContractTransactionResponse } from "ethers";
import hre from "hardhat";

import { PublicKeyChallenge, PublicKeyChallenge__factory } from "../typechain-types";

describe("16. Accounts -> Public key", function () {
  let owner: SignerWithAddress;
  let player: SignerWithAddress;
  let level: PublicKeyChallenge;

  let deploymentTx: ContractTransactionResponse | null;

  beforeEach(async function () {
    [owner, player] = await hre.ethers.getSigners();

    const factory: PublicKeyChallenge__factory = new PublicKeyChallenge__factory(owner);
    level = await factory.deploy();
    await level.waitForDeployment();
    deploymentTx = level.deploymentTransaction();
    expect(deploymentTx).to.be.not.null;
  });

  it("should be completed", async function () {
    if (deploymentTx === null) {
      expect.fail("Deployment tx is null");
    }

    // create the transaction data (without signature)
    const txData = {
      chainId: deploymentTx.chainId,
      nonce: deploymentTx.nonce,
      gasLimit: deploymentTx.gasLimit,
      maxPriorityFeePerGas: deploymentTx.maxPriorityFeePerGas,
      maxFeePerGas: deploymentTx.maxFeePerGas,
      to: deploymentTx.to,
      value: deploymentTx.value,
      data: deploymentTx.data,
      type: deploymentTx.type,
    };

    // create a transaction object
    const unsignedTx = hre.ethers.Transaction.from(txData);

    // get the transaction hash that was signed (the digest)
    const txHash = unsignedTx.unsignedHash;

    // recover the public key using the correct digest
    const publicKey = hre.ethers.SigningKey.recoverPublicKey(txHash, deploymentTx.signature);

    // compute the address from the recovered public key
    const recoveredAddress = hre.ethers.computeAddress(publicKey);
    expect(recoveredAddress).to.equal(owner.address);

    // remove the '0x04' prefix from the public key (uncompressed format)
    // https://github.com/ethers-io/ethers.js/blob/main/src.ts/crypto/signing-key.ts#L44
    /**
     *  The uncompressed public key.
     *
     * This will always begin with the prefix ``0x04`` and be 132
     * characters long (the ``0x`` prefix and 130 hexadecimal nibbles).
     */
    const publicKeyWithoutPrefix = "0x" + publicKey.slice(4);

    const tx = await level.connect(player).authenticate(publicKeyWithoutPrefix);
    await tx.wait();
    expect(await level.connect(player).isComplete()).to.be.true;
  });
});
