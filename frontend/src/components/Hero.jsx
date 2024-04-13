import React, { useState, useEffect }  from 'react'
import { FaArrowRight } from "react-icons/fa6";
import LanguageAnimation from "../assets/LanguageAnimation.json"
import Lottie from "lottie-react"
import {TypeAnimation} from "react-type-animation"


const Hero = () => {
  
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 max-[1024px]:gap-25 p-20 '> 
      <div className='lg:order-last flex items-center'>
        <Lottie className=' '  animationData={LanguageAnimation} />
      </div>
      <div className=' tracking-wide text-white flex flex-col gap-28 max-[1248px]:items-center max-[1248px]:gap-14 max-[1248px]:text-4xl  '>
      <div  className='max-[1248px]:text-7xl text-8xl max-[1024px]:text-6xl max-[375px]:text-5xl '>
       Unlock your potential with the best language tutors.
      </div>
      <div className=''>
        <button className='border-cyan-950 hover:bg-cyan-950 hover:border-slate-100 border-2 rounded-lg tracking-wide
          flex gap-3 items-center text-xl px-36 max-[1057px]:px-24 max-[618px]:px-20 max-[509px]:px-10 max-[412px]:px-6 max-[379px]:text-sm
           max-[398px]:px-3 max-[379px]:px-2 py-4'>Get Started <FaArrowRight /> </button>
      </div>
      </div>
    </div>
  )
}


export default Hero




{/* <TypeAnimation
sequence={[
  'Unlock your potential with the best language tutors.', // Initial text
  1000, // Wait for 1 second
  'Unlock your potential with the best language tutors.', // Final text
  1000, // Wait for 1 second
]}
wrapper="span" // HTML element tag that wraps the typing animation
speed={50} // Speed for the writing of the animation
style={{ fontSize: '1em', display: 'inline-block' }}
repeat={Infinity} // Repeat the animation indefinitely
      /> */}






