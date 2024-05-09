import {React, useState} from 'react'
import Select from "react-select";
import Range from "rc-slider/lib/Slider";
import { useSearchContext } from '../context/SearchContext';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const search = useSearchContext()
  const navigate = useNavigate()

  const options = [
    { value: "English", label: "English" },
    { value: "German", label: "German" },
    { value: "Russian", label: "Russian" },
    { value: "Korean", label: "Korean" },
    { value: "Japanese", label: "Japanese" },
    { value: "Spanish", label: "Spanish" },
    { value: "French", label: "French" },
  ];

  const Priceoptions = [
    { value: 'below_2000', label: 'Below 2000' },
    { value: '2000_5000', label: '2000 - 5000' },
    { value: '5000_10000', label: '5000 - 10000' },
    { value: '10000_above', label: '10000 and above' },
  ];
  const Durationoptions = [
    { value: 'below_4', label: 'less than 4 weeks' },
    { value: '4_6', label: '4 - 6 weeks' },
    { value: '6_above', label: 'more than 6 weeks' },
  ];
  


  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(null);



  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    console.log(selectedOption);
  };
  const handleSelectChangePrice = (selectedPrice) => {

    setSelectedPrice(selectedPrice);
    console.log(selectedPrice)
  };
  const handleSelectChangeDuration = (selectedDuration) => {

    setSelectedDuration(selectedDuration);
    console.log(selectedDuration)
  };

  const handleSubmit = (event)=>{
      event.preventDefault()

      search.saveSearchValues(
        selectedOption,
        selectedPrice,
        selectedDuration
      )
      
      navigate("/search")
      
  }

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: "0.375rem",
      borderColor: "#004250",
      "&:hover": {
        borderColor: "#004250",
      },
      boxShadow: "none",
      backgroundColor: "black",
      //   paddingLeft:'20px',
      //   paddingRight:'20px',
      gap: "100px",
      color: "white",
      fontWeight: "",
      fontSize: "1.2rem",
      display: "flex",
      justifyContent: "space-between",
    }),
    menu: (provided) => ({
      ...provided,

      marginTop: "0.5rem",
      borderRadius: "0.375rem",
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      backgroundColor: "",
      color: "white",
    }),
    placeholder: (provided) => ({
      ...provided,
      paddingLeft: "2px",
      //   paddingRight:'20px',
      color: "white",
    }),
    singleValue: (provided) => ({
      ...provided,

      color: "white",
    }),
    input: (provided) => ({
      ...provided,
      color: "white",
    }),

    option: (provided) => ({
      ...provided,
      backgroundColor: "black",
      color: "white",
      "&:hover": {
        backgroundColor: "black",
      },
    }),
  };
  return (
    <div className="grid grid-cols-1 min-[604px]:grid-cols-2 p-3  text-white mt-3">
    <div className="">
      <Select
        className=" text-white p-3"
        options={options}
        value={selectedOption}
        onChange={handleSelectChange}
        placeholder="English"
        isSearchable
        styles={customStyles}
      />
    </div>
     
      <div className=''>
        <Select 
        className=' text-white p-3'
        options={Priceoptions}
        value={selectedPrice}
        onChange={handleSelectChangePrice}
        placeholder="Price Range"
        isSearchable
        styles={customStyles}
       />
        </div>


  <div className=''>
        <Select 
        className=' text-white p-3'
        options={Durationoptions}
        value={selectedDuration}
        onChange={handleSelectChangeDuration}
        placeholder="Course Duration"
        isSearchable
        styles={customStyles}
       />
        </div>
        <button type='submit' onSubmit={handleSubmit} className="border rounded  bg-cyan-950 text-xl p-2 m-3">
          Search
        </button>
        
      
    
  </div>

  )
}

export default SearchBar
