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
        const blockIdAndBlock='0xdc0b26359f58f82b467a81fb381ff992372fbc0e37cf24be66dba97e9048e966'
        const blockData = await client.getBlock(blockIdAndBlock);
        const message = blockData.payload.data.slice(2);
        const reversedData = Buffer.from(message, "hex").toString("utf8");
        console.log(reversedData);


    } catch (error) {
        console.error('Error: ', error);
    }
}

run().then(() => process.exit());