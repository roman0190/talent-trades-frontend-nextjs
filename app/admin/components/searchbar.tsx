"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from 'next/link'

export default function Searchbar({handleClick,setInputValue,inputValue,handleChange}:any) {

 
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
        Search
      </button>
    </div>
  );
}
