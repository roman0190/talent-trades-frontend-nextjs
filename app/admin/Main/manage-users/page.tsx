import React from 'react'
import axios from "axios";
import Allusers from './components/Allusers';

const Manageusers = async() => {
  const usersjson = await axios.get("http://localhost:4000/admin/users/all");
  const users = usersjson.data
  return (
    <>
    <div>
     <Allusers initialData = {users} />
    </div>
    </>
    
  )
}

export default Manageusers
