import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="flex justify-between w-full absolute bottom-0 py-2 px-4 text-gray-600">
      <p>Astronomy Picture of the Day</p>
      <p className=" ">
        Created by{" "}
        <Link
          href="https://www.github.com/fasilofficial"
          className="text-black cursor-pointer hover:text-gray-600"
        >
          M Fasil
        </Link>{" "}
      </p>
    </div>
  );
};

export default Footer;
