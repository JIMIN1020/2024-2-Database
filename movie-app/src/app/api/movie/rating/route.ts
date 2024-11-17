import { query } from "@/app/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId, movieId, rating } = await req.json();
  const postRating = `INSERT INTO Rating (rating, movie_id, user_id) VALUES ('${rating}', '${movieId}', '${userId}')`;
  const result = await query(postRating);

  return NextResponse.json({ result });
}

export async function PUT(req: NextRequest) {
  const { userId, movieId, rating } = await req.json();
  const putRating = `UPDATE Rating SET rating = '${rating}' WHERE movie_id = '${movieId}' AND user_id = '${userId}';`;
  const result = await query(putRating);

  return NextResponse.json({ result });
}
