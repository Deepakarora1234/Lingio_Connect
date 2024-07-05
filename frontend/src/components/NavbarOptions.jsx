import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

const NavbarOptions = () => {
  const navigate = useNavigate();
  const {  logout, isAuthenticated, user,  loginWithRedirect } = useAuth0();
  const auth0Id = user?.sub
  const flag = (auth0Id === "google-oauth2|111072593195741566885" || auth0Id === "google-oauth2|106104531043960313648") ? true : false

  const handleSelectChange = (event) => {
    const selectedOption = event.target.value;
    if (selectedOption === 'AddTutor') {
      navigate('/AddTutor');
    } else if (selectedOption === 'MyTutors') {
      navigate('/my-tutors');
    } else if (selectedOption === 'Logout') {
      // Handle logout logic here, e.g., clear authentication tokens
      logout({ logoutParams: { returnTo: window.location.origin } })
      console.log('Logging out');
    }
    else if(selectedOption === 'Login'){
      loginWithRedirect()

    }
  };

  return (
    <select 
      className='bg-cyan-950 border-2 mr-2 rounded-full p-1 hover:bg-black text-white'
      onChange={handleSelectChange}
      defaultValue=""
    >
      <option value="" disabled>Options</option>
      {isAuthenticated && flag && (
      <option value="AddTutor">Add Tutor</option>

      )}
      {isAuthenticated && (

      <option value="MyTutors">My Tutors</option>
      )}
      
      <option value={isAuthenticated ? "Logout" : "Login"}>{isAuthenticated ? "Logout" : "Login"}</option>
    </select>
  );
};

export default NavbarOptions;
