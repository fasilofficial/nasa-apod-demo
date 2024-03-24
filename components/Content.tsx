"use client";

import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

const Content = () => {
  const currentDate = new Date().toISOString().split("T")[0];
  const [data, setData] = useState<any>(null);
  const [date, setDate] = useState(currentDate);

  const handleDateChange = (selectedDate: Date) => {
    const formattedDate = selectedDate.toISOString().split("T")[0];
    if (formattedDate > currentDate) return;
    setDate(formattedDate);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY}`
        );
        if (!res.data) {
          throw new Error("Failed to fetch data");
        }
        setData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [date]);
  return (
    <section className="flex flex-col items-center md:w-4/6 p-6">
      {data ? (
        <>
          <div className=" mb-6">
            <img
              src={data.url}
              className="w-[600px] h-80 rounded-md object-cover object-center"
              alt={data.title}
            />
            {data.copyright && (
              <p className="text-right text-sm italic text-gray-500">
                &copy; {data.copyright}
              </p>
            )}
          </div>
          <h1 className="font-bold text-2xl">{data.title}</h1>
          <p className=" italic text-gray-700 mt-6 p-4 border-t border-b text-justify md:w-4/6 ">
            {data.explanation}
          </p>
          <div className="mt-3">
            <label
              htmlFor="date"
              className="cursor-pointer hover:font-semibold"
            >
              {data.date}
            </label>
            <DatePicker
              id="date"
              selected={new Date(date)}
              onChange={handleDateChange}
              className="hidden"
            />
          </div>
        </>
      ) : (
        "Loading..."
      )}
    </section>
  );
};

export default Content;
