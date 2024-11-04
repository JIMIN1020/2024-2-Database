import { Movie } from "@/app/page";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaStar } from "react-icons/fa6";

function MovieCard({ movie }: { movie: Movie }) {
  const { id, image_url, title, genre, release_year, avg_rating } = movie;

  return (
    <Link
      href={`/movie/${id}`}
      className="w-full flex flex-col items-center gap-[16px] relative"
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
      </div>
      <div className="bg-blue-500 px-[6px] py-[4px] rounded-[12px] flex items-center gap-[4px] absolute top-[4px] right-[4px] text-white text-sm font-bold">
        <FaStar size={12} fill="white" />
        {avg_rating ? Number(avg_rating).toFixed(1) : "-"}
      </div>
    </Link>
  );
}

export default MovieCard;
