import { SignerWithAddress as HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { expect } from "chai";
import hre from "hardhat";

import { GuessTheNumberChallenge, GuessTheNumberChallenge__factory } from "../typechain-types";

describe("3. Lotteries -> Guess the number", function () {
  let owner: HardhatEthersSigner;
  let player: HardhatEthersSigner;
  let level: GuessTheNumberChallenge;

  beforeEach(async function () {
    [owner, player] = await hre.ethers.getSigners();
    player;

    const factory: GuessTheNumberChallenge__factory = new GuessTheNumberChallenge__factory(owner);
    level = await factory.deploy({ value: hre.ethers.parseEther("1") });
    await level.waitForDeployment();
  });

  it("should be completed", async function () {
    // number is hardcoded in contract
    const tx = await level.guess(42n, { value: hre.ethers.parseEther("1") });
    await expect(tx).to.be.not.reverted;
    await tx.wait();

    expect(await level.isComplete()).to.be.true;
  });
});
