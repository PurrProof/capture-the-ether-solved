import { SignerWithAddress as HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { expect } from "chai";
import hre from "hardhat";

import { DeployChallenge, DeployChallenge__factory } from "../typechain-types";

describe("0. Warmup -> Deploy", function () {
  let owner: HardhatEthersSigner;
  let player: HardhatEthersSigner;
  let level: DeployChallenge;

  beforeEach(async function () {
    [owner, player] = await hre.ethers.getSigners();

    const factory: DeployChallenge__factory = new DeployChallenge__factory(owner);
    level = await factory.deploy();
    await level.waitForDeployment();
  });

  it("should be completed", async function () {
    const isComplete = await level.connect(player).isComplete();
    expect(isComplete).to.be.true;
  });
});
