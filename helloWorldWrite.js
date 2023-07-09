

const { Client, initLogger } =require('@iota/client');
const Converter = require('@iota/converter');
require('dotenv').config({ path: '.env' });


async function run() {
    initLogger();
    if (!process.env.NODE_URL) {
        throw new Error('.env NODE_URL is undefined, see .env');
    }

    const client = new Client({
        // Insert your node URL in the .env.
        nodes: [process.env.NODE_URL],
        localPow: true,
    });

    try {
        if (!process.env.NON_SECURE_USE_OF_DEVELOPMENT_MNEMONIC_1) {
            throw new Error('.env mnemonic is undefined, see .env');
        }

        // Configure your own mnemonic in ".env". Since the output amount cannot be zero, the mnemonic must contain non-zero
        // balance
        const secretManager = {
            mnemonic: process.env.NON_SECURE_USE_OF_DEVELOPMENT_MNEMONIC_1,
        };

        // We generate an address from our own mnemonic so that we send the funds to ourselves
        const addresses = await client.generateAddresses(secretManager, {
            range: {
                start: 1,
                end: 2,
            },
        });
        // const message = JSON.stringify({"message": "hello world"});
        //
        //
        // const messageInTrytes = Converter.asciiToTrytes(message);
        // const tag = messageInTrytes.slice(0, 27);
        //
        // const message = JSON.stringify({ "message": "hello world" });
        // const messageInTrytes = Converter.asciiToTrytes(message);
        // const tag = messageInTrytes.slice(0, 27);
        // const data = Converter.asciiToTrytes("hello world");

        // const message = JSON.stringify({ "message": "hello world" });
        // const messageInTrytes = Converter.asciiToTrytes(message);
        // const tag = messageInTrytes.slice(0, 27);
        // const tag = Converter.asciiToTrytes("HELLOWORLDHELLOWORLDHELLOWOR");
        const data = Buffer.from("hello world", "utf8").toString("hex");
        const tag = Buffer.from("first transaction", "utf8").toString("hex");


        // We prepare the transaction
        // Insert the output address and amount to spend. The amount cannot be zero.
        const blockIdAndBlock = await client.buildAndPostBlock(secretManager, {
            // output: {
            //     address: addresses[0],
            //     amount: '100000',
            // },
            data:`0x${data}`,
            tag:`0x${tag}`,


        });

        const blockData = await client.getBlock(blockIdAndBlock[0]);

        console.log('Block data: ', blockData, '\n');
        console.log('Block: ', blockIdAndBlock, '\n');

        console.log(
            `Transaction sent: ${process.env.EXPLORER_URL}/block/${blockIdAndBlock[0]}`,
        );
    } catch (error) {
        console.error('Error: ', error);
    }
}

run().then(() => process.exit());