
import axios from 'axios';
// import { Toaster, toast } from 'react-hot-toast';
// import Session from '../components/session';
import PageCard from "./page_card"; 
import { Component } from 'react';
 
export default async function Dashboard() {
  const response: any = await axios.get('http://localhost:8000/buyer/allproduct');
  const jsondata = response.data;
 
 
  return (<>
    {/* <Session /> */}
    <div className=" justify-center bg-gray-50 py-5 px-4 sm:px-6 lg:px-8">
      {/* <Toaster /> */}
 
      <div className="grid grid-cols-6 gap-2">
        {jsondata.map((items: any, index: any) => {
          return (<div key={index}>
 
            <PageCard data={items} />
          </div>
 
          );
        }
 
 
        )}
      </div>
    </div>
  </>);
}



