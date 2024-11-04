import { Movie } from "@/app/page";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function MovieCard({ movie }: { movie: Movie }) {
  const { id, image_url, title, genre, release_year } = movie;

  return (
    <Link
      href={`/movie/${id}`}
      className="w-full flex flex-col items-center gap-[16px]"
    >
      <Image
        src={image_url}
        alt="poster"
        width={200}
        height={300}
        className="max-w-[200px] w-full h-auto rounded-[12px]"
      />
      <div className="flex flex-col gap-[8px] items-center">
        <h5 className="font-bold">{title}</h5>
        <span className="text-gray-700 text-sm">{genre}</span>
        <span className="text-sm">{release_year}</span>
        <span>평점</span>
      </div>
    </Link>
  );
}

export default MovieCard;
