import React from 'react'
import { LuLanguages } from "react-icons/lu";


const Header = () => {
  return (
    <div className='flex justify-between bg-cyan-950 h-20'>
     <div className='flex items-center p-3 mb-2 ml-1'>
      <span className='text-white gap-2 flex text-2xl'>
      <LuLanguages className='my-auto' /> Lingio Connect
      </span>
     </div>
     <div className='flex items-center mr-6 '>
      <button className=' hover:bg-black  hover:cursor-pointer text-white border px-3 py-1 border-slate-100 rounded'>Login</button>
     </div>
      
    </div>
  )
}

export default Header
