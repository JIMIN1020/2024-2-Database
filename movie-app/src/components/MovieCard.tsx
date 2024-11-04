import { Movie } from "@/app/page";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaStar } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

function MovieCard({
  movie,
  isWatchList,
  onClickList,
}: {
  movie: Movie;
  isWatchList?: boolean;
  onClickList?: () => void;
}) {
  const { id, image_url, title, genre, release_year, avg_rating, hasInList } =
    movie;

  const handleWatchList = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();

    const res = await fetch("/api/movie/watch-list", {
      method: hasInList || isWatchList ? "DELETE" : "POST",
      body: JSON.stringify({
        userId: sessionStorage.getItem("id"),
        movieId: id,
      }),
    });

    if (res) {
      if (onClickList) {
        onClickList();
      }
    } else {
      window.alert("다시 시도해주세요.");
    }
  };

  return (
    <div className="w-full flex relative">
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
        </div>
      </Link>
      <div className="absolute top-[4px] right-[4px] flex gap-[8px]">
        {isWatchList ? (
          <button
            type="button"
            onClick={(e) => handleWatchList(e)}
            className="rounded-[50%] z-10 w-[30px] h-[30px] flex justify-center items-center bg-red-500"
          >
            <IoMdClose size={20} fill="white" />
          </button>
        ) : (
          <>
            <div className="bg-blue-500 px-[6px] py-[4px] rounded-[12px] flex items-center gap-[4px] text-white text-sm font-bold">
              <FaStar size={12} fill="white" />
              {avg_rating ? Number(avg_rating).toFixed(1) : "-"}
            </div>
            <button
              type="button"
              onClick={(e) => handleWatchList(e)}
              className={`rounded-[50%] z-10 w-[30px] h-[30px] flex justify-center items-center ${
                hasInList ? "bg-green-600" : "bg-gray-400"
              }`}
            >
              <FaBookmark size={14} fill="white" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default MovieCard;
