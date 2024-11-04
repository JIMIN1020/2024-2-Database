"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { IoMdArrowBack } from "react-icons/io";

interface Props {
  title: string;
  hasBackButton?: boolean;
}

function Header({ title, hasBackButton }: Props) {
  const router = useRouter();

  return (
    <header
      className={`w-full bg-white z-50 sticky top-0 left-0 py-[24px] px-[24px] flex ${
        hasBackButton ? "items-center gap-[18px]" : "justify-center"
      }`}
    >
      {hasBackButton && (
        <button type="button" onClick={() => router.back()}>
          <IoMdArrowBack size={24} />
        </button>
      )}
      <h1
        className={`text-gray-800 font-bold ${
          hasBackButton ? "text-xl" : "text-2xl"
        }`}
      >
        {title}
      </h1>
    </header>
  );
}

export default Header;
