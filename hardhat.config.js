require("dotenv").config();

require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});

const {
    MAINNET_API_URL, ROPSTEN_API_URL, RINKEBY_API_URL, PRIVATE_KEY, ETHERSCAN_API_KEY
} = process.env;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    solidity: {
        version: "0.8.9",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    },
    defaultNetwork: 'rinkeby',
    networks: {
        mainnet: {
            url: MAINNET_API_URL,
            accounts: [`0x${PRIVATE_KEY}`]
        },
        ropsten: {
            url: ROPSTEN_API_URL || "",
            accounts: [`0x${PRIVATE_KEY}`]
        },
        rinkeby: {
            url: RINKEBY_API_URL || "",
            accounts: [`0x${PRIVATE_KEY}`]
        },
        localhost: {
            url: 'http://localhost:7545',
            accounts: [`0x${PRIVATE_KEY}`]
        },
    },
    gasReporter: {
        enabled: process.env.REPORT_GAS !== undefined,
        currency: "USD",
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts"
    },
};
