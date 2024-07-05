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


const BookingForm = ({currentUser, paymentIntentData, tutorId}) => {
    const [isSubmitting , setIsSubmitting] = useState(false)

   
    const {stripePromise} = useAppContext()

    const stripe = useStripe()
    const elements = useElements()

    const userId = currentUser?._id
 
  

    const { handleSubmit, register, setValue, formState: { errors } } = useForm()

    useEffect(() => {
        if (currentUser) {
            setValue('name', currentUser.name)
            setValue('email', currentUser.email)
        }
    }, [currentUser, setValue])

    const {mutate : bookTutor, isLoading} = useMutation(apiClient.createTutorBooking, {
      onSuccess:()=>{
        console.log("success")
      },
      onError:(error)=>{
        console.log(error)
      
      }

    })



    const onSubmit = async(formData)=>{
        
      if (!stripe || !elements  || isSubmitting) {
        return;
      }
      
      setIsSubmitting(true)

      const result = await stripe.confirmCardPayment(paymentIntentData?.clientSecret, {
        payment_method:{
          card:elements.getElement(CardElement)
        }

      })
      

      if(result.paymentIntent?.status === 'succeeded') {
        bookTutor({...formData,  paymentIntentId : paymentIntentData?.paymentIntentId, tutorId : tutorId, userId:currentUser?._id})
      }

      setIsSubmitting(false)


    }
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
    <div className='flex  border border-cyan-950 justify-center'>
        <div className=' rounded-lg justify-center flex flex-col gap-3 py-7 px-20 max-[1174px]:px-10 max-[524px]:px-5 '>
        <div className='text-white text-4xl  min-[468px]:text-6xl p-3 max-[524px]:p-2 mb-6 font-bold'>
            Enter Details
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>

        <input className='bg-black  p-2 min-[486px]:w-[400px]    text-xl border-2 text-white  rounded-lg border-cyan-950' placeholder='Enter name' type='text' name='name' {...register("name",{ required : "This is a required field"})} />
        {errors.name && (
          <span className='text-red-700 text-sm'>{errors.name.message}</span>
        )}

        <input className='bg-black p-2 text-xl min-[486px]:w-[400px]   border-2 text-white  rounded-lg border-cyan-950' placeholder='Enter email' type='email' name='email' {...register("email",{ required : "This is a required field"})} />
        {
          errors.email && (
        <span className='text-red-700 text-sm'>{errors.email.message}</span>

          )
        }
        <CardElement
        id="payment-element"
        options={cardElementOptions}
        className='border-2 p-4 min-[476px]:w-[400px]  text-xl text-white rounded-lg border-cyan-950'
         />
         <div className='text-white text-sm'> For testing, use this card number: 4000 0035 6000 0008 </div>
        <button type='submit' className='hover:bg-black mt-4 bg-cyan-950 text-white font-bold text-xl p-3 border rounded-lg ' >{ isLoading ? "Saving..." : "Confirm Booking"}</button>
        </form>


        </div>
    </div>
  )
}

export default BookingForm

