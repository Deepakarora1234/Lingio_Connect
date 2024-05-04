import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation , useQuery} from 'react-query';
import * as apiClient from "../apiClient.js"
import Select from 'react-select';
import Range from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';
import TutorCard from '../components/TutorCard.jsx';


const Home = () => {
    const { user, isAuthenticated } = useAuth0();

    const mutation = useMutation(apiClient.auth);

    useEffect(() => {
          const helper= async()=>{
            if (isAuthenticated) {
              try {
                  console.log(user)
                 mutation.mutate({auth0Id : user.sub, email : user.email, name:user.name, picture : user.picture});
                  
              } catch (error) {
                  console.error("Error:", error);
              }
          }
     

          }
          helper()
          
       
           

        
    }, [isAuthenticated, user]);

    const {data : tutors,isLoading, isError} = useQuery("fetchTutors", async()=> await apiClient.fetchTutors())
    console.log(tutors)
  //   if (isLoading) return <div>Loading...</div>;
  // if (isError) return <div>Error fetching data</div>;
  

  const options = [
    { value: 'English', label: 'English' },
    { value: 'German', label: 'German' },
    { value: 'Russian', label: 'Russian' },
    { value: 'Korean', label: 'Korean' },
    { value: 'Japanese', label: 'Japanese' },
    { value: 'Spanish', label: 'Spanish' },
    { value: 'French', label: 'French' },
   
  ];

  
  const [selectedOption, setSelectedOption] = useState(null);

  
  const handleSelectChange = (selectedOption) => {

    setSelectedOption(selectedOption);
    console.log(selectedOption)
  };
  const customStyles = {
        control: (provided) => ({
          ...provided,
          borderRadius: '0.375rem', 
          borderColor: '#004250',
          '&:hover':{
            borderColor: '#004250',
          }, 
          boxShadow: 'none',
          backgroundColor:'black',
        //   paddingLeft:'20px',
        //   paddingRight:'20px',
          gap:"100px",
          color:'white',
          fontWeight: '',
          fontSize:'1.2rem',
          display:'flex',
          justifyContent: 'space-between'
          

        }),
        menu: (provided) => ({
          ...provided,
          
          marginTop: '0.5rem', 
          borderRadius: '0.375rem', 
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          backgroundColor:'',
          color:'white'
         
        }),
        placeholder: (provided) => ({
            ...provided,
            paddingLeft:'2px',
        //   paddingRight:'20px',
            color: 'white', 
        }),
      singleValue: (provided) => ({
        ...provided,
        
        color: 'white', 
      }),
      input: (provided) => ({
        ...provided,
        color: 'white', 
      }),
  
        option: (provided) => ({
          ...provided,
          backgroundColor: 'black', 
          color: 'white', 
          '&:hover': {
            backgroundColor: 'black',
          },
        }),
      };
      const [sliderValue, setSliderValue] = useState(50); // Initial value set to 50

      // Function to handle slider change
      const handleSliderChange = (event) => {
        setSliderValue(event.target.value);
      };
      const [priceRange, setPriceRange] = useState([0, 1000]);
    const handlePriceRangeChange = (newPriceRange) => {
        setPriceRange(newPriceRange);
    };

    return (
        <div>
            <Header />
            <div className='p-4 text-white text-4xl mt-6 font-bold  '>
            Online tutors & teachers for private lessons
            </div>
            <div className='flex justify-between items-center p-3  text-white mt-3'>
            <div className=''>
            <Select 
            className=' text-white p-3'
            options={options}
            value={selectedOption}
            onChange={handleSelectChange}
            placeholder="English"
            isSearchable
            styles={customStyles}
           />
            </div>
            <div className='flex flex-col gap-3'>
            <h2>Price Range: {priceRange[0]} rupees - {priceRange[1]} rupees</h2>        
            <div className=''>
                <Range
                       min={0}
                            max={1000}
                            value={priceRange}
                            onChange={setPriceRange}
                            allowCross={false} // Disable crossing handles
                            step={1}
                            marks={{ 0: '0', 1000: '1000' }} // Optional: marks on the slider
            />
            </div>
            </div>
            

            </div>
            <div className='flex justify-between' >
            <div className=' grid grid-cols-1 p-2 gap-20 text-white'>
            {
              tutors.map((tutor, index)=>(
              <TutorCard key={index} tutor={tutor} />
              ))

            }

            </div>
            </div>
           
        </div>
    );
};


export default Home;





