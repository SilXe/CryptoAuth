import axios from 'axios';
import { ethers } from 'ethers';

const API_KEY = process.env.REACT_APP_PINATA_API_KEY;
const API_SECRET = process.env.REACT_APP_PINATA_SECRET;

export const uploadToPinata = async ({ name, email }) => {
  try {
    const hashedName = ethers.keccak256(ethers.toUtf8Bytes(name));
    const hashedEmail = ethers.keccak256(ethers.toUtf8Bytes(email));

    const metadata = {
      name: 'CryptoAuth NFT',
      description: 'Identity-bound access NFT',
      attributes: [
        { trait_type: 'Hashed Name', value: hashedName },
        { trait_type: 'Hashed Email', value: hashedEmail },
        { trait_type: 'Role', value: 'Member' }
      ]
    };

    const res = await axios.post(
      'https://api.pinata.cloud/pinning/pinJSONToIPFS',
      metadata,
      {
        headers: {
          'Content-Type': 'application/json',
          pinata_api_key: API_KEY,
          pinata_secret_api_key: API_SECRET
        }
      }
    );

    const cid = res.data.IpfsHash;
    return `https://gateway.pinata.cloud/ipfs/${cid}`;
  } catch (err) {
    console.error('❌ Failed to upload to Pinata:', err);
    throw err;
  }
};
