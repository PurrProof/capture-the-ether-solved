import { SignerWithAddress as HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { expect } from "chai";
import hre from "hardhat";

import { CaptureTheEther, CaptureTheEther__factory } from "../typechain-types";
import { NicknameChallenge, NicknameChallenge__factory } from "../typechain-types";

describe("2. Warmup -> Choose a nickname", function () {
  let owner: HardhatEthersSigner;
  let player: HardhatEthersSigner;
  let main: CaptureTheEther;

  beforeEach(async function () {
    [owner, player] = await hre.ethers.getSigners();

    const factory: CaptureTheEther__factory = new CaptureTheEther__factory(owner);
    main = await factory.deploy();
    await main.waitForDeployment();
  });

  it("should be completed", async function () {
    // according the challenge task, we know address of the Capture The Ether contract

    const mainInstance = CaptureTheEther__factory.connect(await main.getAddress(), player);

    // deploy Nickname level through CaptureTheEther main contract
    const tx = await mainInstance.deployNicknameChallenge(player);
    await expect(tx).to.be.not.reverted;
    await tx.wait();

    // set player's nickname through CaptureTheEther main contract
    const tx1 = await mainInstance.setNickname(hre.ethers.encodeBytes32String("PurrProof"));
    await expect(tx1).to.be.not.reverted;

    // check nickname is set
    expect(hre.ethers.decodeBytes32String(await main.nicknameOf(player))).to.be.eq("PurrProof");

    // check level completeness
    const levelInstance: NicknameChallenge = NicknameChallenge__factory.connect(
      await main.mapPlayerNicknameChallenge(player),
      player,
    );
    expect(await levelInstance.isComplete()).to.be.true;
  });
});
