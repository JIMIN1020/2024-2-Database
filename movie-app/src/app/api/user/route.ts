import { query } from "@/app/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("id");
  const getUser = `SELECT * FROM User WHERE id = '${userId}'`;
  const result = await query(getUser);

  return NextResponse.json({ result });
}
