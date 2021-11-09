const {API_KEY, PRIVATE_KEY, CONTRACT_ADDR} = process.env;

const {ethers} = require('hardhat');
const contract = require('../artifacts/contracts/Collection.sol/IliaZharkovCollection.json');

// Alchemy provider
const alchemyProvider = new ethers.providers.AlchemyProvider(network = 'rinkeby', API_KEY);

// signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

const collection = new ethers.Contract(CONTRACT_ADDR, contract.abi, signer);

async function main() {
    console.log('Minting a new token...');

    const tx = await collection.mint(`http://api.rovergulf.net/nft/metadata/zharkov/1`);
    await tx.wait();

    console.log('Successfully minted token. Tx:', tx.hash);
}

main()
    .then(res => process.exit(0))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
