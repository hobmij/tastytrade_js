// myFileUtils.js
import { writeFile, readFile } from 'fs/promises';

// Function to read the session parameters from file
export async function loadSessionParameters(json_file) {
    try {
        const json_object = await readJsonFromFile(json_file);
        console.log("Data read from JSON file:", json_object);
        return json_object;
    } catch (error) {
        console.error("Failed to read JSON file:", error);
        return null;
    }
}

// Function to read a JSON file and return the object
export async function readJsonFromFile(fileName) {
    try {
        const data = await readFile(fileName, 'utf8');
        return JSON.parse(data);
    }
    catch (err) {
        console.error('Error reading file', err);
        throw err;
    }
}

// Function to save a JSON object to a file
export async function saveJsonToFile(fileName, jsonObject) {
    try{
        await writeFile(fileName, JSON.stringify(jsonObject, null, 2));
        console.log('JSON data saved to', fileName);
    } catch (err) {
        console.error('Error writing file', err);
    }
}


