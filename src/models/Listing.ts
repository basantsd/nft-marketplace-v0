import mongoose from "mongoose";

const ListingSchema = new mongoose.Schema({
  listingId: { type: String, required: true, unique: true },

  tokenId: { type: Number, required: true, index: true },
  nftContract: { type: String, required: true },

  seller: { type: String, required: true, index: true },

  price: { type: Number, required: true },

  name: String,
  image: String,

  expiresAt: { type: Date, required: true },

  active: { type: Boolean, default: true },

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Listing ||
  mongoose.model("Listing", ListingSchema);