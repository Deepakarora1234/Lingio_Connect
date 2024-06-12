// import React, { createContext, useState } from "react"
// import { useAuth0 } from '@auth0/auth0-react'



// const SocketContext = createContext(undefined)

// export const SocketContextProvider = ({children})=>{
//     const [socket , setSocket] = useState(null)

//     const [onlineTutors, setOnlineTutors] = useState([])

//     const {user} = useAuth0()

//     useEffect(()=>{
//         if(authUser) {
//             const socket = io("http://localhost:7000",{
//                 query:{
//                     userId : user.sub,
//                 },
//             })

//             setSocket(socket)

//             socket.on("getOnlineUsers", (users)=>{
//                 setOnlineUsers(users)
//             })

//             return () => socket.close()

//         }else{
//             if(socket)
//             {
//                 socket.close()
//                 setSocket(null)
//             }

//         }
//     }, [authUser])


//     return (
//         <SocketContext.Provider value={{}} >
//         {
//             children
//         }

//         </SocketContext.Provider>
//     )
// }