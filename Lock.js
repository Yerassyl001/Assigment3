// Import Hardhat and Ethereum-waffle libraries
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Bowie Contract", function () {
  let Bowie;
  let bowie;
  let owner;
  let addr1;
  let addr2;

  before(async function () {
    Bowie = await ethers.getContractFactory("Bowie");
    [owner, addr1, addr2] = await ethers.getSigners();
  });

  beforeEach(async function () {
    bowie = await Bowie.deploy(owner.address);
    await bowie.deployed();
  });

  it("Should deploy with the correct initial state", async function () {
    // Check contract name and symbol
    expect(await bowie.name()).to.equal("Bowie");
    expect(await bowie.symbol()).to.equal("DW");

    // Check the owner of the contract
    expect(await bowie.owner()).to.equal(owner.address);

    // Check that the contract is not paused
    expect(await bowie.paused()).to.equal(false);
  });

  it("Should pause and unpause the contract", async function () {
    // Pause the contract
    await bowie.pause();
    expect(await bowie.paused()).to.equal(true);

    // Unpause the contract
    await bowie.unpause();
    expect(await bowie.paused()).to.equal(false);
  });

  it("Should mint tokens when called by the owner", async function () {
    // Mint tokens
    await bowie.safeMint({ value: ethers.utils.parseEther("0.001") });
    await bowie.safeMint({ value: ethers.utils.parseEther("0.001") });

    // Check the owner's balance
    expect(await bowie.balanceOf(owner.address)).to.equal(2);
  });

  it("Should not mint tokens when called by a non-owner", async function () {
    // Mint tokens from addr1, who is not the owner
    await expect(bowie.connect(addr1).safeMint({ value: ethers.utils.parseEther("0.001") }))
      .to.be.revertedWith("Ownable: caller is not the owner");

    // Check that the non-owner's balance is still 0
    expect(await bowie.balanceOf(addr1.address)).to.equal(0);
  });
});
