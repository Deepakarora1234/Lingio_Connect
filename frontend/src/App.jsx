import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom"
import Welcome from './pages/Welcome'
import Register from './pages/Register'
import Login from './pages/Login'
import { useAuth0 } from "@auth0/auth0-react";
import Home from './pages/Home'
import NavbarMenu from './components/NavbarMenu'
import AddTutor from "./pages/AddTutor"
import Search from './pages/Search'
import Details from './pages/Details'
import Booking from './pages/Booking'
import { Elements } from '@stripe/react-stripe-js'
import { useAppContext } from './context/AppContext'
import MyTutors from './pages/MyTutors'
import Learning from './pages/Learning'


function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  if(user)
  console.log(user.sub)
  const {stripePromise} = useAppContext()
  return (
    <Router >
      <Routes>
      <Route path='/' element={!isAuthenticated ? <Welcome /> : <Home />} />
      <Route path = '/sidebar' element={<NavbarMenu />}></Route>
       <Route path='/AddTutor' element= {<AddTutor />} />
       <Route path='/search' element= {<Search />} />
       <Route path='/learning/:id' element= {<Learning />} />
       <Route path='/my-tutors' element= {<MyTutors />} />
       <Route path='/details/:id' element= {<Details />} />
       <Route path='/booking/:id' element= {
       
       <Booking />
     
       } />
       <Route path='/home' element={!isAuthenticated ? <Welcome /> : <Home />} />
     
      </Routes>
    </Router>
    
   
  )
}

export default App
