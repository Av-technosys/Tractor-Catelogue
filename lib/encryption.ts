import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || "fallback-key";

export const encryptPassword = (password: string) => {
  if (!password) return "";
  return CryptoJS.AES.encrypt(password, SECRET_KEY).toString();
};

export const decryptPassword = (ciphertext: string) => {
  try {
    if (!ciphertext || ciphertext.startsWith("$")) return "Bcrypt/No Data";

    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);

    return originalText || "Invalid Data";
  } catch (error) {
    console.log(error);
    return "Error Decrypting";
  }
};
