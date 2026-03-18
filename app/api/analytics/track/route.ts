import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Visitor from "@/models/Visitor";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { path } = await request.json();
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    await Visitor.create({
      ip,
      userAgent,
      path,
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const stats = await Visitor.aggregate([
      {
        $group: {
          _id: null,
          totalVisits: { $sum: 1 },
          uniqueVisitors: { $addToSet: "$ip" },
        },
      },
      {
        $project: {
          totalVisits: 1,
          uniqueCount: { $size: "$uniqueVisitors" },
        },
      },
    ]);

    return NextResponse.json(stats[0] || { totalVisits: 0, uniqueCount: 0 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
