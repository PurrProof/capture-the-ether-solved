import { SignerWithAddress as HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { expect } from "chai";
import hre from "hardhat";

import { GuessTheNewNumberChallenge, GuessTheNewNumberChallenge__factory } from "../typechain-types";
import { GuessTheNewNumberSolution, GuessTheNewNumberSolution__factory } from "../typechain-types";

describe("6. Lotteries -> Guess the new number  ", function () {
  let owner: HardhatEthersSigner;
  let player: HardhatEthersSigner;
  let level: GuessTheNewNumberChallenge;
  let solution: GuessTheNewNumberSolution;

  beforeEach(async function () {
    [owner, player] = await hre.ethers.getSigners();
    player;

    const factory: GuessTheNewNumberChallenge__factory = new GuessTheNewNumberChallenge__factory(owner);
    level = await factory.deploy({ value: hre.ethers.parseEther("1") });
    await level.waitForDeployment();
  });

  it("should be completed", async function () {
    // solution contract guesses the number in a constructor;
    // solution generates the password using same algorythm/blockdata as the challenge has
    const factory: GuessTheNewNumberSolution__factory = new GuessTheNewNumberSolution__factory(owner);
    solution = await factory.deploy(await level.getAddress(), { value: hre.ethers.parseEther("1") });
    await solution.waitForDeployment();

    expect(await level.isComplete()).to.be.true;
  });
});
