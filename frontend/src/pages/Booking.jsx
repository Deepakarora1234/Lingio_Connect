import React ,{useState,useEffect} from 'react'
import * as apiClient from "../apiClient.js"
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery } from 'react-query'
import Header from '../components/Header.jsx'
import { MdOutlineVerifiedUser } from "react-icons/md";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { format, addDays } from 'date-fns';
import { FaRegQuestionCircle } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { Elements } from "@stripe/react-stripe-js";
import { useAppContext } from '../context/AppContext.jsx'
import { useAuth0 } from '@auth0/auth0-react'
import {useForm} from "react-hook-form"
import BookingForm from './BookingForm.jsx'

const Booking = () => {


    const [isSubmitting , setIsSubmitting] = useState(false)
    const [hasBooked, setHasBooked] = useState(false);

    const {id} = useParams()
    const {stripePromise} = useAppContext()

    const {data : tutor} = useQuery(["fetchTutorById", id], ()=> apiClient.fetchTutorById(id),{enabled:!!id})

    const {user} = useAuth0()
    const {data :currentUser} = useQuery(["fetchCurrentUser", user?.sub], ()=> apiClient.fetchCurrentUser(user.sub),{
      enabled:!!user
    })
    

    const userId = currentUser?._id

    useEffect(() => {
      if (tutor && userId) {
        const hasBooking = tutor.bookings.some(booking => booking.userId === userId);
        setHasBooked(hasBooking);
      }
    }, [tutor, userId]);


    const {data : paymentIntentData} = useQuery(["createPaymentIntent", id,userId ], ()=>apiClient.createPaymentIntent(id, userId), {
      enabled:!!id && !!userId

    })
   

    const getTomorrowFormattedDate = () => {
        const tomorrow = addDays(new Date(), 1);
        const day = format(tomorrow, 'EEEE');
        const date = format(tomorrow, 'do');
        const month = format(tomorrow, 'MMMM');
      
        return `${day} ${date} ${month}`;
      };

      const cardElementOptions = {
        style: {
            base: {
                color: '#ffffff',
                fontSize: '16px',
                '::placeholder': {
                    color: '#aab7c4',
                },
                backgroundColor: '#000000', 
            },
            invalid: {
                color: '#fa755a',
                iconColor: '#fa755a',
            },
        },
    };

  return (
   
        <div className='text-white'>
    <Header />
    {tutor && (
        <div className='flex items-center justify-center  mt-12'>
    <div className='grid grid-cols-1 lg:grid-cols-2 border border-cyan-950 gap-7 p-4'>
    <div className='flex flex-col p-6 border border-cyan-950 gap-7 '>

    <div className='flex flex-col border-b-2  gap-5 border-slate-600 '>
    <div className='flex   gap-4'>
      <img src={tutor.image} alt='tutor-image'
        className='h-28 rounded-md'
      />
      <div className='flex flex-col gap-1'>
        <div className='text-white'>
          {tutor.language}
        </div>
        <div className='text-white font-extrabold text-3xl'>
          {tutor.fullName}
        </div>
        <div className='text-white'>
            {tutor.name}
        </div>
        <div className='flex items-center gap-1 '>
        <MdOutlineVerifiedUser /> Verified
        </div>
      </div>
    </div>

    <div className='flex  items-center justify-center p-5 text-xl gap-5 '>
    <span className='text-white'>
        {tutor.courseDuration} Weeks
    </span>

    <span className='text-white flex items-center'>
    <FaIndianRupeeSign /> {tutor.cost}
    </span>

    </div>
    </div>


    <div className='flex flex-col pb-10 px-2 gap-1  text-white border-b-2 border-slate-600'>
    <p className='font-bold text-2xl'> First Lesson- {getTomorrowFormattedDate()}</p>
    <p className=''>
      Time is based on your location  
    </p>
    </div>

    <div className='flex pb-10 px-2 flex-col border-b-2 text-xl gap-4 border-slate-600'>
        <div className='font-bold text-3xl'>
            Your Order
        </div>
        <div className='flex justify-between items-center'>
            <span>
            {tutor.courseDuration} weeks course
            </span>
            <span className='text-white flex items-center'>
             <FaIndianRupeeSign /> {tutor.cost}
            </span>
        </div>
        <div className='flex justify-between items-center'>
        <span className='text-white flex items-center gap-2'>
           Processing fee <FaRegQuestionCircle className='mt-1' />
            </span>
            <span className='text-white flex items-center'>
             <FaIndianRupeeSign  /> 49.99
            </span>
        </div>
        <div className='flex justify-between items-center'>
        <span className='text-white flex items-center font-bold text-2xl '>
        Total
        </span>
            <span className='text-white flex items-center'>
             <FaIndianRupeeSign  /> {tutor.cost + 49.99}
            </span>
        </div>
    </div>

    <div className='  flex flex-col bg-cyan-950 text-white p-3  rounded-md '>
    <div className='flex items-center gap-2 '>
    <MdVerified />
    <p>
        Free replacement or refund
    </p>
    </div>
    <div className='ml-6'>
    Try another tutor for free or get a <br /> refund
    </div>
    </div>
    </div>

    

    {currentUser && paymentIntentData && !hasBooked && (
        
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: paymentIntentData.clientSecret,
          }}
        >
          <BookingForm
            currentUser={currentUser}
            paymentIntentData={paymentIntentData}
            tutorId = {id}
          />
        </Elements>
      )}
      {hasBooked &&  (
        <div className='flex items-center justify-center lg:mt-72 h-40'>
                <div className='bg-red-500 text-white font-bold text-xl py-4 px-8 rounded-md shadow-md'>
                  Already booked
                </div>
              </div>
      )}
    

    </div>
    </div>
    )}
    </div>

    
    
  )
}

export default Booking
//4000 0035 6000 0008