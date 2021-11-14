const {ethers} = require("hardhat");
const {utils} = require("ethers");

const {
    API_KEY,
    CURRENT_NETWORK = 'rinkeby'
} = process.env;

const alchemyProvider = new ethers.providers.AlchemyProvider(CURRENT_NETWORK, API_KEY);

const deployGasUsed = 2313436;

async function main() {
    console.log("Current network:", CURRENT_NETWORK);

    const gasPrice = await alchemyProvider.getGasPrice();

    const ethPrice = utils.formatUnits(gasPrice, "ether");
    const gweiPrice = utils.formatUnits(gasPrice, "gwei");

    const gw = parseFloat(gweiPrice);

    console.log(`Gas price: ${gweiPrice} gwei or ${ethPrice} ether`);
    const estimated = gw * deployGasUsed;
    console.log(`Estimated gas: ${estimated} gwei`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exit(1);
});
