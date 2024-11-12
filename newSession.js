import axios from "axios"; // Needed for a Node.js environment used for accessing RESTAPI via post etc.

import { saveJsonToFile, readJsonFromFile } from './myFileUtils.js';
import {API_URL, SESSION_FILE, LOGIN_CREDENTIALS } from './config.js'

function cleanup(){
    console.log("Cleaning up before exit...")
}

// Set up signal handlers
process.on("SIGINT", () => {
    cleanup();
    process.exit(0);
});

process.on("SIGTERM", () => {
    cleanup();
    process.exit(0)
});

async function sendPostRequest(){
    try{
        const response = await axios.post(`${API_URL}/sessions`,
            {
                "login": LOGIN_CREDENTIALS.login,
                "password": LOGIN_CREDENTIALS.password,
                "remember-me": LOGIN_CREDENTIALS["remember-me"]
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        return response.data;
    } catch(error){
        console.error("Error:", error)
    }
}

async function establishSession(){
    let responseData = {};
    console.log("The program is running...")
    responseData = await sendPostRequest(API_URL, LOGIN_CREDENTIALS)
    saveJsonToFile(SESSION_FILE, responseData)
    console.log(responseData);
}

establishSession();