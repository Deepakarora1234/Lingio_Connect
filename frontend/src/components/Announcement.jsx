import React from 'react'
import {color,motion}
 from "framer-motion"
const variants={
    initial:{
        x:0,
        y:100,
        opacity:0
    },
    animate:{
        x:0,
        opacity:1,
        y:0,
        transition:{
            duration:0.5,
            staggerChildren:0.1,
        }
      }   
  }

function Announcement() {
  return (
    <motion.div className='p-10 bg-cyan-950 flex flex-col items-center justify-center gap-10 mt-10' variants={variants} initial = "initial" whileInView={"animate"}>
      <motion.span className=' text-8xl max-[1538px]:text-7xl max-[1179px]:text-6xl max-[1000px]:text-5xl
       max-[818px]:text-4xl max-[640px]:text-3xl max-[540px]:text-2xl max-[461px]:text-xl 
        max-[398px]:text-sm  text-white font-bold' variants={variants} >Lessons you’ll love. Guaranteed. </motion.span>
      <motion.span className=' text-2xl max-[640px]:text-xl max-[540px]:text-base max-[461px]:text-sm max-[398px]:text-xs 
         text-white font-normal' variants={variants}>Try another tutor for free if you’re not satisfied</motion.span>

    </motion.div>
  )
}

export default Announcement
