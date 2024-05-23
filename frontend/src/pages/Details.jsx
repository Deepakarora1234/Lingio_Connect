import React from 'react'
import Header from "../components/Header"
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import * as apiClient from "../apiClient.js"
import { IoLanguage } from "react-icons/io5";
import { FaRupeeSign } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa";
import TutorCard2  from "../components/TutorCard2.jsx"
const Details = () => {
    const {id} = useParams()
    const navigate = useNavigate()

    const {data : tutor} = useQuery(["fetchTutorById", id], ()=> apiClient.fetchTutorById(id))

       
    const {data : otherTutors} = useQuery(["fetchOtherTutors", tutor?.language, tutor?._id], ()=> apiClient.fetchOtherTutors(tutor?.language, tutor?._id))

    // console.log(tutor)
    console.log(otherTutors)

        
  return (
    <div className='flex flex-col' >
    <Header />
    {tutor && <div className=''>
   
   <div className=' mt-10 flex p-2  gap-32  justify-center item-center  rounded-md  '
    >
      <div className='grid grid-cols-1 gap-20 max-[987px]:gap-3  sm:grid-cols-2 '>
      <div className='p-1 flex items-center justify-center '>
      <img className=' h-[500px] w-[500px] max-[987px]:h-[300px] max-[987px]:w-[300px] object-cover rounded-lg '
       src={tutor.image}>
     </img>
     </div>
     <div className='flex flex-col   p-2 gap-20 max-[987px]:gap-10 max-[610px]:gap-5  text-white ' >
     <h2 className='text-8xl max-[987px]:text-6xl font-bold '>
       {tutor.fullName}
     </h2>
     <div className='flex flex-col gap-14 text-3xl max-[610px]:gap-5 max-[987px]:text-2xl text-white'>
     <div className='flex items-center gap-2'>
     <FaGraduationCap /> 
     {tutor.language}
     </div>
     <div className='text-white flex items-center gap-2'>
     <IoLanguage />
      Speaks {tutor.language} (Native)
     </div>
     </div>
      </div>

      </div>
   </div>
   <div className='flex justify-center item-center mt-10 p-3 '>
   <div className='text-white  gap-10 p-2 min-[992px]:w-2/3   flex flex-col'>
   <h1 className='font-bold text-4xl  '>
       About the tutor
   </h1>
   <p className='text-2xl whitespace-normal break-words'>
       {tutor.description}
   </p>

   <button onClick={()=> navigate(`/booking/${tutor._id}`)}
    className='border mt-10 rounded px-5 py-2 text-2xl tracking-wide   text-white  font bold bg-cyan-950 hover:bg-cyan-700 '>
     Book Now
     </button>


   </div>
   </div>
   

   </div> }

   {otherTutors &&
    <div className='flex items-center mt-20 '>

    
    <div className='flex mt-10 flex-col min-[992px]:w-2/3 min-[992px]:ml-36  min-[1650px]:ml-72 p-2 gap-1 '>
    <h1 className='text-4xl p-5 font-bold text-white'>
      You might also like
    </h1>

    
   <div className=' p-1  flex overflow-x-auto items-center gap-6'>
    {
      otherTutors.map((tutor) =>(
       <TutorCard2 tutor={tutor} />

      ))
    }
   </div>
   </div>
   </div>
   
   }
    
    </div>
 

  )
}

export default Details
