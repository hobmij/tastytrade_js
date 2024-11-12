import axios from 'axios';
import {API_URL, SESSION_FILE, ACCOUNT_ID} from './config.js'
import { loadSessionParameters } from './myFileUtils.js'

async function getBODBalance(session_token, dateString) {
    try {
        const response = await axios.get(`${API_URL}/accounts/${ACCOUNT_ID}/balance-snapshots`, {
            params: {
                'snapshot-date': dateString,
                'time-of-day' : 'BOD'
            },
            headers: {
                'Authorization': `${session_token}`,
                'Content-Type': 'application/json'
            }
        });
        if (Array.isArray(response.data.items) && response.data.items.length > 0){
            const balanceInfo = balances.data.items[0];
            console.log("balance Info:", balanceInfo);
        }
        else {
            console.log("Not an array")
        }
        console.log(response.data);
        console.log(JSON.stringify(response.data, null, 2));
        const balances = response.data;
        const BODBalance = balances?.data?.beginning_of_day_equity;

        console.log("Beginning of Day Balance:", BODBalance);
        return BODBalance;
    } catch (error) {
        console.error("Error fetching BOD balance:", error.response ? error.response.statusText : error.message);
        return null;
    }
}

// Execute the function
async function main() {
    const sessionParameters = await loadSessionParameters(SESSION_FILE); // Load session parameters first
    let response = -1.0;
    console.log(sessionParameters)
    if (sessionParameters && sessionParameters.data["session-token"]){
        console.log(sessionParameters); // Confirm loaded data
        let date = "2024-11-07"
        response = await getBODBalance(sessionParameters.data["session-token"], date);
        console.log("BOD equity= ", response);
    } else {
        console.log("Failed to load session parameters")
    }
}

main();
