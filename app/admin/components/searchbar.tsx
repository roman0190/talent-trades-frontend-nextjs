"use client";
import React, { useState } from "react";
import axios from "axios";
import Searchresult from "../Main/search-result/page";
import Link from 'next/link'

export default function Searchbar() {
  const [inputValue, setInputValue] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleClick = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/admin/search/${inputValue}`
      );
      setSearchResult(response.data);
      setSearchPerformed(true);
      return(
        <>
         <Link href="/Main/search-result"></Link>
        </>
      )
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="mx-10 my-6">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter something"
        className="border border-gray-300 rounded-md py-2 px-4 mb-2 focus:outline-none focus:ring focus:border-blue-400 w-80"
      />
      <button
        onClick={handleClick}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 mx-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
      >
        Submit
      </button>

      {searchPerformed && searchResult && (
        <Searchresult
          data1={searchPerformed}
          data2={searchResult}
          data3={inputValue}
        />
      )}
    </div>
  );
}
