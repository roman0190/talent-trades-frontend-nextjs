import Link from 'next/link'
import React from 'react'


export default function Nav() {
  return (
    <div className='font-extralight text-white bg-zinc-700 text-center py-2.5 flex justify-around '>
        {/* <Link href=''>Home</Link> */}
        <Link href='/dashboard'>Dashboard</Link>
        <Link href='/signUp'>signUp</Link>
        <Link href='/signIn'>signIn</Link>
        <Link href='/cart'>Cart</Link>
        {/* <Link href='/logout'>Logout</Link> */}
        
    </div>
  )
}

// export default function Nav() {
//   return (
//     <div className='flex gap-10'>
//         <Link href='/home'>Home</Link>
//         <Link href='/signUp'>signUp</Link>
//         <Link href='/signIn'>signIn</Link>
//         <a href='/logout'>Logout</a> 
//     </div>    
//   )
// }

//sir
// export default function Nav() {
//   return (
//     <>
//     <h1>HOME</h1>
//     <h1>About</h1>
//     <h1>Contact</h1>
//     </>
//   )
// }