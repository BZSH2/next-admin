import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    code: 200,
    message: "ok",
    data: {
      status: "ok",
      timestamp: new Date().toISOString(),
    },
  });
}
