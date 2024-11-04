import { query } from "@/app/db";
import { NextRequest, NextResponse } from "next/server";

interface Res {
  fieldCount: number;
  affectedRows: number;
  insertId: number;
  info: string;
  serverStatus: number;
  warningStatus: number;
  changedRows: number;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  const getMoviews = `SELECT m.id, m.title, m.genre, m.summary, m.release_year, m.image_url FROM WatchList wl
  JOIN Movie m ON wl.movie_id = m.id WHERE wl.user_id = '${userId}';`;

  const result = await query(getMoviews);

  return NextResponse.json({ result });
}

export async function DELETE(req: NextRequest) {
  const { userId, movieId } = await req.json();

  const deleteWatchList = `DELETE FROM WatchList WHERE movie_id = '${movieId}' AND user_id = '${userId}'`;
  const result = (await query(deleteWatchList)).valueOf() as Res;

  return NextResponse.json({
    result: result.affectedRows > 0,
  });
}

export async function POST(req: NextRequest) {
  const { userId, movieId } = await req.json();

  const postWatchList = `INSERT INTO WatchList (movie_id, user_id) VALUES ('${movieId}', '${userId}')`;
  const result = (await query(postWatchList)).valueOf() as Res;

  return NextResponse.json({
    result: result.affectedRows > 0,
  });
}
