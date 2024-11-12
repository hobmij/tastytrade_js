// Code snipit to display the active environmental variables defined in .env exported in config.js
// The .env file is not uploaded to the git repository and should be placed in the .gitignore file
import {API_URL, SESSION_FILE, ACCOUNT_ID, LOGIN_CREDENTIALS, DX_LINK_FILE} from './config.js'

console.log("API_URL: ", API_URL);
console.log("SESSION_FILE: ", SESSION_FILE);
console.log("ACCOUNT_ID: ", ACCOUNT_ID);
console.log("LOGIN_CREDENTIALS: ", LOGIN_CREDENTIALS);
console.log("DX_LINK_FILE:", DX_LINK_FILE);

