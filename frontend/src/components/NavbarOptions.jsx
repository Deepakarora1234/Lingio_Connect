import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

const NavbarOptions = () => {
  const navigate = useNavigate();
  const {  logout } = useAuth0();

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
  };

  return (
    <select 
      className='bg-cyan-950 border-2 mr-2 rounded-full p-1 hover:bg-black text-white'
      onChange={handleSelectChange}
      defaultValue=""
    >
      <option value="" disabled>Options</option>
      <option value="AddTutor">Add Tutor</option>
      <option value="MyTutors">My Tutors</option>
      <option value="Logout">Logout</option>
    </select>
  );
};

export default NavbarOptions;
