import React, { useEffect } from 'react';
import Header from '../components/Header';
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from 'react-query';
import * as apiClient from "../apiClient.js"

const Home = () => {
    const { user, isAuthenticated } = useAuth0();

    const mutation = useMutation(apiClient.auth);

    useEffect(() => {
        // const fetchData = async () => {
            if (isAuthenticated) {
                try {
                    console.log(user)
                    mutation.mutate({auth0Id : user.sub, email : user.email, name:user.name, picture : user.picture});
                    
                } catch (error) {
                    console.error("Error:", error);
                }
            }
        // };

        // fetchData();
    }, [isAuthenticated, user]);

    return (
        <div>
            <Header />
        </div>
    );
};

export default Home;

