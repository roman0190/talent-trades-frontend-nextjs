import React from "react";
import axios from "axios";



export default async function manageAdmin(props: any) {
  const response = await axios.get("http://localhost:4000/admin/all");
  const jsondata = response.data;
  


  return (
    <>
      <div className="grid grid-cols-5 gap-3 max-h-screen overflow-y-scroll">
        {jsondata.map((item: any, index: any) => (
          <div key={index} className="my-1 p-1">
            <section className="text-gray-600 body-font">
                <div className="container px-1 py-1 mx-auto">
                    <div>
                        <div>
                            <div className="h-full rounded-xl shadow-cla-blue bg-gradient-to-r from-indigo-50 to-blue-50 overflow-hidden">
                                <img className="lg:h-48 md:h-36 w-full object-cover object-center scale-100 transition-all duration-400 hover:scale-95" src={"http://localhost:4000/admin/profilePic/" + item.path} alt="Not Uploaded" />
                                <div className="p-6">
                                    <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">{item.role}</h2>
                                    <h1 className="title-font text-lg font-medium text-gray-600 mb-3">{item.name}</h1>
                                    <p className="leading-relaxed mb-3">{item.email}</p>
                                    <p className="leading-relaxed mb-3">{item.number}</p>
                                    <p className="leading-relaxed mb-3">{item.id}</p>
                                    <div className="flex items-center flex-wrap">
                                        <button className="bg-gradient-to-r from-cyan-400 to-blue-400 hover:scale-105 drop-shadow-md shadow-cla-blue px-4 py-1 rounded-lg">Manage</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
         </div>
           
        ))}
      </div>
    </>
  );
}
