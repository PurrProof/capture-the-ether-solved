import { SignerWithAddress as HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { mine } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import hre from "hardhat";

import { PredictTheBlockHashChallenge, PredictTheBlockHashChallenge__factory } from "../typechain-types";

describe("8. Lotteries -> Predict the block hash", function () {
  let owner: HardhatEthersSigner;
  let player: HardhatEthersSigner;
  let level: PredictTheBlockHashChallenge;

  beforeEach(async function () {
    [owner, player] = await hre.ethers.getSigners();
    player;

    const factory: PredictTheBlockHashChallenge__factory = new PredictTheBlockHashChallenge__factory(owner);
    level = await factory.deploy({ value: hre.ethers.parseEther("1") });
    await level.waitForDeployment();
  });

  it("should be completed", async function () {
    // lock in solution equals to bytes32(0)
    const tx = await level.lockInGuess(new Uint8Array(32), { value: hre.ethers.parseEther("1") });
    await expect(tx).to.be.not.reverted;
    await tx.wait();

    // blockhash is available only for latest 256 blocks, so wait a little
    await mine(257);

    // check the guess
    const tx1 = await level.settle();
    await expect(tx1).to.be.not.reverted;
    await tx1.wait();

    expect(await hre.ethers.provider.getBalance(await level.getAddress())).to.be.eq(0);
    expect(await level.isComplete()).to.be.true;
  });
});
