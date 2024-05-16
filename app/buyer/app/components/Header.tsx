import React from 'react'
import Nav from './Nav'

export default function Header() {
  return (
    <>
    <div className=' bg-stone-600'>
        <div className='font-extralight text-white bg-zinc-700 text-center py-2.5'>Talent Trades</div>
      <Nav />
    </div>
    </>
  )
}