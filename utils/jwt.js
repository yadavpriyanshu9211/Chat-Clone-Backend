import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const ACCESS_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

// --- Check for missing secrets (Prevents "secretOrPrivateKey must have a value") ---
if (!ACCESS_SECRET) {
  throw new Error("JWT_SECRET is missing in .env file");
}

if (!REFRESH_SECRET) {
  throw new Error("REFRESH_SECRET is missing in .env file");
}

// --- Generate Access Token ---
export const generateAccessToken = (payload) => {
  return jwt.sign(payload, ACCESS_SECRET, {
    expiresIn: "3h",
  });
};

// --- Generate Refresh Token ---
export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, REFRESH_SECRET, {
    expiresIn: "10d",
  });
};
