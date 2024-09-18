import { SignerWithAddress as HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { expect } from "chai";
import hre from "hardhat";

import { GuessTheSecretNumberChallenge, GuessTheSecretNumberChallenge__factory } from "../typechain-types";

describe("4. Lotteries -> Guess the secret number", function () {
  let owner: HardhatEthersSigner;
  let player: HardhatEthersSigner;
  let level: GuessTheSecretNumberChallenge;

  beforeEach(async function () {
    [owner, player] = await hre.ethers.getSigners();
    player;

    const factory: GuessTheSecretNumberChallenge__factory = new GuessTheSecretNumberChallenge__factory(owner);
    level = await factory.deploy({ value: hre.ethers.parseEther("1") });
    await level.waitForDeployment();
  });

  it("should be completed", async function () {
    // hash is hardcoded in contract, but argument type is uint8
    // we can bruteforce the hash
    const HASH = "0xdb81b4d58595fbbbb592d3661a34cdca14d7ab379441400cbfa1b78bc447c365";
    let i: number;
    for (i = 0; i < 256; i++) {
      if (HASH == hre.ethers.keccak256(hre.ethers.toBeHex(i))) {
        break;
      }
    }

    if (i == 256) {
      expect.fail("Secret number not found");
    }

    const tx = await level.guess(i, { value: hre.ethers.parseEther("1") });
    await expect(tx).to.be.not.reverted;
    await tx.wait();

    expect(await level.isComplete()).to.be.true;
  });
});
