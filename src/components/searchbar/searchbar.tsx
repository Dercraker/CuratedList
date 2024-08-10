"use client";

import { Settings } from "lucide-react";

export const SearchBar = () => {
  const handleClick = () => {
    console.log("cogwheel clicked");
  };

  return (
    <div className="flex flex-row  justify-between bg-black rounded-lg pr-4 w-full parent-focus ">
      <input
        type="text"
        placeholder="Search..."
        className="bg-transparent py-4 px-4 rounded-lg w-full text-white placeholder:text-white placeholder:text-lg focus:outline-none"
      />
      <button onClick={handleClick}>
        <Settings color="#ffffff" strokeWidth={1.25} />
      </button>
    </div>
  );
};
