import React, {useState} from 'react'
import { useSearchContext } from '../context/SearchContext'
import { useQuery } from 'react-query';
import * as apiClient from "../apiClient.js"
import TutorCard from '../components/TutorCard.jsx';
import SearchBar from '../components/SearchBar.jsx';
import Header from '../components/Header.jsx';
import Pagination from "../components/Pagination.jsx"


const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState(1)
  
  const language = search.language.value ? search.language : { value: '', label: 'Set Language' };
  const price = search.price.value ? search.price : { value: '', label: 'Set Price' };
  const duration = search.duration.value ? search.duration : { value: '', label: 'Set Duration' };


  const searchParams = {
    language,
    duration,
    price,
    page:page.toString(), 
  }

  const {data : tutors} = useQuery(["fetchTutorsBasedOnSearch", searchParams], ()=>apiClient.fetchTutorsBasedOnSearch(searchParams))
  

  return (
    <div className='p-2'>
    <Header />
    <SearchBar />
     <div className='grid grid-cols-1 p-3 text-white gap-20'>
        { tutors?.data && tutors?.data.length > 0 ? (
          tutors?.data.map((tutor, index)=>(
            <TutorCard key={index} tutor = {tutor} />
          ))

        ) :(
          <div className='text-white'>
            no tutors available
          </div>
          )
      }
     </div>
     <div>
          <Pagination page = {tutors?.pagination.page || 1} 
            pages={tutors?.pagination.pages || 1}
            onPageChange={(page)=>setPage(page)}
          />
        </div>
    </div>
  )
}

export default Search
