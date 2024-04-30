"use client"
import { useEffect,useState } from 'react';

export default function Session({children}:any) {
  const [initilizing,setInitilizing] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('Token');
    console.log(token);
    if (!token) {
      window.location.href = '/Auth/signIn';
    } else {
      
      const time = 30 * 60 * 1000; 
      const timeoutId = setTimeout(() => {
        localStorage.removeItem('Token');
        window.location.href = '/Auth/signIn';
      }, time);
      setInitilizing(false)
      return () => clearTimeout(timeoutId);
    }
  }, []);
  if(initilizing){
    return <>
        <div></div>
    </>
  }
  return <>{children}</>;
}
