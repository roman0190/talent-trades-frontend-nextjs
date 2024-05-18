import React from "react";
import axios from "axios";
import AllAdmins from "./components/AllAdmins";



export default async function manageAdmin(props: any) {
  const response = await axios.get("http://localhost:4000/admin/all");
  const jsondata = response.data;
  
  return (
    <>
     <AllAdmins initialData={jsondata} />
    </>
  );
}
