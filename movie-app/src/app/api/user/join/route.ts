import { insertQuery } from "@/app/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { id, name, password } = await req.json();
  const joinQuery = `INSERT INTO User (name, id, password) VALUES (?, ?, ?)`;
  const result = await insertQuery(joinQuery, [name, id, password]);

  return NextResponse.json({ result });
}
