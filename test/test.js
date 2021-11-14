const {expect} = require("chai");
const {ethers} = require("hardhat");

const deployContractUri = 'http://localhost/contract';
const deployBaseUri = 'http://localhost/base';
const changedContractUri = 'http://localhost:9422/contract';
const changedBaseUri = 'http://localhost:9422/base';
const testTokenRecipient = '0xACf12F2f732c09b95e39CF8f7d15bf1CA264B086';

describe("IliaZharkovCollection", function () {
    it(`Should deploy contract`, async function () {
        const collection = await ethers.getContractFactory(`IliaZharkovCollection`);

        // deploy check
        const contract = await collection.deploy(deployContractUri, deployBaseUri);
        await contract.deployed();

        expect(await contract.contractURI()).to.equal(deployContractUri);

        // change and check contract metadata uri
        const tx1 = await collection.updateContractURI(changedContractUri);
        await tx1.wait();
        expect(await contract.contractURI()).to.equal(changedContractUri);

        // change and check base token metadata uri
        const tx2 = await collection.updateBaseURI(changedBaseUri);
        await tx2.wait();

        // mint check
        const currentTokenId = await collection.currentTokenId();

        const tx3 = await collection.mint(testTokenRecipient)
        await tx3.wait();

        const mintedTokenId = currentTokenId + 1;
        expect(await contract.currentTokenId()).to.equal(mintedTokenId);
        expect(await contract.tokenURI()).to.equal(`${changedBaseUri}${mintedTokenId}`);
    });
});
