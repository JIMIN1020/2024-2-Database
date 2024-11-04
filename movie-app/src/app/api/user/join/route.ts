import { query } from "@/app/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { id, name, password } = await req.json();
  const joinQuery = `INSERT INTO User (name, id, password) VALUES ('${name}', '${id}', '${password}')`;
  const result = await query(joinQuery);

  return NextResponse.json({ result });
}
