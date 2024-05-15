import React from 'react'
import { useSearchContext } from '../context/SearchContext'
import { useQuery } from 'react-query';
import * as apiClient from "../apiClient.js"
import TutorCard from '../components/TutorCard.jsx';
import SearchBar from '../components/SearchBar.jsx';
import Header from '../components/Header.jsx';


const Search = () => {
  const search = useSearchContext();
  console.log(search.language.value);
  console.log(search.price.value);
  console.log(search.duration.value);

  const language = search.language.value ? search.language : { value: '', label: 'Set Language' };
  const price = search.price.value ? search.price : { value: '', label: 'Set Price' };
  const duration = search.duration.value ? search.duration : { value: '', label: 'Set Duration' };


  const searchParams = {
    language,
    duration,
    price
  }

  const {data : tutors} = useQuery(["fetchTutorsBasedOnSearch", searchParams], ()=>apiClient.fetchTutorsBasedOnSearch(searchParams))
  console.log(tutors)

  return (
    <div className='p-2'>
    <Header />
    <SearchBar />
     <div className='grid grid-cols-1 p-3 text-white gap-20'>
        { tutors && tutors.length > 0 ? (
          tutors.map((tutor, index)=>(
            <TutorCard key={index} tutor = {tutor} />
          ))

        ) :(
          <div className='text-white'>
            no tutors available
          </div>
          )
      }
     </div>
    </div>
  )
}

export default Search
