import React, { useState, useEffect,useRef } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import * as apiClient from "../apiClient.js";
import { FaGraduationCap } from "react-icons/fa";
import { IoLanguage } from "react-icons/io5";
import { FaRupeeSign } from "react-icons/fa";
// import Lottie from "lottie-react";
// import TutorCardAnimation from "../assets/TutorCard_Animation.json";
import { Link, useNavigate } from "react-router-dom";
import { GiDuration } from "react-icons/gi";
import { BsSend } from "react-icons/bs";
import { useAuth0 } from "@auth0/auth0-react";
import Messages from "../components/Messages.jsx";
import Footer from "../components/Footer.jsx"

import io from "socket.io-client";

const Learning = () => {
  const [messages, setMessages] = useState([])
  const headerRef = useRef(null);

 

  const { id } = useParams();
  const [message, setMessage] = useState("");
  const { data: tutor } = useQuery(["fetchTutorById", id], () =>
    apiClient.fetchTutorById(id)
  );

 tutor &&  console.log(tutor)

  const { user } = useAuth0();
  const { data: currentUser } = useQuery(
    ["fetchCurrentUser", user?.sub],
    () => apiClient.fetchCurrentUser(user.sub),
    {
      enabled: !!user,
    }
  );

  const  sendReview = useMutation(apiClient.sendReview, {
    onSuccess:()=>{
        console.log("success")
    },
    onError:(error)=>{
        console.log(error)
    }
  })

  const userId = currentUser?._id;


  const studentName = currentUser?.name;

  const mutation = useMutation(({ id, userId, message }) =>
    apiClient.sendMessage(id, userId, message)
  );

  const [socket, setSocket] = useState(null);
  const [callId, setCallId] = useState("");

  useEffect(() => {
    const newSocket = io("https://lingio-connect-l8k2.onrender.com");
    setSocket(newSocket);
    newSocket.on("receiveCallId", (callId) => {
      setCallId(callId);
    });
    return () => newSocket.close();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;

    const newMessage = { id, userId, message };
    // mutation.mutate(newMessage);
    setMessages({...newMessage})

    socket.emit("sendMessage", { senderId: userId, receiverId: id, message });

    setMessage("");
  };

  const handleKeyPress = async (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!message) return;

      const newMessage = { id, userId, message };
      setMessages({...newMessage})
      // mutation.mutate(newMessage);

      socket.emit("sendMessage", { senderId: userId, receiverId: id, message });

      setMessage("");
    }
  };

  const [selectedRating, setSelectedRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewDescription, setReviewDescription] = useState("");
  const [submittedReviews, setSubmittedReviews] = useState([]);


  const handleStarClick = (value) => {
    setSelectedRating(value);
  };

  const handleStarHover = (value) => {
    setHoveredRating(value);
  };

  const handleStarMouseLeave = () => {
    setHoveredRating(0);
  };

  const handleSubmitReviews = () => {
    console.log("handleSubmitReviews called");
    
     // Debugging line
    try {
      if (selectedRating && reviewDescription) {
        const newReview = {
          student: studentName,
          rating: selectedRating,
          description: reviewDescription,
          tutorId:id
        };
        console.log("New review:", newReview); // Debugging line
        sendReview.mutate(newReview)
  
        setSubmittedReviews([...submittedReviews, newReview]);
       
        setSelectedRating(0);
        setReviewDescription("");
      } else {
        alert("Please provide a rating and a review description.");
      }
    } catch (error) {
      console.error("Error in handleSubmitReviews:", error);
    }
  };

  return (
    <div className="">
      <Header ref={headerRef} />
      {tutor && (
        <div className="text-white grid grid-cols-1 min-[780px]:grid-cols-2 gap-6 p-4   ">
          <div>
            <div className="flex gap-10">
              <div className=" rounded-md w-full max-[780px]:flex border-cyan-950 ">
                <div className="flex min-[780px]:justify-center max-[400px]:items-center p-3">
                  <img
                    className="h-[300px] w-[300px] max-[780px]:h-[200px] max-[780px]:w-[200px] max-[588px]:h-[100px] max-[588px]:w-[100px] max-[363px]:rounded-none object-cover rounded-full "
                    src={tutor.image}
                  ></img>
                </div>
                <div className="flex flex-col p-5 text-xl max-[400px]:text-base gap-10 max-[580px]:gap-2 flex-auto text-white">
                  <h2 className="text-5xl text-cyan-600 max-[580px]:text-3xl max-[400px]:text-xl font-bold flex min-[780px]:justify-center">
                    {tutor.fullName}
                  </h2>
                  <div className="flex flex-col gap-1 text-white">
                    <div className="flex items-center gap-2">
                      <FaGraduationCap />
                      {tutor.language}
                    </div>
                    <div className="text-white flex items-center gap-2 max-[580px]:hidden">
                      <IoLanguage />
                      Speaks {tutor.language} (Native)
                    </div>
                    <div className="text-white flex items-center gap-2">
                      <GiDuration />
                      Duration - {tutor.courseDuration} Weeks
                    </div>
                  </div>
                  <h1 className="text-3xl font-bold text-cyan-500 mt-3 max-[780px]:hidden">
                    About {tutor.fullName}
                  </h1>
                  <div className="max-[780px]:hidden">{tutor.description}</div>
                </div>
              </div>
            </div>
            <Link
              to={`/videoCall/${id}/${userId}/${studentName}`}
              className="flex mt-5 justify-center py-2 font-bold px-5 m-1 rounded-lg text-2xl items-center bg-cyan-950 hover:bg-cyan-800 text-white border"
            >
              Join Live Session
            </Link>
            <Link
              to={`/reviews/${id}`}
              className="flex mt-5 justify-center py-2 font-bold px-5 m-1 rounded-lg text-2xl items-center bg-cyan-950 hover:bg-cyan-800 text-white border"
            >
             Reviews
            </Link>
          </div>
          <form
            onSubmit={handleSubmit}
            className="border-2  border-cyan-950 flex flex-col p-3"
          >
            <div className=" border-b-2 border-slate-800 text-white p-4  text-3xl">
              Chat with your tutor
            </div>
            <div className=" flex-grow border-pink-600 text-white h-64 overflow-y-scroll p-4">
              <Messages tutorId={id} userId={userId} />
            </div>
            
            <div className="border-t-2 text-white bottom-0 border-slate-800 p-4">
              <div className="flex justify-between gap-2">
                <textarea
                  type="text"
                  className="border text-sm rounded-lg flex-grow p-2.5 bg-gray-700 border-gray-600 text-white resize-none"
                  placeholder="Send a message"
                  value={message}
                  rows={1}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                  onKeyDown={handleKeyPress}
                />
                <button
                  type="submit"
                  className="bg-cyan-950 rounded-lg p-3 flex items-center"
                >
                  <BsSend />
                </button>
              </div>
            </div>
          </form>

          
        </div>
      )}
      {/* {tutor && (
  <div className="container mx-auto mt-32">
    <h2 className="text-3xl font-bold mb-6 text-center">Reviews</h2>
    <div className="grid grid-cols-1 gap-6">
      {tutor.reviews.length === 0 ? (
        <div className="text-white text-center">No reviews</div>
      ) : (
        tutor.reviews.map((review) => (
          <div key={review._id} className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-white shadow-md">
            <div className="flex items-center mb-2">
              <div className="text-xl font-semibold">{review.student}</div>
              <div className="flex ml-4">
                {[1, 2, 3, 4, 5].map((value) => (
                  <span
                    key={value}
                    className={`text-xl ${
                      value <= review.rating ? "text-yellow-500" : "text-gray-500"
                    }`}
                  >
                    &#9733;
                  </span>
                ))}
              </div>
            </div>
            <p className="text-base">{review.description}</p>
          </div>
        ))
      )}
    </div>
  </div>
)}
      
      {tutor && (
        <form onSubmit={handleSubmitReviews} className="border-2  md:w-3/5 border-cyan-950 mx-auto p-10 mt-10 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-6 text-center">
              Leave a Review
            </h2>
            <div className="flex justify-center mb-4">
              {[1, 2, 3, 4, 5].map((value) => (
                <span
                  key={value}
                  className={`text-3xl cursor-pointer ${
                    value <= (hoveredRating || selectedRating)
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }`}
                  onClick={() => handleStarClick(value)}
                  onMouseEnter={() => handleStarHover(value)}
                  onMouseLeave={handleStarMouseLeave}
                >
                  &#9733;
                </span>
              ))}
            </div>
            <textarea
              className="w-full p-3 border border-gray-300 rounded mb-4"
              rows="4"
              placeholder="Write your review here..."
              value={reviewDescription}
              onChange={(e) => setReviewDescription(e.target.value)}
            />
            <button
            type="submit"
              className="bg-green-500 border mt-6 text-white py-2 px-4 rounded w-full hover:bg-green-600"
              
            >
              Submit Review
            </button>

           
          </form>
      )} */}
     
    </div>
  );
};

export default Learning;


