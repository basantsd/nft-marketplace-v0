import mongoose, { Schema, models, model } from "mongoose";

export interface IUser {
  walletAddress: string;
  name?: string;
  avatar?: string;
  bio?: string;
  website?: string;
  twitter?: string;
  instagram?: string;
  youtube?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    walletAddress: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    name: {
      type: String,
      default: "",
    },
    avatar: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    website: {
      type: String,
      default: "",
    },
    twitter: {
      type: String,
      default: "",
    },
    instagram: {
      type: String,
      default: "",
    },
    youtube: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export const User = models.User || model<IUser>("User", UserSchema);
