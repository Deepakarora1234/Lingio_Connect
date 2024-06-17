
export const auth = async (user) => {
 
    const response = await fetch(`/api/auth`, {
        method:'POST',
        credentials: "include",
        headers:{
            "Content-Type":"application/json",
            
        },
        body : JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error("Error authenticating in our database");
    }
    console.log(response)
    return response.json();
  };

  export const addTutor = async(data)=>{
   
    const response = await fetch(`/api/tutor`, {
      method:"POST",
      credentials:"include",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(data)
      

    })
    const responseBody = await response.json()
    if(!response.ok)
    {
      throw new Error(responseBody.message)
    }
    
    
  }

  export const fetchTutors = async ()=>{
    const response = await fetch(`/api/tutor/allTutors`)
    // const responseBody = await response.json()
    if(!response.ok)
    {
      throw new Error("Error fetching tutors")
    }
    const responseBody = await response.json()
    return responseBody
  }

  export const fetchTutorsBasedOnSearch =  async(searchParams)=>{
    console.log(searchParams)
    const queryParams = new URLSearchParams()
    queryParams.append("language", searchParams.language ? searchParams.language.value : "")
    queryParams.append("duration", searchParams.duration ? searchParams.duration.value : "")
    queryParams.append("price",searchParams.price ?  searchParams.price.value : "")

    const response = await fetch(`/api/tutor/tutorsBasedOnSearch?${queryParams}`)

    if(!response.ok)
    throw new Error("Error fetching tutors based on search")

    return response.json()
  }

  export const fetchTutorById = async(tutorId)=>{

    const response = await fetch(`/api/tutor/${tutorId}`)

    if(!response.ok)
      throw new Error("Error fetching tutor by Id")

    return response.json()

  }
  export const fetchOtherTutors = async(language, id)=>{
    const response = await fetch(`/api/tutor/otherTutors`,{
      method:'POST',
      headers:{
        "Content-type":'application/json'
      }, 
      body: JSON.stringify({language, id})

    })
    if(!response.ok)
      throw new Error("Error fetching other tutors")

    return response.json()
  }

  export const fetchCurrentUser = async(auth0Id)=>{
    const response  = await fetch(`/api/auth/current-user/${auth0Id}`)

    if(!response.ok)
      throw new Error("Error fetching current user")

    return response.json()

  }

  export const  createPaymentIntent = async(tutorId, userId)=>{
    const response = await fetch(`/api/tutor/payment-intent`, {
      method:"POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({tutorId, userId})
    })
    if(!response.ok)
      throw new Error("Error creating payment-intent")

    return response.json()

  }

  export const createTutorBooking = async(formData)=>{
  
    const response = await fetch(`/api/tutor/createBooking`, {
      method:"POST", 
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({formData})
    })

    if(!response.ok)
      throw new Error("Error creating tutor booking")


    return response.json()

  }

  export const fetchMyBookings = async(userId)=>{
    const response = await fetch(`/api/tutor/myBookings/${userId}`)

    if(!response.ok)
      throw new Error("Error fetching my bookings")

    return response.json()
  }

  export const sendMessage = async(id, userId , message)=>{
    const response = await fetch(`/api/message/sendMessage`, {
      method:"POST",
      headers:{
        "Content-Type" :"application/json",
      },
      body:JSON.stringify({id, userId, message})
    })

    if(!response.ok)
      throw new Error("Error sending message")

    return response.json()
  }

  export const getMessages = async(tutorId, userId)=>{
    const response = await fetch(`/api/message/getMessages`, {
      method:"POST",
      headers:{
        "Content-Type" :"application/json",
      },
      body:JSON.stringify({tutorId, userId})

     
    })
    if(!response.ok)
      throw new Error("Error fetching messages")

    return response.json()
        

  }


  export const getToken = async(userId)=>{
    console.log(userId)
    const response  = await fetch (`/api/tutor/getToken`,{
      method:"POST",
      headers:{
        "Content-Type" :"application/json"
      },
      body:JSON.stringify({userId})
    })

    if(!response.ok)
      throw new Error("Error getting token")
    return response.json()
  }
