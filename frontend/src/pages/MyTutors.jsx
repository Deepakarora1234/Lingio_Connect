import React from 'react'
import Header from '../components/Header'
import { useQuery } from 'react-query'
import * as apiClient  from "../apiClient.js"
import { useAuth0 } from "@auth0/auth0-react";
import TutorCard3 from '../components/TutorCard3.jsx';

const MyTutors = () => {
    
    const { user } = useAuth0();

    const auth0Id = user?.sub

    const {data : currentUser} = useQuery(["fetchCurrentUser", auth0Id], ()=>apiClient.fetchCurrentUser(auth0Id))

    const userId = currentUser?._id

    const {data :tutors} = useQuery(["fetchMyBookings", userId], ()=>apiClient.fetchMyBookings(userId))
    console.log(tutors)
  return (
    <div>
    <Header />
    <div className='flex justify-center mt-4  p-4 '>
    <div className='grid grid-cols-1 sm:grid-cols-2  gap-5  p-2'>
    {
       tutors && tutors.map((tutor)=>(
        <TutorCard3 tutor = {tutor} />
       ))
    }

    </div>

    </div>
      
    </div>
  )
}

export default MyTutors
