import { NFTStorage, File } from 'nft.storage';

const NFT_STORAGE_TOKEN = process.env.REACT_APP_NFT_STORAGE_TOKEN;

const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });

export async function uploadToNFTStorage({ name, emailHash, imageFile }) {
  const metadata = await client.store({
    name,
    description: 'CryptoAuth Identity NFT',
    image: new File([imageFile], 'profile.png', { type: imageFile.type }),
    properties: {
      emailHash,
      role: 'Member',
    },
  });

  return metadata.url; // ipfs://... URL
}
