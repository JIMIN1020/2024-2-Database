import Header from "@/components/Header";
import React from "react";

function WatchListPage() {
  return (
    <div className="flex flex-col w-full h-fit">
      <Header title="Watch List" hasBackButton />
      <div className="w-full flex justify-center py-[36px]">
        <p>내가 스크랩한 시청 목록이에요!</p>
      </div>
      <div className="w-full px-[24px] py-[36px] grid grid-cols-5 flex-1">
        <div>영화</div>
      </div>
    </div>
  );
}

export default WatchListPage;
