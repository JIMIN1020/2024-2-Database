import { query } from "@/app/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const getMovie = `SELECT * FROM Movie WHERE id = '${id}'`;
  const result = await query(getMovie);

  return NextResponse.json({ result });
}
