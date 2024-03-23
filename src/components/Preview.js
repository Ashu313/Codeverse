import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import { useAuth0 } from '@auth0/auth0-react'
import { Login, Logout } from './auth/Auth0';
import { useDispatch, useSelector } from "react-redux";
import { UserProfile } from "../redux/slice/users/userslice";
import { Tooltip, Avatar ,useDisclosure, IconButton} from "@chakra-ui/react"
import rightArrow from "../images/icons/up-arrow.svg"
import { Navigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import {useNavigate} from 'react-router-dom';
export default function Preview({ docId }) {
    const { isAuthenticated, user } = useAuth0();
    useEffect(() => {
        ReactGA.pageview('preview-screen');
    }, [])

    console.log('isAuthenticated', isAuthenticated, user);

    try {
        if (isAuthenticated) localStorage.setItem('user', JSON.stringify(user));
    }
    catch (e) {
        console.log(e);
    }
    const dispatch=useDispatch();
    useEffect(()=>{
   dispatch(UserProfile());
    },[dispatch])
    const state=useSelector(state=>state?.users);
    const{Profile,Loading}=state;
    console.log(Profile);
   
    const Logout=()=>{
        const logout=localStorage.removeItem('userinfo');
        console.log(logout);
        window.location.href = `/home`;
        
     }

   /* const navigate=useNavigate();
    const login = () => {
      // Redirect to the login page
      navigate('/login');
    };
    const signUp = () => {
      // Redirect to the login page
      navigate('/register');
    };*/
   // const navigate=useNavigate();
    const joinRoomViaRoomId = () => {
        const roomId = document.getElementById("roomIdInput");
        const roomIdValue = roomId.value;

        if (roomIdValue.includes("http") || roomIdValue.includes("https")) {
            const url = new URL(roomIdValue);
            const path = url.pathname;
            ReactGA.event({
                category: `button.clicked`,
                action: `Join Room`,
                label: `from copied url`
            });
            window.location.href = `${path}`;
        }
        else {
            ReactGA.event({
                category: `button.clicked`,
                action: `Join Room`,
                label: `from input url`
            });
            window.location.href = `/${roomIdValue}`;
        }
    }

    return (
        <div className="bg-gray-900 select-none flex items-center justify-center h-screen">
        <div className="mb-20 flex flex-col items-center">
          <div className="flex w-full text-white text-3xl sm:text-7xl font-bold justify-center">
            <span>&#60;CodeVerse&#47;&#62;</span>
          </div>
          <div className="flex flex-col mt-20 justify-center text-white">
            <button
              onClick={() => {
                ReactGA.event({
                  category: 'button.clicked',
                  action: 'Create Room'
                });
                window.location.href = `/${docId}`;
              }}
              className="hover:bg-gray-800 duration-150 px-4 py-2 rounded-lg shadow text-white bg-blue-500 font-semibold border border-blue-600"
            >
              Create Room
            </button>
            <div className="mt-10 flex">
              <input
                id="roomIdInput"
                placeholder="Enter Room ID"
                type="text"
                className="duration-300 rounded w-80 border-white focus:shadow-lg shadow-md text-black outline-none focus:outline-none px-4 py-3"
              />
              <button
                onClick={joinRoomViaRoomId}
                className="hover:bg-gray-800 duration-300 hover:text-white px-4 ml-2 py-2 rounded-lg shadow bg-blue-500 font-semibold"
              >
                Join Room
              </button>
            </div>
            <div className="mt-4">
              {/* Display login and sign-up buttons based on authentication status */}
              {Profile && (
                <div className="absolute bottom-24 flex justify-center items-center w-96 left-1/2 transform -translate-x-1/2">
                  <div className="w-auto shadow-none hover:shadow-md flex justify-between duration-150 rounded-full text-center text-theme-teal-dark bg-white border-transparent cursor-pointer font-semibold">
                   
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
    )
}