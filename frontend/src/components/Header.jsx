import React, { useState, useEffect } from 'react';
import { LuLanguages } from "react-icons/lu";
import { useAuth0 } from "@auth0/auth0-react";
import { useMediaQuery } from "@mui/material";
import NavbarOptions from './NavbarOptions';
import {Link} from "react-router-dom"

const Header = () => {
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();
  const auth0Id = user?.sub
  const flag = (auth0Id === "google-oauth2|111072593195741566885" || auth0Id === "google-oauth2|106104531043960313648") ? true : false
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='flex justify-between bg-cyan-950 h-20'>
      <div className='flex items-center p-3 mb-2 ml-1'>
        <Link to={"/home"} className='text-white gap-2 flex text-2xl max-[325px]:text-xl'>
          <LuLanguages className='my-auto' /> Lingio Connect
        </Link>
      </div>
      <div className='flex gap-4 justify-between items-center mr-6 max-[546px]:mr-0 max-[546px]:gap-2 '>
        {windowWidth <= 700 ? (
          
          <NavbarOptions />
        ) : (
          // Render components for larger screens
          <div className='flex gap-4 justify-between items-center mr-6 max-[546px]:mr-0 max-[546px]:gap-2 '>
            {isAuthenticated && flag &&  (
              <Link to={"/AddTutor"} className='hover:bg-black hover:cursor-pointer text-white border max-[546px]:px-1 max-[546px]:text-sm px-3 py-1 border-slate-100 rounded'>Add Tutor</Link>

            )}
            {isAuthenticated && (
            <Link to={`/my-tutors`} className='hover:bg-black max-[546px]:px-1 max-[546px]:text-sm hover:cursor-pointer text-white border px-3 py-1 border-slate-100 rounded'>My Tutors</Link>
              
          ) }
            <button onClick={!isAuthenticated ? () => loginWithRedirect() : () => logout({ logoutParams: { returnTo: window.location.origin } })} className='hover:bg-black max-[546px]:px-1 max-[546px]:text-sm hover:cursor-pointer text-white border px-3 py-1 border-slate-100 rounded'>{isAuthenticated ? "Logout" : "Login"}</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
