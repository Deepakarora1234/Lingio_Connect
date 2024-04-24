import React from 'react'
import { LuLanguages } from "react-icons/lu";
import { FaArrowUp } from "react-icons/fa";

const Footer = () => {
      const scrollToTop = () => {
        const scrollStep = window.scrollY / 20; 

        const scrollInterval = setInterval(() => {
            if (window.scrollY !== 0) {
                window.scrollBy(0, -scrollStep);
            } else {
                clearInterval(scrollInterval);
            }
        },20 ); 
    }
  return (
    <div className='bg-cyan-950 p-2 items-center mt-10 flex justify-between'>
        <div className='flex items-center p-3 mb-2 ml-1'>
      <span className='text-white gap-2 flex text-2xl'>
      <LuLanguages className='my-auto' /> Lingio Connect
      </span>
     </div>
     <div className='flex flex-col items-center gap-4'>
     <div onClick={scrollToTop} className='flex border bg-teal-700 hover:bg-black items-center justify-center mt-[-35px] p-3  rounded-2xl w-3/5 text-white'>
     <FaArrowUp  className='text-white'/>
     </div>
     <span className='flex p-4 max-[354px]:p-2  max-[354px]:text-sm items-center text-white font-bold'>
        About Us
     </span>
     </div>
    
    </div>
  )
}

export default Footer
