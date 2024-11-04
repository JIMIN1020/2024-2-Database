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

interface MovieType extends Movie {
  rating?: number;
}

function MoviePage({ params: { id } }: Props) {
  const [rating, setRating] = useState(0);
  const [movieInfo, setMovieInfo] = useState<MovieType | null>(null);

  const getMovieInfo = async () => {
    const userId = sessionStorage.getItem("id");
    const res = await fetch(`/api/movie/${id}?userId=${userId}`, {
      method: "GET",
    });

    const movie = await res.json().then((data) => data.result[0]);
    setMovieInfo(movie);
  };

  useEffect(() => {
    getMovieInfo();
  }, []);

  const handleRating = async () => {
    const res = await fetch("/api/movie/rating", {
      method: "POST",
      body: JSON.stringify({
        userId: sessionStorage.getItem("id"),
        movieId: id,
        rating,
      }),
    });

    const result = await res
      .json()
      .then((data) => data.result.affectedRows > 0);

    if (result) {
      getMovieInfo();
    } else {
      window.alert("다시 시도해주세요.");
    }
  };

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
            <span className="font-bold">
              평점:{" "}
              {movieInfo?.avg_rating
                ? Number(movieInfo.avg_rating).toFixed(1)
                : "-"}
            </span>
            <p>{movieInfo?.summary}</p>
            <hr />
            <form className="flex flex-col w-full gap-[12px]">
              <h5 className="font-bold">내 평점</h5>
              {movieInfo?.rating ? (
                <span className="text-2xl font-bold text-blue-600">
                  {movieInfo.rating.toFixed(1)}점
                </span>
              ) : (
                <>
                  <div className="flex gap-[12px]">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <StarButton
                          key={i}
                          isSelected={rating >= i + 1}
                          onClick={() => setRating(i + 1)}
                        />
                      ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRating()}
                    className="bg-blue-500 py-[10px] rounded-[8px] px-[16px] text-white text-sm font-bold"
                  >
                    평점 등록
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoviePage;
