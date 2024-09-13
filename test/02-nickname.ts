import { SignerWithAddress as HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { expect } from "chai";
import { BaseContract } from "ethers";
import hre from "hardhat";

import { NicknameChallenge } from "../typechain-types";
import { CaptureTheEther, CaptureTheEther__factory } from "../typechain-types";

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
    const mainAddress = await main.getAddress();
    const mainArtifact = await hre.artifacts.readArtifact("CaptureTheEther");
    const mainInstance = new BaseContract("CaptureTheEther", mainArtifact.abi, player).attach(
      mainAddress,
    ) as CaptureTheEther;

    // deploy Nickname level through CaptureTheEther main contract
    const tx = await mainInstance.deployNicknameChallenge(player);
    await expect(tx).to.be.not.reverted;
    await tx.wait();

    // set player's nickname through CaptureTheEther main contract
    const tx1 = await mainInstance.setNickname(hre.ethers.encodeBytes32String("PurrProof"));
    await expect(tx1).to.be.not.reverted;
    await tx1.wait();

    // check nickname is set
    expect(hre.ethers.decodeBytes32String(await mainInstance.nicknameOf(player))).to.be.eq("PurrProof");

    // check level completeness
    const levelAddress = await main.mapPlayerNicknameChallenge(player);
    const levelArtifact = await hre.artifacts.readArtifact("NicknameChallenge");
    const levelInstance = new BaseContract("NicknameChallenge", levelArtifact.abi, player).attach(
      levelAddress,
    ) as NicknameChallenge;
    expect(await levelInstance.connect(player).isComplete()).to.be.true;
  });
});
