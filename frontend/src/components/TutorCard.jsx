import React,{useState} from 'react'
import { FaGraduationCap } from "react-icons/fa";
import { IoLanguage } from "react-icons/io5";
import { FaRupeeSign } from "react-icons/fa";
import Lottie from 'lottie-react'
import TutorCardAnimation from "../assets/TutorCard_Animation.json"
import { useNavigate } from 'react-router-dom';

const TutorCard = ({tutor}) => {
  
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate()
  return (
    //border-2 rounded-md border-cyan-950 min-[1000px]:flex min-[1000px]:w-2/3  justify-between  p-3
    <div  className='flex gap-10'>

   
    <div className='border-2 rounded-md border-cyan-950 grid min-[869px]:w-2/3  grid-cols-3 p-3 max-[970px]:grid-cols-1 '
    onMouseEnter={() => setIsHovered(true)} // Set isHovered to true on mouse enter
        onMouseLeave={() => setIsHovered(false)} // Set isHovered to false on mouse leave
        >
       <div className='grid grid-cols-3 col-span-2 max-[681px]:grid-cols-1 ' >
       <div className='   p-3 col-span-1   '>
       <img className=' object-cover rounded-lg '
        src={tutor.image}>
      </img>
      </div>



      <div className='flex flex-col  col-span-2 p-2 gap-3 flex-auto  text-white ' >
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
      </div>
      <div className='mt-3 line-clamp-2' >
        {tutor.description}
      </div>

      </div>
       </div>
      




      <div className='text-white p-3 gap-2  flex flex-col justify-between'>
      <div className='flex gap-3 items-center max-[970px]:gap-9 min-[971px]:justify-between '>
      <div className='flex items-center'>
      <FaRupeeSign />{tutor.cost}
      </div>
      <div className='flex items-center '>
      {tutor.courseDuration} weeks
      </div>

      </div>
      <div className='flex flex-col gap-3'>
      <button onClick={()=>navigate(`/details/${tutor._id}`)} className='border rounded px-5 py-2 text-xl  text-white  font bold bg-cyan-950 hover:bg-cyan-700 '> View Details</button>
      <button className='border-2 border-cyan-950 rounded px-5 py-2 text-xl mt-1  text-white font bold hover:bg-slate-700 hover:border-white '> Send Message</button>
      </div>
     
       
      </div>
      
     
      
    </div>
    <div className={`max-[869px]:hidden p-4 ${isHovered ? 'visible' : 'hidden'} `}>
    <Lottie className='h-40'   animationData={TutorCardAnimation}/>
    </div>
    </div>
    
  )
}

export default TutorCard
