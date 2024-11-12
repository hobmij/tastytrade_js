import axios from 'axios';
import fs from 'fs';
import { readJsonFromFile, loadSessionParameters } from './myFileUtils.js';

import {API_URL, SESSION_FILE} from './config.js'

// Function to terminate the session
async function terminateSession(sessionToken) {
    try {
        const response = await axios.delete(`${API_URL}/sessions`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': sessionToken
            }
        });
        console.log("Session successfully terminated.");

        // Delete the session file after successful termination
        await fs.promises.unlink(SESSION_FILE);
    } catch (error) {
        console.error("Failed to terminate session:", error.response ? error.response.statusText : error.message);
    }
}

// Main function to control the workflow
async function main() {
    const sessionParameters = await loadSessionParameters(SESSION_FILE); // Load session parameters first
    if (sessionParameters && sessionParameters.data["session-token"]){
        console.log(sessionParameters); // Confirm loaded data
        await terminateSession(sessionParameters.data["session-token"]);
    } else {
        console.log("Failed to load session parameters")
    }
}

// Run main function
main();
