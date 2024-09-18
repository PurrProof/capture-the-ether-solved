import { SignerWithAddress as HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { mine } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import hre, { network, userConfig } from "hardhat";
import { HardhatNetworkConfig } from "hardhat/types";

import { PredictTheFutureChallenge, PredictTheFutureChallenge__factory } from "../typechain-types";
import { PredictTheFutureSolution, PredictTheFutureSolution__factory } from "../typechain-types";

describe("7. Lotteries -> Predict the future", function () {
  let owner: HardhatEthersSigner;
  let player: HardhatEthersSigner;
  let level: PredictTheFutureChallenge;
  let solution: PredictTheFutureSolution;

  beforeEach(async function () {
    [owner, player] = await hre.ethers.getSigners();
    player;

    const factory: PredictTheFutureChallenge__factory = new PredictTheFutureChallenge__factory(owner);
    level = await factory.deploy({ value: hre.ethers.parseEther("1") });
    await level.waitForDeployment();

    await mine(Math.ceil(Math.random() * 10));
  });

  it("should be completed", async function () {
    const factory: PredictTheFutureSolution__factory = new PredictTheFutureSolution__factory(owner);
    solution = await factory.deploy(await level.getAddress(), { value: hre.ethers.parseEther("1") });
    await solution.waitForDeployment();

    // wait in cycle while condition will be settled
    // probability is 1/10
    let isComplete = false;
    while (!isComplete) {
      if (network.name == "hardhat" && !(network.config as HardhatNetworkConfig).mining.auto) {
        await mine();
      }

      try {
        //tx could be reverted
        const tx = await solution.settle();
        await tx.wait();
      } catch (e) {
        //console.log(e.message);
        //console.log("tx reverted, wait next block");
        continue;
      }

      isComplete = await level.isComplete();
    }

    expect(await hre.ethers.provider.getBalance(level)).to.be.eq(0);
  });
});
