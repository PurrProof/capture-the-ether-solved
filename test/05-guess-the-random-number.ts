import { SignerWithAddress as HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { expect } from "chai";
import hre from "hardhat";

import { GuessTheRandomNumberChallenge, GuessTheRandomNumberChallenge__factory } from "../typechain-types";

describe("5. Lotteries -> Guess the random number  ", function () {
  let owner: HardhatEthersSigner;
  let player: HardhatEthersSigner;
  let level: GuessTheRandomNumberChallenge;

  beforeEach(async function () {
    [owner, player] = await hre.ethers.getSigners();
    player;

    const factory: GuessTheRandomNumberChallenge__factory = new GuessTheRandomNumberChallenge__factory(owner);
    level = await factory.deploy({ value: hre.ethers.parseEther("1") });
    await level.waitForDeployment();
  });

  it("should be completed", async function () {
    // just read the password from 0th storage slot
    const password = await hre.ethers.provider.getStorage(level, 0);

    const tx = await level.guess(hre.ethers.toNumber(password), { value: hre.ethers.parseEther("1") });
    await expect(tx).to.be.not.reverted;
    await tx.wait();

    expect(await level.isComplete()).to.be.true;
  });
});
