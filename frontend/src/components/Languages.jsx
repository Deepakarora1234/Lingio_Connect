import React from 'react'
import LanguageCard from './LanguageCard'
import { FaAlignRight } from 'react-icons/fa6'
import {animate, color,motion}
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
            duration:1,
            staggerChildren:0.1,
        }
    }
}
const Languages = () => {
  return (
    
    <motion.div className=' p-14 w-full mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-10 ' variants={variants} initial = "initial" whileInView={"animate"}>
     <LanguageCard language={"English"}  />
     <LanguageCard language={"Spanish"}  />
     <LanguageCard language={"French"}  />
     <LanguageCard language={"German"}  />
     <LanguageCard language={"Italian"}  />
     <LanguageCard language={"Chinese"}  />
     <LanguageCard language={"Arabic"}  />
     <LanguageCard language={"Japanese"}  />
     <LanguageCard language={"Portugese"}  />
    </motion.div>
      
   
  )
}

export default Languages
