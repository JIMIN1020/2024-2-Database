import { query } from "@/app/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  const getMoviews = `SELECT m.id, m.title, m.genre, m.summary, m.release_year, m.image_url, avg_r.avg_rating,
  CASE WHEN wl.movie_id IS NOT NULL THEN true ELSE false END AS hasInList, COALESCE(watch_count.watch_count, 0) AS scrap_count FROM Movie m
    LEFT JOIN (SELECT movie_id, AVG(rating) AS avg_rating FROM Rating GROUP BY movie_id) avg_r ON m.id = avg_r.movie_id
    LEFT JOIN WatchList wl ON wl.movie_id = m.id AND wl.user_id = '${userId}'
    LEFT JOIN (
      SELECT movie_id, COUNT(*) AS watch_count
      FROM WatchList
      GROUP BY movie_id
    ) watch_count ON m.id = watch_count.movie_id;;
`;
  const result = await query(getMoviews);

  return NextResponse.json({ result });
}
