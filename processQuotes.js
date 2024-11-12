import { FeedDataFormat, DXLinkWebSocketClient, DXLinkFeed } from '@dxfeed/dxlink-api';
import { readJsonFromFile } from './myFileUtils.js';
import { DX_LINK_FILE } from './config.js';

let client, feed, intervalId;

// Subscription object
const sub1 = {
    type: 'Quote',
    symbol: 'AAPL',
    };

const emini_sub = {
    type: 'Quote',
    symbol: '/ESZ24:XCME',
    };

process.on('unhandledRejection', (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
    
    
async function startFeed() {
    try {
        // Read config data
        const dx_link = await readJsonFromFile(DX_LINK_FILE);

        console.log(dx_link);
        console.log(dx_link.data['dxlink-url']);

        // Initialize and connect client
        client = new DXLinkWebSocketClient();
        client.addErrorListener((error) => {
            console.error('DXLinkError:', error);
            console.error("DXLinkError:", JSON.stringify(error, null, 2));
            process.exit(1);
        });

        await client.connect(dx_link.data['dxlink-url']); // await ensures we don't proceed until connected


        // Set authentication token once connected
        client.setAuthToken(dx_link.data['token']);

        // Configure the feed with desired format and fields
        feed = new DXLinkFeed(client, 'AUTO');
        feed.configure({
            acceptAggregationPeriod: 10,
            acceptDataFormat: FeedDataFormat.COMPACT,
            acceptEventFields: {
                Quote: ['eventSymbol', 'askPrice', 'bidPrice'],
                Candle: ['eventSymbol', 'open', 'close', 'high', 'low', 'volume'],
            },
        });

        feed.addSubscriptions(emini_sub);

        // Event listener to process received events
        feed.addEventListener((events) => {
            console.log('Myclient tick event:', events);
        });

        // Set interval for periodic status log
        intervalId = setInterval(() => {
            console.log('still running...');
        }, 3000);

    } catch (error) {
        console.error('An error occurred:', error);
        console.error("Error Details:", JSON.stringify(error, null, 2));
        process.exit(2);
    }
}

// Function to gracefully shut down
function shutdown() {
    console.log('Shutting down gracefully...');
    
    if (intervalId) clearInterval(intervalId); // Stop the status log interval
    if (feed) {
        feed.removeSubscriptions(emini_sub);
    }
    if (client) client.close();                // Close the WebSocket connection

    console.log('Shutdown complete.');
    process.exit(0);                           // Exit the process
}

// Start the feed
startFeed();

// Listen for shutdown signals
process.on('SIGINT', shutdown);  // For Ctrl+C in terminal
process.on('SIGTERM', shutdown); // For termination signals
