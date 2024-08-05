import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect, assert } from "chai";
import hre from "hardhat";

describe("OCToken Tests", function () {
  async function deployFixture() {
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const OCToken = await hre.ethers.getContractFactory("OCToken");
    const ocToken = await OCToken.deploy();

    return { ocToken, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should deploy the contract and get the right price for 1 ETH", async function () {
      const { ocToken, owner, otherAccount } = await loadFixture(deployFixture);
      const ethPriceFromChainLink =
        await ocToken.getChainlinkDataFeedLatestAnswer();

      const ethInDollars = hre.ethers.formatUnits(ethPriceFromChainLink, 8);
      assert(parseInt(ethInDollars) >= 2500 && parseInt(ethInDollars) <= 3000);
    });
  });

  describe("Mint", function () {
    it("Should not mint of not enough funds are provided", async function () {
      const { ocToken, owner, otherAccount } = await loadFixture(deployFixture);
      const ethPriceFromChainLink =
        await ocToken.getChainlinkDataFeedLatestAnswer();
      const ethInDollars = hre.ethers.formatUnits(ethPriceFromChainLink, 8);
      const amountMint = 18;
      const amountEthFor18Tokens = (10 * amountMint) / parseInt(ethInDollars);
      const priceFor18Tokens = hre.ethers.parseEther(
        amountEthFor18Tokens.toString(),
      );
      await expect(
        ocToken.mint(owner.address, 20, { value: priceFor18Tokens }),
      ).to.be.revertedWith("Not enough funds provided.");
    });

    it("should mint if enough funds are provided", async function () {
      const { ocToken, owner, otherAccount } = await loadFixture(deployFixture);
      const ethPriceFromChainLink =
        await ocToken.getChainlinkDataFeedLatestAnswer();
      const ethInDollars = hre.ethers.formatUnits(ethPriceFromChainLink, 8);
      const amountMint = 20;
      const amountEthFor20Tokens = (10 * amountMint) / parseInt(ethInDollars);
      const priceFor20Tokens = hre.ethers.parseEther(
        amountEthFor20Tokens.toString(),
      );
      await ocToken.mint(owner.address, 20, { value: priceFor20Tokens });
      const balanceOfOwner = await ocToken.balanceOf(owner.address);
      assert(Number(balanceOfOwner) === 20);
    });
  });
});
