"use client"
import { useEffect, useState } from 'react';

export default function Session({ children }: any) {
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = localStorage.getItem('Token');
        console.log(token);
        if (!token) {
          window.location.href = '/Auth/signIn';
        } else {
          const time = 10 * 30 * 60 * 1000; 
          const timeoutId = setTimeout(() => {
            localStorage.removeItem('Token');
            window.location.href = '/Auth/signIn';
          }, time);
          setInitializing(false);
          return () => clearTimeout(timeoutId);
        }
      } catch (error) {
        console.error('Error occurred:', error);
       
      }
    };

    checkToken();
  }, []);

  if (initializing) {
    return <div></div>;
  }

  return <>{children}</>;
}
