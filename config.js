// Import dotenv to load environment variables from a .env file
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env if it exists

// Determine the environment
const isProduction = process.env.NODE_ENV === 'production';
const isCertification = process.env.NODE_ENV === 'certification';

// Set configurations based on the environment
export const API_URL = isProduction
    ? process.env.PROD_API_URL
    : process.env.CERT_API_URL;

export const SESSION_FILE = isProduction
    ? process.env.PROD_SESSION_FILE
    : process.env.CERT_SESSION_FILE;

export const LOGIN_CREDENTIALS = isProduction
    ? {
        "login": process.env.PROD_LOGIN,
        "password": process.env.PROD_PASSWORD,
        "remember-me": true
    }
    : {
        "login": process.env.CERT_LOGIN,
        "password": process.env.CERT_PASSWORD,
        "remember-me": true
    };

export const ACCOUNT_ID = isProduction
    ? process.env.PROD_ACCOUNT_ID
    : process.env.CERT_ACCOUNT_ID;

export const DX_LINK_FILE = isProduction
    ? process.env.PROD_DX_LINK_FILE
    : process.env.CERT_DX_LINK_FILE;
