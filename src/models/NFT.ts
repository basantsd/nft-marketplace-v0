import mongoose from "mongoose";

const NFTSchema = new mongoose.Schema({
  tokenId: { type: Number, required: true, unique: true, index: true },
  creator: { type: String, required: true, index: true },
  owner: { type: String, required: true, index: true },

  name: { type: String, required: true },
  description: String,
  image: String,
  metadataUrl: String,

  collection: String,

  isListed: { type: Boolean, default: false },
  price: Number,

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.NFT || mongoose.model("NFT", NFTSchema);