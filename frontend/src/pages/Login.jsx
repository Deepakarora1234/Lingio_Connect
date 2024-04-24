import React from 'react'
import Header from '../components/Header'
import Register_Animation from "../assets/Register_Animation.json"
import Lottie from 'lottie-react'
import { FcGoogle } from "react-icons/fc";
import { LuLanguages } from "react-icons/lu";

const Login = () => {
  return (
    <div className='flex flex-col gap-6 '>
    <div className='flex justify-between bg-cyan-950 h-20'>
     <div className='flex items-center p-3 mb-2 ml-1'>
      <span className='text-white gap-2 flex text-2xl'>
      <LuLanguages className='my-auto' /> Lingio Connect
      </span>
     </div>
     
      
    </div>
    <div className=' md:h-screen grid items-center grid-cols-1 lg:grid-cols-2 gap-4 max-[1024px]:gap-8 p-3 '>
    <div className='flex items-center justify-center p-3'>
   
     <Lottie  animationData={Register_Animation}/>
    </div>
    <div className='flex  justify-center   '>
        <div className=' rounded-lg justify-center flex flex-col gap-3 py-7 px-20 max-[1174px]:px-10 max-[524px]:px-5 '>
        <div className='text-white text-3xl p-3 max-[524px]:p-2 mb-6 font-bold'>
            Login to Lingio-Connect
        </div>
        <input className='bg-black p-2 text-xl border-2 text-white  rounded-lg border-cyan-950' placeholder='Enter email' type='email' name='email' />
        <input className='bg-black p-2 text-xl border-2 text-white  rounded-lg border-cyan-950' placeholder='Enter password' type='password' name='password' />
        <span className='text-white text-xs p-1 mb-2 '>
            Don't have an account? Click here to Register
        </span>
        <button className='hover:bg-black mt-4 bg-cyan-950 text-white font-bold text-xl p-3 border rounded-lg ' >Login</button>
        <div className="flex items-center justify-center mt-8">
      <div className="border-t border-cyan-950 border-3 w-1/3"></div>
      <div className="px-4 max-[462px]:p-0 text-sm max-[362px]:text-xs text-white">or Login with</div>
      <div className="border-t  border-cyan-950 border-3 w-1/3"></div>
     </div>
     <button className='hover:bg-cyan-950 hover:text-white max-[342px]:text-sm   flex justify-center items-center gap-3  bg-white  font-bold text-xl p-3 border rounded-3xl' > <FcGoogle className='text-3xl' />  Login with Google</button>


        </div>
    </div>

    </div>
      
    </div>
  )
}

export default Login
// https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1123.jpg?w=740&t=st=1713273247~exp=1713273847~hmac=dde9ce447f136117a6bd3e8779c6e5dae1ef4bebc0f90b9ea5cc5a1414c6ef36
