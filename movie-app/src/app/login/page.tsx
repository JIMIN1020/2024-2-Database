import Header from "@/components/Header";
import Link from "next/link";
import React from "react";

function LoginPage() {
  return (
    <div className="flex flex-col w-full h-vh">
      <Header title="Log In" hasBackButton />
      <div className="w-full h-full flex justify-center flex-1 pt-[50px]">
        <form className="flex flex-col gap-[20px] h-fit border border-gray-300 rounded-[12px] p-[36px]">
          <div className="w-full flex justify-center py-[24px]">
            <p>로그인하고 영화 평점을 남겨봐요!</p>
          </div>
          <label className="flex gap-[12px] items-center">
            <span className="font-bold w-[80px] text-end">id: </span>
            <input
              type="text"
              placeholder="id를 입력해주세요"
              className="w-[250px]"
            />
          </label>
          <label className="flex gap-[12px] items-center">
            <span className="font-bold w-[80px] text-end">password: </span>
            <input
              type="password"
              placeholder="password를 입력해주세요"
              className="w-[250px]"
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 mt-[20px] rounded-[8px] w-full text-white py-[12px] font-bold text-sm"
          >
            로그인
          </button>
          <Link
            href="/join"
            className="text-sm text-gray-600 underline self-center"
          >
            회원가입
          </Link>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
