import React from "react";
import axios from "axios";
import Searchbar from "@/app/components/searchbar";
import AllGigs from "./components/AllGigs";



export default async function manageAdmin(props: any) {
  const response = await axios.get("http://localhost:4000/admin/gigs/all");
  const jsondata = response.data;
  
  return (
    <>
     <AllGigs initialData={jsondata} />
    </>
  );
}
