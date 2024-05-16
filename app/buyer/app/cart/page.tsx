'use client'
import React, { useEffect, useState } from 'react';
import axios from "axios";
import Session from '../components/session';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

interface Product {
    Id: number;
    name: string;
    // filename: string;
    price:number;
  }


export default function Cart() {

    const [jsonData, setJsonData] = useState([]);
    const [quantityInput, setQuantityInput] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('token');
            const email = localStorage.getItem('email');
            if (token) {
              const response = await axios.get('http://localhost:8000/buyer/allorder', { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, withCredentials: true });
              const jsonData = response.data
              setJsonData(jsonData);
              //setQuantityInput(jsonData.productQuantity);

            } else {
                
            }
        } 
        catch (error) {
            console.error('Error fetching user data:', error);
        } 
    };
    
        fetchUserData();
    });

    // async function handleOrder(items: any, msg: string){
    //     try {
    
    //       const token = localStorage.getItem('token');
    //       const username = localStorage.getItem('username');
    //       if (token) {
    //         const response = await axios.post(`http://localhost:3001/seller/confirm_order/?msg=${msg}&username=${username}` );
    
    //         toast.success('Add to Cart');
    
    //       } else {
              
    //       }
    //     } catch(error){
    //       console.error('Error Add Cart:', error);
    //     }
    // }


    //   const handleQuantityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    //     setQuantityInput(e.target.value);
    // }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
        //   const productData = new FormData();
        //   productData.append('productName', productName);
        //   productData.append('productCode', productCode);
        //   productData.append('productQuantity', productQuantity);
        //   productData.append('productCategory', productCategory);
        //   productData.append('productPrice', productPrice);
        //   productData.append('productPic', productPic);
        //   //const response = await axios.post(process.env.NEXT_PUBLIC_API_ENDPOINT + '/seller/addproduct', productData);
        //   console.log(response);
          } catch (error) {
          console.error(error);
          }
        //console.log({ productName, productCode, productQuantity, productCategory, productPrice, productPic });
    };
 
    return (<>
        <Session />

        <div className="grid grid-cols-6 gap-2">
        {jsonData.map((items: any, index: any) => {
           return (<div key={index}>
            {/* <ProductCard data={items} /> */}
            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              {/* <a href="#">
                <img className="p-8 rounded-t-lg" src={'http://localhost:3001/seller/getimage/' + items.filename} alt="product image" />
              </a> */}
              <div className="px-5 pb-5">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {items.name}
                </h5>
              Id:  {items.Id}<br />
              {/* Quantity: {items.productQuantity}<br /> */}
              {/* <input type="text" value={items.productQuantity} onChange={handleQuantityInputChange} /> */}
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">Price: {items.price}</span>
                <button className="text-white bg-neutral hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"></button>
              </div> <br />
              <div className="flex items-center justify-between">
            {/* <Link href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</Link>
            <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Delete</a> */}
               <button className="text-white bg-neutral hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"></button>
              </div>
              </div>
            </div>
          </div>

          );
        }


        )}
      </div>
        </>
    );
}