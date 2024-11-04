import { query } from "@/app/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const getMoviews = `SELECT m.id, m.title, m.genre, m.summary, m.release_year, m.image_url, avg_r.avg_rating FROM Movie m
  LEFT JOIN (SELECT movie_id, AVG(rating) AS avg_rating FROM Rating GROUP BY movie_id) avg_r ON m.id = avg_r.movie_id;
`;
  const result = await query(getMoviews);

  return NextResponse.json({ result });
}
