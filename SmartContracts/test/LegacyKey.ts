import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("LegacyKey", function () {
  async function deployFixture() {
    const [owner, unauthorized] = await ethers.getSigners();
    const adLegacy = "0x1234567890abcdef1234567890abcdef12345678";

    const StableUSD = await ethers.getContractFactory("StableUSD");
    const stable = await StableUSD.deploy();
    await stable.waitForDeployment();

    const LegacyKey = await ethers.getContractFactory("LegacyKey");
    const legacyKey = await LegacyKey.deploy(
      adLegacy,
      await stable.getAddress()
    );
    await legacyKey.waitForDeployment();

    return { stable, legacyKey, owner, unauthorized };
  }

  describe("Deployment", function () {
  });

  describe("Administration", function () {
    it("Should revert with the right error if the adlegacy is setup from another account", async function () {
      const { unauthorized, legacyKey } = await loadFixture(
        deployFixture
      );

      await expect(
        legacyKey.connect(unauthorized).setAdLegacy("0x1234567890abcdef1234567890abcdef12345678")
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("Should set the adlegacy", async function () {
      const { legacyKey, owner } = await loadFixture(deployFixture);
      await expect(
        await legacyKey.connect(owner).setAdLegacy("0x1234567890abcdef1234567890abcdef12345678")
      ).not.to.be.reverted;
    });
  });
});
