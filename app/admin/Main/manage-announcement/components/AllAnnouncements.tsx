"use client";
import React, { useState } from "react";
import axios from "axios";
import CreatePost from "./CreatePost";
import DeleteConfirmationPost from "@/app/components/DeleteConfirmationPost";

const AllAnnouncements = ({ initialData }: any) => {
  const [data, setData] = useState(initialData);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [itemId, setitemId] = useState("");
  const token = localStorage.getItem("Token");

  function formatTime(timestamp) {
    const date = new Date(timestamp);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Dhaka", // Bangladeshi time zone
    };
    return date.toLocaleString("en-US", options);
  }

  const fetchMyPost = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/admin/view-profile/own",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            include: "announcements",
          },
        }
      );
      const announcements = response.data.announcements;
      const appendedAnnouncements = announcements.map((announcement) => ({
        id: announcement.id,
        title: announcement.title,
        content: announcement.content,
        time: announcement.time,
      }));
      setData(appendedAnnouncements);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDeleteClick = async () => {
    try {
      await axios.delete(
        `http://localhost:4000/admin/delete-announcement/${itemId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            include: "announcements",
          },
        }
      );
      setData((prevData) => prevData.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error("Error deleting announcement:", error);
    }
    if (setShowDeleteModal){
      setShowDeleteModal(false);
    }
   
  };

  const fetchAllPost = async () => {
    setShowModal(false);
    try {
      const response = await axios.get(
        "http://localhost:4000/admin/all-announcement"
      );
      const jsondata = response.data;
      setData(jsondata);
    } catch (error) {
      console.error("Error fetching all announcements:", error);
    }
  };

  return (
    <>
      <div className="w-full h-full gap-5 flex flex-col items-center  ">
        <div className="mt-2 flex">
          <CreatePost setData={setData} />
          {!showModal && (
            <button
              onClick={() => fetchMyPost()}
              className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 m-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 "
              type="button"
            >
              See My Announcements
            </button>
          )}
          {showModal && (
            <button
              onClick={() => fetchAllPost()}
              className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 m-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 "
              type="button"
            >
              See All Announcements
            </button>
          )}
        </div>
        <div className=" w-full grid grid-cols-1 gap-3  ">
          {data
            .sort((a, b) => new Date(b.time) - new Date(a.time))
            .map((item: any, index: any) => (
              <div key={index} className="my-1 p-1">
                <section className="text-gray-200 body-font">
                  <div className="container px-1 py-1 mx-auto">
                    <div>
                      <div>
                        <div className="h-full rounded-xl shadow-cla-blue bg-gradient-to-r bg-indigo-50 to-blue-50 overflow-hidden">
                          <div className="p-6">
                            <b className="text-lg text-indigo-600">
                              {item.title}
                            </b>
                            <p className="text-gray-700 leading-relaxed mb-3">
                              {item.content}
                            </p>
                            <div className="flex items-center flex-wrap"></div>
                            <div>
                              <div className="text-gray-500 text-sm mt-2">
                                Time: {formatTime(item.time)}
                              </div>
                            </div>
                            {showModal && (
                              <button
                                onClick={() => {
                                  setShowDeleteModal(true);
                                  setitemId(item.id);
                                }}
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-2"
                              >
                                Delete
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <DeleteConfirmationPost
                  showModal={showDeleteModal}
                  setShowModal={setShowDeleteModal}
                  handleDelete={handleDeleteClick}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default AllAnnouncements;
