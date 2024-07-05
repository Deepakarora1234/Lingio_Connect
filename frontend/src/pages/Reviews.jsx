import React, {useState} from 'react'
import Header from '../components/Header'
import { useParams } from "react-router-dom";
import {useQuery, useMutation} from "react-query"
import * as apiClient from "../apiClient.js"
import { useAuth0 } from "@auth0/auth0-react";



const Reviews = () => {

    const { id } = useParams();
    const { user } = useAuth0();
   
    const { data: tutor } = useQuery(["fetchTutorById", id], () =>
      apiClient.fetchTutorById(id)
    );
    const { data: currentUser } = useQuery(
        ["fetchCurrentUser", user?.sub],
        () => apiClient.fetchCurrentUser(user.sub),
        {
          enabled: !!user,
        }
      );

      const studentName = currentUser?.name;

    const  sendReview = useMutation(apiClient.sendReview, {
        onSuccess:()=>{
            console.log("success")
        },
        onError:(error)=>{
            console.log(error)
        }
      })

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
    <div>
    <Header />
    {tutor && (
  <div className="container mx-auto mt-10">
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
            //   onClick={handleSubmitReviews}
              className="bg-green-500 border mt-6 text-white py-2 px-4 rounded w-full hover:bg-green-600"
              
            >
              Submit Review
            </button>

           
          </form>
      )}
      
    </div>
  )
}

export default Reviews
