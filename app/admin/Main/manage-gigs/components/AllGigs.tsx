"use client";
import Searchbar from "@/app/components/searchbar";
import axios from "axios";
import React, { useState } from "react";
import DeleteConfirmationPost from "@/app/components/DeleteConfirmationPost";

const AllGigs = ({ initialData }: any) => {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState(initialData);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [itemId, setitemId] = useState("");
  const [showtag,setTag] = useState<boolean>(true);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    setData(initialData);
  };

  const handleClick = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/admin/gigs/search/${inputValue}`
      );
      const currentData = response.data;
      setSearchPerformed(true);
      setData([currentData]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleManageClick = async (userId: any) => {
    try {
      await axios.post(
        `http://localhost:4000/admin/gigs/control-approval/${userId}`
      );

      const response = await axios.get(`http://localhost:4000/admin/gigs/all`);
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error approving gig:", error);
    }
  };
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/admin/gig/delete/${itemId}`);
      window.location.href = "/Main/manage-gigs";
    } catch (error) {
      console.error("Error deleting gigs:", error);
    }
  };

  return (
    <>
      {showtag && (  <div className="flex col-span-4 text-gray-600 font-bold bg-gradient-to-r from-red-400 to-red-200">
          <p  className="flex-auto w-64">Unapproved Gigs</p>
          <button className="focus:outline-none" onClick = {()=> {setTag(false)}} >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
        </button>
        </div>)}
    <div className="w-full h-full gap-5 flex flex-col items-center  ">
      <Searchbar
        handleClick={handleClick}
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleChange={handleChange}
      />
      <div className=" w-full grid grid-cols-4 gap-3">
        {searchPerformed && !data && (
          <div className="text-red-500">Not found</div>
        )}

        {data
          .filter((item: any) => !item.approved)
          .map((item: any, index: any) => (
            <div key={index} className="my-1 p-1">
              <section className="text-gray-200 body-font">
                <div className="container px-1 py-1 mx-auto">
                  <div>
                    <div>
                      <div className="h-full rounded-xl shadow-cla-blue bg-gradient-to-r bg-indigo-50/30 to-blue-50 overflow-hidden">
                        <img
                          className="lg:h-60 md:h-40 w-full object-cover object-center scale-100 transition-all duration-400 hover:scale-95"
                          src={
                            "http://localhost:4000/admin/profilePic/placeforgigs.png"
                          }
                          alt="Not Uploaded"
                        />
                        <div className="p-6">
                          <b className="text-lg text-indigo-600">
                            {item.title}
                          </b>
                          <p className="text-gray-700 leading-relaxed mb-3">
                            {item.description}
                          </p>
                          <p className="text-gray-600 font-medium mb-3">
                            Price: <b>200$</b>
                          </p>
                          <p className="text-gray-600 font-medium mb-3">
                            Category: <b>{item.category}</b>
                          </p>
                          <div className="flex items-center flex-wrap">
                            <button
                              className="bg-gradient-to-r from-cyan-200 to-blue-400 hover:scale-105 drop-shadow-md shadow-cla-blue px-4 py-1 rounded-lg"
                              onClick={() => handleManageClick(item.id)}
                            >
                              Approve
                            </button>
                            <button
                              className=" mx-6 bg-gradient-to-r from-red-400 to-red-200 hover:scale-105 drop-shadow-md shadow-cla-blue px-4 py-1 rounded-lg"
                              onClick={() => {
                                setShowModal(true);
                                setitemId(item.id);
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          ))}
        <DeleteConfirmationPost
          showModal={showModal}
          setShowModal={setShowModal}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  </>
  );
};

export default AllGigs;
