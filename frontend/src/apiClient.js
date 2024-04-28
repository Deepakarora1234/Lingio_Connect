
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
