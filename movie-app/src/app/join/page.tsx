"use client";

import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

function JoinPage() {
  const router = useRouter();
  const [joinForm, setJoinForm] = useState({
    name: "",
    id: "",
    password: "",
  });

  const handleJoin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("/api/user/join", {
      method: "POST",
      body: JSON.stringify(joinForm),
    });

    const result = await res
      .json()
      .then((data) => data.result.affectedRows > 0);

    if (result) {
      router.replace("/login");
    } else {
      window.alert("다시 시도해주세요.");
    }
  };

  return (
    <div className="flex flex-col w-full h-vh">
      <Header title="Join" hasBackButton />
      <div className="w-full h-full flex justify-center flex-1 pt-[50px]">
        <form
          onSubmit={(e) => handleJoin(e)}
          className="flex flex-col gap-[20px] h-fit border border-gray-300 rounded-[12px] p-[36px]"
        >
          <div className="w-full flex justify-center py-[24px]">
            <p>간편하게 회원가입 해보세요!</p>
          </div>
          <label className="flex gap-[12px] items-center">
            <span className="font-bold w-[80px] text-end">name: </span>
            <input
              type="text"
              placeholder="이름을 입력해주세요"
              className="w-[250px]"
              onChange={(e) =>
                setJoinForm((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </label>
          <label className="flex gap-[12px] items-center">
            <span className="font-bold w-[80px] text-end">id: </span>
            <input
              type="text"
              placeholder="id를 입력해주세요"
              className="w-[250px]"
              onChange={(e) =>
                setJoinForm((prev) => ({ ...prev, id: e.target.value }))
              }
            />
          </label>
          <label className="flex gap-[12px] items-center">
            <span className="font-bold w-[80px] text-end">password: </span>
            <input
              type="password"
              placeholder="password를 입력해주세요"
              className="w-[250px]"
              onChange={(e) =>
                setJoinForm((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 mt-[20px] rounded-[8px] w-full text-white py-[12px] font-bold text-sm"
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}

export default JoinPage;
