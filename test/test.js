const {expect} = require("chai");
const {ethers} = require("hardhat");

const deployUri = 'http://localhost';
const changedUri = 'http://localhost:9422';
const testTokenUri = 'http://localhost:9422/test_token_uri';

describe("IliaZharkovCollection", function () {
    it(`Should return the new greeting once it's changed`, async function () {
        const collection = await ethers.getContractFactory(`IliaZharkovCollection`);
        const contract = await collection.deploy(deployUri);
        await contract.deployed();

        expect(await contract.contractURI()).to.equal(deployUri);

        const tx1 = await collection.updateContractURI(changedUri);
        // wait until the transaction is mined
        await tx1.wait();

        expect(await contract.contractURI()).to.equal(changedUri);

        const currentTokenId = await collection.currentTokenId();

        const tx2 = await collection.mint(testTokenUri)
        await tx2.wait();

        expect(await contract.currentTokenId()).to.equal(currentTokenId + 1);
    });
});
