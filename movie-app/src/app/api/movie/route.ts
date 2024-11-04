import { query } from "@/app/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const getMoviews = `SELECT * FROM Movie`;
  const result = await query(getMoviews);

  return NextResponse.json({ result });
}
