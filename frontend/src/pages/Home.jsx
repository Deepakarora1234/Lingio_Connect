import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import * as apiClient from "../apiClient.js";
import "rc-slider/assets/index.css";
import TutorCard from "../components/TutorCard.jsx";
import SearchBar from "../components/SearchBar.jsx";
import Pagination from "../components/Pagination.jsx";

const Home = () => {
  const { user, isAuthenticated } = useAuth0();
  const [page, setPage] = useState(1);
  const mutation = useMutation(apiClient.auth);

  useEffect(() => {
    const helper = async () => {
      if (isAuthenticated) {
        try {
          console.log("User:", user);
          mutation.mutate({
            auth0Id: user.sub,
            email: user.email,
            name: user.name,
            picture: user.picture,
          });
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };
    helper();
  }, [isAuthenticated, user]);

  const {
    data: tutors,
    isLoading,
    isError,
  } = useQuery(["fetchTutors", page], () => apiClient.fetchTutors(page), {
    keepPreviousData: true, // Optional: Keeps the previous data while fetching new data
  });

  console.log("Tutors Data:", tutors);
  console.log("Page:", page);

  return (
    <div>
      <Header />
      <div className="p-4 text-white text-4xl mt-6 font-bold">
        Online tutors & teachers for private lessons
      </div>
      <SearchBar />
      <div className="flex justify-between">
        <div className="grid grid-cols-1 p-2 gap-20 text-white">
          {isLoading ? (
            <div>Loading...</div>
          ) : isError ? (
            <div>Error loading tutors</div>
          ) : tutors?.tutors && tutors.tutors.length > 0 ? (
            tutors.tutors.map((tutor, index) => (
              <TutorCard key={index} tutor={tutor} />
            ))
          ) : (
            <div>No tutors available</div>
          )}
        </div>
      </div>
      <Pagination
        page={tutors?.page || 1}
        pages={tutors?.totalPages || 1}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
};

export default Home;
