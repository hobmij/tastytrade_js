import axios from 'axios';
import {API_URL, SESSION_FILE, DX_LINK_FILE} from './config.js'
import { loadSessionParameters, saveJsonToFile } from './myFileUtils.js'

async function getInstrumentFutures(session_token) {
    try {
        const response = await axios.get(`${API_URL}/instruments/futures`, {
            headers: {
                'Authorization': `${session_token}`,
                'Content-Type': 'application/json'
            }
        });
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error fetching BOD balance:", error.response ? error.response.statusText : error.message);
        return null;
    }
}

// Execute the function
async function main() {
    const sessionParameters = await loadSessionParameters(SESSION_FILE); // Load session parameters first
    let response = {};
    console.log(sessionParameters)
    if (sessionParameters && sessionParameters.data["session-token"]){
        console.log(sessionParameters); // Confirm loaded data
        response = await getInstrumentFutures(sessionParameters.data["session-token"]);
        console.log("getInstrumentFutures= ", response);
        saveJsonToFile('./futures.json', response);
    } else {
        console.log("Failed to load session parameters")
    }
}

main();
