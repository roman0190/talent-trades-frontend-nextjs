"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Session from "../components/session";
import Link from "next/link";

export default function Profile() {
  const [name, setName] = useState(" ");
  const [email, setEmail] = useState(" ");
  const [number, setNumber] = useState(" ");
  const [path, setPath] = useState(" ");
  const [previewImage, setPreviewImage] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  useEffect(() => {
    async function fetchAdminInfo() {
      try {
        const token = localStorage.getItem("Token");
        const response = await axios.get(
          "http://localhost:4000/admin/view-profile/own",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              include: "additionalInfo",
            },
          }
        );
        const profileInfo = response.data;
        // console.log(profileInfo)

        setName(profileInfo.name);
        setEmail(profileInfo.email);
        setNumber(profileInfo.number);
        setPath(profileInfo.path);

        localStorage.setItem("name", response.data.name);
        localStorage.setItem("file", response.data.path);
      } catch (error) {
        console.error("Error fetching admin info:", error);
      }
    }

    fetchAdminInfo();
  }, []);

  const Saveclick = async () => {
    const token = localStorage.getItem("Token");
    try {
      // Update profile information
      await axios.patch(
        "http://localhost:4000/admin/edit-profile/own",
        {
          name,
          email,
          number,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //profile pic
      const formData = new FormData();
      formData.append("file", profilePic);
      try {
        const response = await axios.post(
          "http://localhost:4000/admin/uploadpfp",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        localStorage.setItem("name", response.data.name);
        localStorage.setItem("file", response.data.path);
      } catch (error) {
        console.error("Error uploading profile picture:", error);
      }

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      setProfilePic(file);
    } else {
      setPreviewImage(null);
      setProfilePic(null);
    }
  };

  return (
    <>
      <Session>
        <div className="container mx-auto">
          <h1 className="text-3xl font-semibold mb-4">Admin Profile</h1>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex justify-center items-center ">
              <div className="relative w-32 h-32">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="h-full w-full object-cover rounded-full"
                  />
                ) : (
                  <div className="h-full w-full">
                    <img
                      className="w-full h-full object-cover rounded-full mx-auto cursor-pointer"
                      src={"http://localhost:4000/admin/profilePic/" + path}
                      alt="Profile Picture"
                      onClick={() => setModalOpen(true)}
                    />
                    {modalOpen && (
                      <div
                        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center"
                        onClick={toggleModal}
                      >
                        <div className="bg-white rounded-lg p-4">
                          <img
                            className="w-100 h-100"
                            src={
                              "http://localhost:4000/admin/profilePic/" + path
                            }
                            alt="Full Profile Picture"
                          />
                          <button
                            className="absolute top-2 right-2 text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center"
                            onClick={(e) => {
                              e.stopPropagation();
                              setModalOpen(false);
                            }}
                          >
                            X
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {!modalOpen && (<label className="absolute bottom-0 right-0 bg-yellow-500 text-white rounded-full cursor-pointer p-4">
                  <input
                    id="profilePic"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>)}
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="name" className="text-lg font-semibold">
                Name:
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 mt-1"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="text-lg font-semibold">
                Email:
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 mt-1"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="role" className="text-lg font-semibold">
                Number:
              </label>
              <input
                id="role"
                type="text"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="block w-full border-b border-gray-300 focus:outline-none focus:border-blue-500 mt-1"
              />
              <button
                onClick={Saveclick}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5"
              >
                Save Changes
              </button>
            </div>
          </div>
          <div className="mt-4">
            <Link href="Main/dashboard">
              <div className="text-blue-500 hover:text-blue-700">
                Back to Dashboard
              </div>
            </Link>
          </div>
        </div>
      </Session>
    </>
  );
}
