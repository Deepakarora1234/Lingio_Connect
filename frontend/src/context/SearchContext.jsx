import React, { useContext , useState} from "react"

const  SearchContext  = React.createContext(undefined)

export const SearchContextProvider = ({children}) =>{
    const [language, setLanguage] = useState(()=>sessionStorage.getItem("language") || "")
    const [price, setPrice] = useState(()=>sessionStorage.getItem("price") || "")
    const [duration, setDuration] = useState(()=>sessionStorage.getItem("duration") || "")

    const saveSearchValues = (language, price, duration)=>{
       
        sessionStorage.setItem("language", language);
        sessionStorage.setItem("price", price);
        sessionStorage.setItem("duration", duration);

        setLanguage(language)
        setPrice(price)
        setDuration(duration)
       
    }
    return(
        <SearchContext.Provider value={{language, price , duration, saveSearchValues }}>
            {children}
        </SearchContext.Provider>
    ) 
    
}
export const useSearchContext = ()=>{
   const context =  useContext(SearchContext)
   return context
}

