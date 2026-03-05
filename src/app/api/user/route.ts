import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/lib/models/User";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { walletAddress, name, avatar, bio, website, twitter, instagram, youtube } = body;

    if (!walletAddress) {
      return NextResponse.json(
        { error: "Wallet address is required" },
        { status: 400 }
      );
    }

    const normalizedAddress = walletAddress.toLowerCase();

    const existingUser = await User.findOne({ walletAddress: normalizedAddress });
    
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists", exists: true },
        { status: 409 }
      );
    }

    const user = await User.create({
      walletAddress: normalizedAddress,
      name: name || "",
      avatar: avatar || "",
      bio: bio || "",
      website: website || "",
      twitter: twitter || "",
      instagram: instagram || "",
      youtube: youtube || "",
    });

    return NextResponse.json({ user, exists: false }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const walletAddress = searchParams.get("walletAddress");

    if (!walletAddress) {
      return NextResponse.json(
        { error: "Wallet address is required" },
        { status: 400 }
      );
    }

    const normalizedAddress = walletAddress.toLowerCase();
    const user = await User.findOne({ walletAddress: normalizedAddress });

    if (!user) {
      return NextResponse.json({ exists: false, user: null });
    }

    return NextResponse.json({ exists: true, user });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { walletAddress, name, avatar, bio, website, twitter, instagram, youtube } = body;

    if (!walletAddress) {
      return NextResponse.json(
        { error: "Wallet address is required" },
        { status: 400 }
      );
    }

    const normalizedAddress = walletAddress.toLowerCase();

    const user = await User.findOneAndUpdate(
      { walletAddress: normalizedAddress },
      {
        $set: {
          ...(name !== undefined && { name }),
          ...(avatar !== undefined && { avatar }),
          ...(bio !== undefined && { bio }),
          ...(website !== undefined && { website }),
          ...(twitter !== undefined && { twitter }),
          ...(instagram !== undefined && { instagram }),
          ...(youtube !== undefined && { youtube }),
        },
      },
      { new: true, upsert: true }
    );

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}
