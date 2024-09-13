import { SignerWithAddress as HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { expect } from "chai";
import hre from "hardhat";

import { CallMeChallenge, CallMeChallenge__factory } from "../typechain-types";

describe("1. Warmup -> Call me", function () {
  let owner: HardhatEthersSigner;
  let player: HardhatEthersSigner;
  let level: CallMeChallenge;

  beforeEach(async function () {
    [owner, player] = await hre.ethers.getSigners();

    const factory: CallMeChallenge__factory = new CallMeChallenge__factory(owner);
    level = await factory.deploy();
    await level.waitForDeployment();
  });

  it("should be completed", async function () {
    expect(await level.connect(player).isComplete()).to.be.false;

    const tx = await level.callme();
    await tx.wait();

    expect(await level.connect(player).isComplete()).to.be.true;
  });
});
