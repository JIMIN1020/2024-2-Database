import React from "react";
import { FaRegStar, FaStar } from "react-icons/fa6";

interface Props {
  isSelected: boolean;
  onClick: () => void;
}

function StarButton({ isSelected, onClick }: Props) {
  return (
    <button type="button" onClick={onClick}>
      {isSelected ? (
        <FaStar size={36} fill="#ffd012" />
      ) : (
        <FaRegStar size={36} fill="#878787" />
      )}
    </button>
  );
}

export default StarButton;
