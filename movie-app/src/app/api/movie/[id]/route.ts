import { query } from "@/app/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  const getMovie = `SELECT m.id, m.title, m.genre, m.summary, m.release_year, m.image_url, r.rating, avg_r.avg_rating
    FROM Movie m
    LEFT JOIN Rating r ON m.id = r.movie_id AND r.user_id = '${userId}'
    LEFT JOIN (SELECT movie_id, AVG(rating) AS avg_rating FROM Rating GROUP BY movie_id) avg_r ON m.id = avg_r.movie_id
    WHERE m.id = '${id}';
`;
  const result = await query(getMovie);

  return NextResponse.json({ result });
}
