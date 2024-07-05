import React from 'react'
import { FaAngleRight } from "react-icons/fa6";
import {motion} from "framer-motion"
const LanguageCard = ({language}) => {
  return (
    <div className='flex p-6 border border-cyan-950 rounded-md items-center justify-between'>
    <div className='flex items-center gap-4'>
       
      <div className='flex text-white  gap-3  flex-col items-center justify-center '>
        <span className='text-4xl' >
            {language} tutors
        </span>
        <span className='text-xl'>
          20,000 teachers
        </span>
    </div>
    </div>
    
    <div>
    <FaAngleRight className='text-white text-4xl' /> 
    </div>
      
    </div>
  )
}

export default LanguageCard
