"use client";

import { Movie } from "@/app/page";
import Header from "@/components/Header";
import StarButton from "@/components/StarButton";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Props {
  params: {
    id: string;
  };
}

function MoviePage({ params: { id } }: Props) {
  const [rating, setRating] = useState(0);
  const [movieInfo, setMovieInfo] = useState<Movie | null>(null);

  useEffect(() => {
    const getMovieInfo = async () => {
      const res = await fetch(`/api/movie/${id}`, {
        method: "GET",
      });

      const movie = await res.json().then((data) => data.result[0]);
      setMovieInfo(movie);
    };

    getMovieInfo();
  }, []);

  return (
    <div className="flex flex-col w-full h-fit">
      <Header title="Movie Info" hasBackButton />
      <div className="w-full flex justify-center py-[36px]">
        <p>해당 영화에 대한 정보입니다.</p>
      </div>
      <div className="w-full flex justify-center pt-[50px]">
        <div className="flex p-[36px] w-fit max-w-[800px] gap-[20px] border border-gray-300 rounded-[16px]">
          {movieInfo && (
            <Image
              src={movieInfo.image_url}
              alt="영화 포스터"
              width={270}
              height={400}
              className="w-auto bg-gray-300"
            />
          )}
          <div className="flex-1 flex flex-col gap-[20px]">
            <div className="flex flex-col gap-[8px]">
              <h3 className="text-xl font-bold">
                {movieInfo?.title}({movieInfo?.release_year})
              </h3>
              <span className="text-gray-700 text-sm">{movieInfo?.genre}</span>
            </div>
            <span className="font-bold">평점</span>
            <p>{movieInfo?.summary}</p>
            <hr />
            <form className="flex flex-col w-full gap-[12px]">
              <h5 className="font-bold">내 평점 남기기</h5>
              <div className="flex gap-[12px]">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <StarButton
                      isSelected={rating >= i + 1}
                      onClick={() => setRating(i + 1)}
                    />
                  ))}
              </div>
              <button
                type="button"
                className="bg-blue-500 py-[10px] rounded-[8px] px-[16px] text-white text-sm font-bold"
              >
                평점 등록
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoviePage;
