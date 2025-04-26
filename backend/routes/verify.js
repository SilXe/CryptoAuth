import express from "express";
import { hashWithSalt } from "../utils/hashUtil.js";

const router = express.Router();

// POST /api/hash-metadata
router.post("/hash-metadata", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and Email required" });
  }

  const hashedName = hashWithSalt(name);
  const hashedEmail = hashWithSalt(email);

  res.json({ hashedName, hashedEmail });
});

// POST /api/verify-metadata
router.post("/verify-metadata", (req, res) => {
  const { name, email, expectedNameHash, expectedEmailHash } = req.body;

  if (!name || !email || !expectedNameHash || !expectedEmailHash) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const nameHash = hashWithSalt(name);
  const emailHash = hashWithSalt(email);

  const nameMatch = nameHash === expectedNameHash;
  const emailMatch = emailHash === expectedEmailHash;

  if (nameMatch && emailMatch) {
    return res.json({ verified: true });
  } 
  
  else {
    return res.json({ verified: false });
  }
});

export default router;