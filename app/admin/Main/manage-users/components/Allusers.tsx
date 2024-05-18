"use client"
import Searchbar from '@/app/components/searchbar'
import axios from 'axios';
import React, { useState } from 'react'
import DeleteConfirmationPost from "@/app/components/DeleteConfirmationPost";

const Allusers = ({initialData}:any) => {
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState("");
  const[data,setData] = useState(initialData)
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    setData(initialData);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/admin/users/search-user/${inputValue}`
      );
      const currentData = response.data;
      setSearchPerformed(true);
      setData([currentData]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDeleteClick = async () => {
    console.log(value)
    try {
      await axios.delete(`http://localhost:4000/admin/users/delete/${value}`);

      setData((prevData) => prevData.filter((item) => item.id !== value));
    } catch (error) {
      console.error("Error deleting announcement:", error);
    }
    if(setShowDeleteModal){
        setShowDeleteModal(false)
    }
    
  };
    
  return (
    <>
        <div>
            <div className="flex justify-center">
            <Searchbar
            handleClick={handleSearch}
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleChange={handleChange}
            />
            </div>
            <table className="min-w-full divide-y divide-gray-200 py-3">
                <thead>
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-8 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">Action</th>
                    </tr>
                </thead>
                {data && 
                data.map((item:any ,index :any)=>(
                    
                <tbody key={index} className="bg-white divide-y divide-gray-200">
                    <tr>
                    <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">{item.id}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <button
                        onClick={()=>{
                            setValue(item.id) 
                            setShowDeleteModal(true)
                        }}
                        className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out">Delete

                        </button>
                    </td>
                    </tr>
                </tbody>

            
            ))
            }
            </table>
            <DeleteConfirmationPost
                  showModal={showDeleteModal}
                  setShowModal={setShowDeleteModal}
                  handleDelete={handleDeleteClick}
            />
        </div>
    </>
  )
}

export default Allusers
