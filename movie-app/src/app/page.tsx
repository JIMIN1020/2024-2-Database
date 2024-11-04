import React from "react";

function HomePage() {
  return (
    <div className="w-full h-fit flex flex-col">
      <header className="w-full bg-white z-10 sticky top-0 left-0 py-[24px] px-[24px] flex justify-center">
        <h1 className="text-gray-800 font-bold text-2xl">Movie Ranking Site</h1>
      </header>
      <div className="w-full flex justify-center py-[30px]">
        <p className="text-center">
          영화에 평점을 남기고, 랭킹을 확인해보세요!
          <br />
          시청하고 싶은 영화를 저장할 수 있어요
        </p>
      </div>
      <main className="w-full flex gap-[20px] px-[24px] py-[36px]">
        <div className="grid grid-cols-4 gap-[20px] flex-1">
          <div className="w-full flex flex-col items-center gap-[12px]">
            <div className="max-w-[200px] w-full bg-gray-300 h-[300px]">
              이미지
            </div>
            <h5>제목</h5>
            <span>개봉일</span>
            <span>평점</span>
          </div>
          <div className="bg-gray-200 w-full">영화</div>
          <div className="bg-gray-200 w-full">영화</div>
          <div className="bg-gray-200 w-full">영화</div>
        </div>
        <div className="w-[300px] relative flex flex-col h-[100vh - 224px] gap-[20px]">
          <div className="border sticky top-[80px] right-0 rounded-[12px] border-gray-300 flex flex-col p-[24px] gap-[20px]">
            <h2 className="font-bold text-lg text-center">프로필</h2>
            <span>이름: </span>
            <button
              type="button"
              className="bg-blue-500 rounded-[8px] text-white py-[12px] font-bold text-sm"
            >
              시청목록 보러가기
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
