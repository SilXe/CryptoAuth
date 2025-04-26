import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../lib/contractInfo";
import { ethers } from "ethers";

const ProfilePage = () => {
  const { user } = useAuth();
  const [metadata, setMetadata] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch user's NFT metadata
  useEffect(() => {
    const fetchMetadata = async () => {
      if (!user?.walletAddress) return;

      try {
        const provider = user.provider;
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

        const balance = await contract.balanceOf(user.walletAddress);

        if (balance.toString() === '0') {
          console.error("❌ No NFT found for this wallet.");
          return;
        }

        // ✅ Assumption: Token ID = 0 for now
        const tokenId = 5;

        const tokenURI = await contract.tokenURI(tokenId);
        const response = await fetch(tokenURI);
        const metadataJson = await response.json();

        setMetadata(metadataJson);
      } catch (err) {
        console.error("❌ Error fetching metadata:", err);
      }
    };

    fetchMetadata();
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVerify = async () => {
    if (!formData.name || !formData.email || !metadata) return;

    setLoading(true);

    const eNH = metadata.attributes.find(attr => attr.trait_type === 'Hashed Name')?.value
    console.log(eNH)

    try {
      const res = await fetch("http://localhost:5000/api/verify-metadata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          expectedNameHash: metadata.attributes.find(attr => attr.trait_type === 'Hashed Name')?.value,
          expectedEmailHash: metadata.attributes.find(attr => attr.trait_type === 'Hashed Email')?.value,
        }),
      });

      const data = await res.json();
      if (data.verified) {
        setVerified(true);
      } else {
        setVerified(false);
        alert("Verification failed. Please check your inputs.");
      }
    } catch (err) {
      console.error("❌ Verification error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <button
        onClick={() => window.location.href = '/'}
        style={{
          background: "none",
          border: "none",
          fontSize: "1.5rem",
          fontWeight: "bold",
          cursor: "pointer",
          color: "#4f46e5",
          marginBottom: "2rem",
        }}
      >
        CryptoAuth
      </button>

      <h2 style={{ marginBottom: "1rem" }}>Profile</h2>

      {verified ? (
        <div>
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Role:</strong> {metadata.attributes.find(attr => attr.trait_type === "Role")?.value}</p>
        </div>
      ) : (
        <>
          <p>Enter your info to verify your identity:</p>

          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            style={{
              padding: "0.75rem",
              fontSize: "1rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
              width: "80%",
              maxWidth: "300px",
              marginBottom: "1rem",
            }}
          />
          <br />

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            style={{
              padding: "0.75rem",
              fontSize: "1rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
              width: "80%",
              maxWidth: "300px",
              marginBottom: "1.5rem",
            }}
          />
          <br />

          <button
            onClick={handleVerify}
            disabled={loading}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#4f46e5",
              color: "white",
              fontSize: "1rem",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
