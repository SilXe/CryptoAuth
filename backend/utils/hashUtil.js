import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const SALT = process.env.HASH_SALT || "fallback_salt";

export function hashWithSalt(input, algorithm = "sha256") {
  return crypto.createHash(algorithm).update(input + SALT).digest("hex");
}
