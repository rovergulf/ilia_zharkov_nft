const {API_KEY, PRIVATE_KEY, CONTRACT_ADDR} = process.env;

const {ethers} = require('hardhat');
const contract = require('../artifacts/contracts/Collection.sol/IliaZharkovCollection.json');

// Alchemy provider
const alchemyProvider = new ethers.providers.AlchemyProvider(network = 'rinkeby', API_KEY);

// signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

const collection = new ethers.Contract(CONTRACT_ADDR, contract.abi, signer);

async function main() {
    const currentUrl = await collection.contractURI();
    console.log('Current Contract URI:', currentUrl);

    console.log('Setting new url...');
    const newUri = `http://api.rovergulf.net/nft/metadata/zharkov/1`;
    const tx = await collection.updateContractURI(newUri);
    await tx.wait();

    console.log(`Successfully changed contract URI to: ${newUri}. \nTx: ${tx.hash}`);
}

main()
    .then(res => process.exit(0))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
