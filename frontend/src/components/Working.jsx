import React from 'react'
import { FaStar } from "react-icons/fa";
import { GiGraduateCap } from "react-icons/gi";
import { IoLanguage } from "react-icons/io5";

const Working = () => {
  return (
    <div className='flex flex-col w-full whitespace-nowrap overflow-x-auto  mt-4 p-6 gap-8'>
    <div>
    <span className='flex-wrap   text-white text-6xl font-bold max-[831px]:text-4xl max-[515px]:whitespace-normal '>How Lingio-Connect works: </span>
    </div>
    <div className='flex overflow-x-auto items-center gap-6 '>
    <div className='flex border-4  rounded-md border-cyan-950  flex-col p-3    gap-3 '>
    <div className=' p-4'>
        <span className='bg-cyan-950 font-bold text-white px-4 py-3 border rounded-md'>
            1
        </span>
    </div>
    <div className='text-4xl text-white font-bold '>
        Find your tutor.
    </div>
    <div className='text-white  tracking-wide p-2'>
    We’ll connect you with a tutor who will  motivate, 
    challenge, and inspire you.
    </div>
    <div className='p-4 flex flex-col '>
    <div className='flex bg-black  rounded-lg p-3 gap-3 border border- z-30 mr-10'>
    <div className=' flex items-center  bg-contain bg-center  bg-no-repeat w-28' style ={{backgroundImage:"url('https://preply.com/cdn-cgi/image/format=auto,fit=contain,width=400/https://static.preply.com/static/ssr/_next/static/images/Milena-6565f848c6ee914e0d7c853e6aab5b3b.jpg')"}}>
    {/* <img className=' h-28' src='https://preply.com/cdn-cgi/image/format=auto,fit=contain,width=400/https://static.preply.com/static/ssr/_next/static/images/Milena-6565f848c6ee914e0d7c853e6aab5b3b.jpg' alt='dskjhfdskj'  /> */}
    </div>
    <div className='flex-1 flex text-white flex-col gap-2'>
        <div className='flex justify-between text-2xl'>
            <span >
                Milena
            </span>
            <span className='flex items-center  gap-1'>
            <FaStar className='text-white ' />
            4.9
            </span>
        </div>
        <div className='flex  gap-2'>
            <span>
            <GiGraduateCap className='text-white' />
            </span>
            <span className='text-sm'>French tutor</span>
        </div>
        <div className='flex  gap-2'>
            <span>
            <IoLanguage className='text-white' />
            </span>
            <span className='text-sm'>
            <p>Speaks French (Native),
            <br/>
            English (Advanced) +2
            </p>
            </span>
        </div>
        
    </div>

    </div>
    <div className='flex bg-black  p-3 gap-3 border text-white rounded-lg ml-3 mt-[-39px] z-20 mr-4  '>
    <div className='h-28 '>
    <img className='w-full h-full object-cover object-center' src='https://preply.com/cdn-cgi/image/format=auto,fit=contain,width=400/https://static.preply.com/static/ssr/_next/static/images/Bassel-61d8f18fa66d8bb94d172bede9abfdc7.jpg' alt='dskjhfdskj'  />
    </div>
    <div className='flex-1 flex flex-col gap-2'>
        <div className='flex justify-between text-2xl'>
            <span>
                Milena
            </span>
            {/* <span className='flex items-center  gap-1'>
            <FaStar className='text-white ' />
            
            </span> */}
        </div>
        <div className='flex gap-2'>
            <span>
            <GiGraduateCap className='text-white' />
            </span>
            <span className='text-sm'>French tutor</span>
        </div>
        <div className='flex  gap-2'>
            <span>
            <IoLanguage className='text-white' />
            </span>
            <span className='text-sm'>
            <p>Speaks French (Native),
            <br/>
            English (Advanced) +2
            </p>
            </span>
        </div>
        
    </div>

    </div>
    <div className='flex bg-black p-3 gap-3  border text-white rounded-lg ml-7 mt-[-39px] z-10 '>
    <div className='h-28 '>
    <img className='w-full h-full object-cover object-center' src='https://preply.com/cdn-cgi/image/format=auto,fit=contain,width=400/https://static.preply.com/static/ssr/_next/static/images/Sophia-b96057aa0eb60c3dd1995d0212f1f514.jpg' alt='profile'  />
    </div>
    <div className='flex-1 flex flex-col gap-2'>
        <div className='flex justify-between text-2xl'>
            <span>
                Milena
            </span>
            {/* <span className='flex items-center  gap-1'>
            <FaStar className='text-white ' />
            
            </span> */}
        </div>
        <div className='flex  gap-2'>
            <span>
            <GiGraduateCap className='text-white' />
            </span>
            <span className='text-sm'>French tutor</span>
        </div>
        <div className='flex  gap-2'>
            <span>
            <IoLanguage className='text-white' />
            </span>
            <span className='text-sm'>
            <p>Speaks French (Native),
            <br/>
            English (Advanced) +2
            </p>
            </span>
        </div>
        
    </div>
    </div>
    <div>
    </div>
    <div>
    </div>
    </div>
    </div>
    <div className='flex flex-col p-6 border-4 rounded-md border-cyan-950  text-white gap-2 '>
    <div className=' p-4'>
        <span className='bg-cyan-950 font-bold px-4 py-3 border rounded-md'>
            2
        </span>
    </div>
    <div className='text-4xl font-bold '>
        Find your tutor.
    </div>
    <div className='text-white  tracking-wide p-2' >
    Your tutor will guide the way through your first lesson and help you plan your next steps.
    </div>
    <div className='flex  items-center justify-center  '>
        <img className=' h-80 mt-7 ' src='https://preply.com/cdn-cgi/image/format=auto,fit=contain,width=400/https://static.preply.com/static/ssr/_next/static/images/card-2-da929e1032468274fff3c7a827157232.jpg' alt='step-2-image'>
        </img>
    </div>
    </div>
    <div className='flex flex-col p-6 gap-3 border-4 rounded-md border-cyan-950  text-white  '>
    <div className=' p-4'>
        <span className='bg-cyan-950 font-bold px-4 py-3 border rounded-md'>
            3
        </span>
    </div>
    <div className='text-4xl font-bold '>
    Speak. Read. Write. Repeat.
    </div>
    <div>
    Choose how many lessons you want to take each week and get ready to reach your goals!
    </div>
    <div className='flex  items-center justify-center  '>
        <img className=' h-80 mt-7 ' src='https://preply.com/cdn-cgi/image/format=auto,fit=contain,width=400/https://static.preply.com/static/ssr/_next/static/images/card-3-0bab46dd6b35951f6fc2e87968b6e3ea.jpg' alt='step-2-image'>
        </img>
    </div>
    </div>
    <div>
    </div>
    <div>
    </div>
    </div>
    </div>
  )
}

export default Working
 