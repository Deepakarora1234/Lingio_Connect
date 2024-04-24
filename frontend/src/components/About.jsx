import React from 'react'
import { FaStar } from "react-icons/fa6";
import {color,motion}
 from "framer-motion"

 const variants={
  initial:{
      x:-500,
      y:100,
      opacity:0
  },
  animate:{
      x:0,
      opacity:1,
      y:0,
      transition:{
          duration:1,
          staggerChildren:0.1,
      }
    }   
}

const About = () => {
  return (
    <motion.div className='flex justify-center items-center' variants={variants} initial = "initial" animate="animate">
    <motion.div className='grid  items-center md:grid-cols-2 lg:grid-cols-4 lg:gap-14 min-[1250px]:gap-40 gap-14 mt-4 px-20 justify-between ' variants={variants} >
    <motion.div className=' border p-6 border-cyan-950 flex flex-col gap-2 items-center'variants={variants}>
    <span className='text-white text-3xl'>32,000+</span>
    <span className='text-white text-xl'>Experienced tutors</span>
    </motion.div>
    <motion.div className=' border p-6 border-cyan-950 flex flex-col gap-2 items-center' variants={variants}>
    <span className='text-white text-3xl'>300,000+</span>
    <span className='text-white text-xl'>5-star tutor reviews</span>
    </motion.div>
    <motion.div className=' border p-6 border-cyan-950 flex flex-col gap-2 items-center' variants={variants}>
    <span className='text-white text-3xl'>20+</span>
    <span className='text-white text-xl'>Languages taught</span>
    </motion.div>
    <motion.div className=' border p-6 border-cyan-950 flex flex-col gap-2 items-center' variants={variants}>
    <span className='text-white flex justify-center gap-2 items-center text-3xl'>4.8 <FaStar />
    <FaStar />
    <FaStar />
    <FaStar />
    <FaStar />
</span>
    <span className='text-white text-xl'>Experienced tutors</span>
    </motion.div>
      
    </motion.div>
    
    </motion.div>
    
   
  )
}

export default About
