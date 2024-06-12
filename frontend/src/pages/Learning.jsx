import React,{useState, useEffect} from 'react'
import Header from "../components/Header"
import { useParams } from 'react-router-dom'
import {useQuery, useMutation} from "react-query"
import * as apiClient from "../apiClient.js"
import { FaGraduationCap } from "react-icons/fa";
import { IoLanguage } from "react-icons/io5";
import { FaRupeeSign } from "react-icons/fa";
import Lottie from 'lottie-react'
import TutorCardAnimation from "../assets/TutorCard_Animation.json"
import { Link, useNavigate } from 'react-router-dom';
import { GiDuration } from "react-icons/gi";
import {BsSend} from "react-icons/bs"
import { useAuth0 } from '@auth0/auth0-react'
import Messages from '../components/Messages.jsx'

import io from 'socket.io-client';

const Learning = () => {
    const { id } = useParams();
    const [message, setMessage] = useState("");
    const { data: tutor } = useQuery(["fetchTutorById", id], () => apiClient.fetchTutorById(id));
    const { user } = useAuth0();
    const { data: currentUser } = useQuery(["fetchCurrentUser", user?.sub], () => apiClient.fetchCurrentUser(user.sub), {
        enabled: !!user
    });

    const userId = currentUser?._id;

    const mutation = useMutation(({ id, userId, message }) => apiClient.sendMessage(id, userId, message));
    
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io('https://lingio-connect.onrender.com'); 
        setSocket(newSocket);
        return () => newSocket.close();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message) return;

        const newMessage = { id, userId, message };
        // mutation.mutate(newMessage);

        socket.emit('sendMessage', { senderId: userId, receiverId: id, message });

        setMessage("");
    };

    const handleKeyPress = async (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (!message) return;

            const newMessage = { id, userId, message };
            // mutation.mutate(newMessage);

            socket.emit('sendMessage', { senderId: userId, receiverId: id, message });

            setMessage("");
        }
    };

    return (
        <div className=''>
            <Header />
            {tutor && (
                <div className='text-white grid grid-cols-1 min-[780px]:grid-cols-2 gap-6 p-4 border '>
                    <div>
                        <div className='flex gap-10'>
                            <div className='border-2 rounded-md w-full max-[780px]:flex border-cyan-950 '>
                                <div className='flex min-[780px]:justify-center max-[400px]:items-center p-3'>
                                    <img className='h-[300px] w-[300px] max-[780px]:h-[200px] max-[780px]:w-[200px] max-[588px]:h-[100px] max-[588px]:w-[100px] max-[363px]:rounded-none object-cover rounded-full ' src={tutor.image}></img>
                                </div>
                                <div className='flex flex-col p-5 text-xl max-[400px]:text-base gap-10 max-[580px]:gap-2 flex-auto text-white'>
                                    <h2 className='text-5xl text-cyan-600 max-[580px]:text-3xl max-[400px]:text-xl font-bold flex min-[780px]:justify-center'>
                                        {tutor.fullName}
                                    </h2>
                                    <div className='flex flex-col gap-1 text-white'>
                                        <div className='flex items-center gap-2'>
                                            <FaGraduationCap />
                                            {tutor.language}
                                        </div>
                                        <div className='text-white flex items-center gap-2 max-[580px]:hidden'>
                                            <IoLanguage />
                                            Speaks {tutor.language} (Native)
                                        </div>
                                        <div className='text-white flex items-center gap-2'>
                                            <GiDuration />
                                            Duration - {tutor.courseDuration} Weeks
                                        </div>
                                    </div>
                                    <h1 className='text-3xl font-bold text-cyan-500 mt-3 max-[780px]:hidden'>
                                        About {tutor.fullName}
                                    </h1>
                                    <div className='max-[780px]:hidden'>
                                        {tutor.description}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Link className='flex mt-5 justify-center py-2 font-bold px-5 m-1 rounded-lg text-2xl items-center bg-cyan-950 hover:bg-cyan-800 text-white border'>
                            Join Here
                        </Link>
                    </div>
                    <form onSubmit={handleSubmit} className='border border-orange-200 flex flex-col p-3'>
                        <div className='border border-blue-400 text-white p-4 text-3xl'>
                            Chat with <span className='font-bold'>your tutor</span>
                        </div>
                        <div className='border flex-grow border-pink-600 text-white h-96 overflow-y-scroll p-4'>
                            <Messages tutorId={id} userId={userId} />
                        </div>
                        <div className='border text-white bottom-0 border-green-700 p-4'>
                            <div className='flex justify-between gap-2'>
                                <textarea
                                    type='text'
                                    className='border text-sm rounded-lg flex-grow p-2.5 bg-gray-700 border-gray-600 text-white resize-none'
                                    placeholder='Send a message'
                                    value={message}
                                    rows={1}
                                    onChange={(e) => { setMessage(e.target.value) }}
                                    onKeyDown={handleKeyPress}
                                />
                                <button type='submit' className='bg-cyan-950 rounded-lg p-3 flex items-center'>
                                    <BsSend />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Learning;





