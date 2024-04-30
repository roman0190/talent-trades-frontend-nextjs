import React from 'react';
import Link from 'next/link'; // Make sure to import Link from Next.js

export default function NavNoLogin() {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="flex items-center">
        <img src="../assets/abc.jpeg" alt="" className="h-8 mr-2" />
        <span className="text-lg font-semibold">Talent Trades</span>
      </div>
      <div className="flex justify-end space-x-4">
        <Link href="/aboutus">
          <div className="hover:underline">About Us</div>
        </Link>
        <Link href="/Auth/signUp">
          <div className="hover:underline">Sign Up</div>
        </Link>
        <Link href="/Auth/signIn">
          <div className="hover:underline">Sign In</div>
        </Link>
      </div>
    </div>
  );
}
