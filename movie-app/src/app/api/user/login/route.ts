import { query } from "@/app/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { id, password } = await req.json();
  const loginQuery = `SELECT * FROM User WHERE id = '${id}' AND password = '${password}'`;
  const result = await query(loginQuery);

  return NextResponse.json({ result });
}
