import { uploadToNFTStorage } from '../lib/nftUploader';

const handleSignUp = async () => {
  const imageFile = selectedFile; // from <input type="file" />
  const emailHash = sha256(email); // or however you hash it
  const metadataUrl = await uploadToNFTStorage({
    name: preferredName,
    emailHash,
    imageFile,
  });

  // Call mint and pass tokenURI if contract supports it
  console.log("Uploaded metadata at:", metadataUrl);
};
