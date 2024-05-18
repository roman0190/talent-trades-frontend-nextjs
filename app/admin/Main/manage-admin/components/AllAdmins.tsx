"use client";
import Searchbar from "@/app/components/searchbar";
import axios from "axios";
import React, { useState } from "react";

const AllAdmins = ({ initialData }: any) => {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState(initialData);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const name = localStorage.getItem('name');

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  const handleChange = (e) => {
    setInputValue(e.target.value);
    setData(initialData);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/admin/search/${inputValue}`
      );
      const currentData = response.data;
      setSearchPerformed(true);
      setData([currentData]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleViewClick = (userId: any) => {
    window.location.href = `/Main/manage-admin/view-admin-profile/${userId}`;
    
  };
  

  return (
    <div className="w-full h-full gap-5 flex flex-col items-center  ">
      <Searchbar
        handleClick={handleSearch}
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleChange={handleChange}
      />

    <div className="w-full grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-3">
      {searchPerformed && data === null && (
          <div className="text-red-500">No user found</div>
        )}
        {data &&
          data
          .filter(item => !(name && name === item.name))
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map((item: any, index: any) => (
            <div key={index} className="my-1 p-1">
              <section className="text-gray-400 body-font">
                <div >
                  <div >
                    <div className="bg-white/10 shadow-xl rounded-lg py-3">
                      <div className="photo-wrapper p-2">
                        <img
                          className="w-32 h-32 rounded-full object-cover mx-auto"
                          src={
                            "http://localhost:4000/admin/profilePic/" +
                            item.path
                          }
                          alt="Not Uploaded"
                        />
                      </div>
                      <div className="p-2">
                        <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
                          {item.name}
                        </h3>
                        <div className="text-center text-gray-400 text-xs font-semibold">
                          <p>{item.role}</p>
                        </div>
                        <table className="text-xs my-3">
                          <tbody>
                            <tr>
                              <td className="px-2 py-2 text-gray-500 font-semibold">
                                Email
                              </td>
                              <td className="px-2 py-2">
                              {item.email}
                              </td>
                            </tr>
                            <tr>
                              <td className="px-2 py-2 text-gray-500 font-semibold">
                                Phone
                              </td>
                              <td className="px-2 py-2">{item.number}</td>
                            </tr>
                            <tr>
                            <td className="px-2 py-2 text-gray-500 font-semibold">
                                Joined Date
                              </td>
                              <td className="px-2 py-2">{formatDate(item.date)}</td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="text-center my-3">
                        <button
                          className="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium"
                          onClick={() => handleViewClick(item.id)}
                        >
                          View Profile
                        </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllAdmins;
