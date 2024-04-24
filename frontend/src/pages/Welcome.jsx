import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import About from '../components/About'
import Languages from '../components/Languages'
import Announcement from '../components/Announcement'
import Working from '../components/Working'
import Footer from '../components/Footer'
import { useAuth0 } from "@auth0/auth0-react";
import * as apiClient from "../apiClient.js"
import {useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient} from "react-query"

const Welcome = () => {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
  // const navigate = useNavigate();
  // if(isAuthenticated)
  // {
  //       const mutation = useMutation(apiClient.auth)
  //       mutation.mutate({auth0Id : user.sub, email : user.email , name: user.name})

  //     //  navigate("/home");
  // }


  return (
    <div className='flex flex-col min-h-screen'>
    <Header />
    <Hero />
    <About />
    <Languages />
    <Announcement />
    <Working />
    <Footer />
    
      
    </div>
  )
}

export default Welcome
