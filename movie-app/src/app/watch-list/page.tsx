"use client";

import Header from "@/components/Header";
import MovieCard from "@/components/MovieCard";
import React, { useEffect, useState } from "react";
import { Movie } from "../page";

function WatchListPage() {
  const [watchList, setWatchList] = useState<Movie[] | null>(null);

  const getMoviews = async () => {
    const userId = sessionStorage.getItem("id");
    const res = await fetch(`/api/movie/watch-list?userId=${userId}`, {
      method: "GET",
    });

    const movie = await res.json().then((data) => data.result);
    setWatchList(movie);
  };

  useEffect(() => {
    getMoviews();
  }, []);

  return (
    <div className="flex flex-col w-full h-fit">
      <Header title="Watch List" hasBackButton />
      <div className="w-full flex justify-center py-[36px]">
        <p>내가 스크랩한 시청 목록이에요!</p>
      </div>
      <div className="w-full px-[24px] py-[36px] grid grid-cols-5 flex-1">
        {watchList?.map((movie) => (
          <MovieCard
            movie={movie}
            isWatchList
            onClickList={() => getMoviews()}
          />
        ))}
      </div>
    </div>
  );
}

export default WatchListPage;
