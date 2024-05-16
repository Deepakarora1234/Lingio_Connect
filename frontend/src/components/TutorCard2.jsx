import React,{useState} from 'react'
import { FaGraduationCap } from "react-icons/fa";
import { IoLanguage } from "react-icons/io5";
import { FaRupeeSign } from "react-icons/fa";
import Lottie from 'lottie-react'
import TutorCardAnimation from "../assets/TutorCard_Animation.json"
import { useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';

const TutorCard2 = ({tutor}) => {
    // const history = useHistory();

    // const handleViewDetails = () => {
    //   // Navigate to the details page of the clicked tutor
    //   history.push(`/home`);
    // };
 
  const navigate = useNavigate()
  return (
    //border-2 rounded-md border-cyan-950 min-[1000px]:flex min-[1000px]:w-2/3  justify-between  p-3
    <div  className='flex gap-1'>
    <div className='border-2 rounded-md border-cyan-950  w-[500px]  grid grid-cols-2  p-3 '>

       <div className='p-3'>
       <img className='h-[200px] object-cover rounded-lg '
        src={tutor.image}>
      </img>
      </div>
      


      <div>
      <div className='flex flex-col   p-2 gap-3 flex-auto  text-white ' >
      <h2 className='text-2xl font-bold'>
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
      <div className='flex gap-3 items-center max-[970px]:gap-9 min-[971px]:justify-between '>
      <div className='flex items-center'>
      <FaRupeeSign />{tutor.cost}
      </div>
      <div className='flex items-center '>
      {tutor.courseDuration} weeks
      </div>

      </div>
      <div className='text-white p-3 gap-2  flex flex-col justify-between'>
     
      <div className='flex flex-col gap-3'>
      <button  onClick={()=>navigate(`/details/${tutor._id}`)}  className='border rounded px-5 py-2 text-xl  text-white  font bold bg-cyan-950 hover:bg-cyan-700 '> View Details</button>
      </div>
     
       
      </div>
      </div>
      </div>
      

      </div>
       
      




      
      
     
      
    </div>
    
    </div>
    
  )
}

export default TutorCard2
