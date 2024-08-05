import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect, assert } from "chai";
import hre from "hardhat";

describe("OCToken Tests", function () {
  async function deployFixture() {
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const OCToken = await hre.ethers.getContractFactory("OCToken");
    const oCToken = await OCToken.deploy();

    return { OCToken, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right unlockTime", async function () {
      const { OCToken, owner, otherAccount } = await loadFixture(deployFixture);
    });
  });
});
