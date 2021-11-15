const {API_KEY, RINKEBY_API_KEY, PRIVATE_KEY, PUBLIC_KEY, CONTRACT_ADDR} = process.env;

const {ethers} = require('hardhat');
const contract = require('../artifacts/contracts/Collection.sol/IliaZharkovCollection.json');

// Alchemy provider
const alchemyProvider = new ethers.providers.AlchemyProvider(network = 'rinkeby', RINKEBY_API_KEY);

// signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

const collection = new ethers.Contract(CONTRACT_ADDR, contract.abi, signer);

async function main() {
    console.log('Minting a new token...');

    const tx = await collection.mint(2, PUBLIC_KEY);
    await tx.wait();

    const tokenId = await collection.currentTokenId();

    console.log(`Successfully minted token with id: ${tokenId}. Tx: ${tx.hash}`);
}

main()
    .then(res => process.exit(0))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
