"use client";

import Header from "@/components/Header";
import MovieCard from "@/components/MovieCard";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export interface Movie {
  id: number;
  title: string;
  genre: string;
  summary: string;
  release_year: number;
  image_url: string;
}

function HomePage() {
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const [profile, setProfile] = useState<{
    id: string;
    password: string;
    name: string;
  } | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const userId = sessionStorage.getItem("id");
      if (userId) {
        const res = await fetch(`/api/user?id=${userId}`, {
          method: "GET",
        });

        const profile = await res.json().then((data) => data.result[0]);
        setProfile(profile);
      }
    };

    const getMoviews = async () => {
      const res = await fetch(`/api/movie`, {
        method: "GET",
      });

      const movie = await res.json().then((data) => data.result);
      setMovies(movie);
    };

    getMoviews();
    getUser();
  }, []);

  return (
    <div className="w-full h-fit flex flex-col">
      <Header title="Movie Ranking Site" />
      <div className="w-full flex justify-center py-[30px]">
        <p className="text-center">
          영화에 평점을 남기고, 랭킹을 확인해보세요!
          <br />
          시청하고 싶은 영화를 저장할 수 있어요
        </p>
      </div>
      <main className="w-full flex gap-[20px] px-[24px] py-[36px]">
        <div className="grid grid-cols-4 gap-[20px] flex-1">
          {movies?.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
        <div className="w-[300px] relative flex flex-col h-[100vh - 224px] gap-[20px]">
          <div className="border sticky top-[80px] right-0 rounded-[12px] border-gray-300 flex flex-col p-[24px] gap-[20px]">
            {profile ? (
              <>
                <h2 className="font-bold text-lg text-center">프로필</h2>
                <span>이름: {profile?.name}</span>
                <Link
                  href="/watch-list"
                  className="bg-blue-500 rounded-[8px] text-center text-white py-[12px] font-bold text-sm"
                >
                  시청목록 보러가기
                </Link>
              </>
            ) : (
              <Link
                href="/login"
                className="bg-blue-500 rounded-[8px] text-center text-white py-[12px] font-bold text-sm"
              >
                로그인하기
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
