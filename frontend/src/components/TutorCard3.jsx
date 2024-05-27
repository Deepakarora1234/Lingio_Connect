import React,{useState} from 'react'
import { FaGraduationCap } from "react-icons/fa";
import { IoLanguage } from "react-icons/io5";
import { FaRupeeSign } from "react-icons/fa";
import Lottie from 'lottie-react'
import TutorCardAnimation from "../assets/TutorCard_Animation.json"
import { useNavigate } from 'react-router-dom';
import { GiDuration } from "react-icons/gi";


const TutorCard3 = ({tutor}) => {
  return (
    <div  className='flex gap-10'>

   
    <div className='border-2 rounded-md border-cyan-950 '>
   
        
       {/* <div className='grid grid-cols-3 col-span-2 max-[681px]:grid-cols-1 ' > */}
       <div className=' flex justify-center   p-3 '>
       <img className='h-[250px] w-[250px] object-cover rounded-full '
        src={tutor.image}>
      </img>
      </div>



      <div className='flex flex-col  col-span-2 p-5 text-xl gap-10 flex-auto  text-white ' >
      <h2 className='text-5xl font-bold flex justify-center'>
        {tutor.fullName}
      </h2>
      <div className='flex flex-col gap-1 text-white'>
      <div className='flex items-center gap-2'>
      <FaGraduationCap /> 
      {tutor.language}
      </div>
      <div className='text-white flex items-center gap-2'>
      <IoLanguage />
       Speaks {tutor.language} (Native)
      </div>
      <div className='text-white flex items-center gap-2'>
      <GiDuration />
       Duration  - {tutor.courseDuration} Weeks
      </div>
      </div>
      <div className='mt-3 line-clamp-2' >
        {tutor.description}
      </div>

        <button className='flex justify-center py-2 font-bold px-5 m-1 rounded-lg text-2xl items-center bg-cyan-950 hover:bg-cyan-800 text-white border'>
            Start Learning
        </button>
       
      



      </div>
      
   
    </div>
   
    </div>
  )
}

export default TutorCard3
