import CryptoJS from 'crypto-js';

const secretKey = "elSyDaMeConsume";
const API_URL = import.meta.env.VITE_API_URL;

async function getSaltFromBackend() {
    const response = await fetch(`${API_URL}/generate-key`);
    const data = await response.json();
    return data.salt;
}

export async function encryptData(data) {
    const saltHex = await getSaltFromBackend();
    const salt = CryptoJS.enc.Hex.parse(saltHex);

    const key = CryptoJS.PBKDF2(CryptoJS.enc.Utf8.parse(secretKey), salt, {
        keySize: 256 / 32,
        iterations: 1000,
        hasher: CryptoJS.algo.SHA256
    });

    const iv = CryptoJS.lib.WordArray.random(128 / 8); 
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    const hmac = CryptoJS.HmacSHA256(encrypted.ciphertext.toString(CryptoJS.enc.Base64), key).toString();

    console.log("Salt (hex) en frontend:", saltHex);
    console.log("Clave derivada (key) en frontend (hex):", key.toString(CryptoJS.enc.Hex));
    console.log("IV en frontend (hex):", iv.toString(CryptoJS.enc.Hex));
    console.log("Ciphertext en frontend (Base64):", encrypted.ciphertext.toString(CryptoJS.enc.Base64));
    console.log("HMAC en frontend:", hmac);

    return {
        ciphertext: encrypted.ciphertext.toString(CryptoJS.enc.Base64),
        salt: saltHex,
        iv: iv.toString(CryptoJS.enc.Hex),
        hmac: hmac
    };
}
