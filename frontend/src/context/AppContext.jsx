import  React, {useContext, useState} from "react"
import {loadStripe} from "@stripe/stripe-js"

const STRIPE_KEY = "pk_test_51P24TZSCGEvzC7HS0ILDrhpbicJz5kcbkJbbL9JO1t3WiQ57I3RwgoBrMHXYGZTZ9NnPNNYCBbAu6Xcf73DVtJfL00ed6c9l7w"

const AppContext = React.createContext(undefined)
const stripePromise = loadStripe(STRIPE_KEY)

export const AppContextProvider = ({children})=>{
       return (
        <AppContext.Provider value={{
            stripePromise
        }}>
        {children}

        </AppContext.Provider>
       )

}
export const useAppContext = ()=>{
    const context = useContext(AppContext)
    return context
}