"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import DeleteConfirmationPost from "@/app/components/DeleteConfirmationPost";



const ViewAdminProfile = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const [profile, setProfile] = useState<any>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/admin/profile/${id}`
        );
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/admin/delete/${id}`);
      window.location.href = "/Main/manage-admin";
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };

  return (
    <div>
      {profile ? (
        <div className="flex justify-center item-center bg-red ">
          <div className="m-10">
            <div className="rounded-lg border bg-white-200/24 px-4 pt-8 pb-10 shadow-lg auto">
              <div className="relative mx-auto w-36 rounded-full">
                <span className="absolute right-0 m-3 h-3 w-3 rounded-full bg-green-500 ring-2 ring-green-300 ring-offset-2"></span>

                <img
                  className="w-32 h-32 rounded-full object-cover mx-auto cursor-pointer"
                  src={"http://localhost:4000/admin/profilePic/" + profile.path}
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
                        className="w-full h-full"
                        src={
                          "http://localhost:4000/admin/profilePic/" +
                          profile.path
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
              <h1 className="my-1 text-center text-xl font-bold leading-8 text-gray-900 px-80 ">
                {profile.name}
              </h1>
              <h3 className="font-lg text-semibold text-center leading-6 text-gray-600">
                {profile.role}
              </h3>
              <p className="text-center text-sm leading-6 text-gray-500 hover:text-gray-600">
                {profile.email}
              </p>
              <ul className="mt-3 divide-y rounded bg-gray-100 py-2 px-3 text-gray-600 shadow-sm hover:text-gray-700 hover:shadow">
                <li className="flex items-center py-3 text-sm">
                  <span>Status</span>
                  <span className="ml-auto">
                    <span className="rounded-full bg-green-200 py-1 px-2 text-xs font-medium text-green-700">
                      Active
                    </span>
                  </span>
                </li>
                <li className="flex items-center py-3 text-sm">
                  <span>Joined On </span>
                  <span className="ml-auto">
                    {profile.date ? profile.date.split("T")[0] : "N/A"}
                  </span>
                </li>
              </ul>
              <div className="flex justify-center mt-4">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded "
                  onClick={() => setShowModal(true)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>User Not Found</p>
      )}
      <DeleteConfirmationPost
        showModal={showModal}
        setShowModal={setShowModal}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default ViewAdminProfile;
