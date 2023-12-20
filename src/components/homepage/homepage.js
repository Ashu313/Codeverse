import React from 'react';
import ReactGA from 'react-ga';
import { useDispatch, useSelector } from "react-redux";
import { UserProfile } from "../../redux/slice/users/userslice";
import { v4 as uuidV4 } from 'uuid';
import { useAuth0 } from '@auth0/auth0-react'
import { useState, useEffect } from 'react';
//import { Login, Logout } from './auth/Auth0';
import Login from '../auth/login/login';
import Register from '../auth/register/register';
import Applet from '../homepage/homepage'

export default function Preview({docId}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
      ReactGA.pageview('preview-screen');
    }, []);
  
   // const [docId, setDocId] = useState(null);
 /// const [isDocId, setIsDocId] = useState(false);
  const dispatch=useDispatch();
 useEffect(()=>{
dispatch(UserProfile());
 },[dispatch])
 const state=useSelector(state=>state?.users);
 const{Profile,Loading}=state;
 console.log(Profile);
  /*useEffect(() => {
    if (window.location.pathname === "/") {
      const uid = uuidV4();
      setDocId(uid)
      setIsDocId(false);
    }
    else {
      setDocId(window.location.pathname.split('/')[1])
      setIsDocId(true);
    }
    if (isAuthenticated) {
      ReactGA.event({
        category: `user.logged`,
        action: `Login`,
        label: `${Profile?.email}`
      });
    }
    // eslint-disable-next-line
  }, []);*/

  
    console.log('isAuthenticated', isAuthenticated);
    const checkAuthentication = () => {
        // Perform your authentication logic here
        // For example, you could check if a user is logged in based on some criteria
    
        // Simulating authentication for demonstration purposes
        const isLoggedIn = true;
    
        setIsAuthenticated(isLoggedIn);
      };
    
      useEffect(() => {
        checkAuthentication();
      }, []);
      const handleLogin = () => {
        // Perform your login logic here
        // For example, set a flag or update state to indicate authentication
        setIsAuthenticated(true);
    
        // Optionally, you can store user data in localStorage
        const user = { /* user data */ };
        localStorage.setItem('user', JSON.stringify(user));
      };
    
      // Handle logout
      const handleLogout = () => {
        // Perform your logout logic here
        // For example, clear authentication state and remove user data from localStorage
        setIsAuthenticated(false);
        localStorage.removeItem('user');
      };

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
        <div className="bg-orange-standard select-none flex items-center justify-center h-full w-full" style={{background:'black'}}>
            <div className="mb-20 flex flex-col items-center">
                <div className="flex w-full text-white text-3xl sm:text-7xl font-bold codeFont justify-center">
                    <span>&#60;CodeVerse&#47;&#62;</span>
                </div>
                <div className="flex flex-col mt-20 justify-center  text-white">
                    <button onClick={() => {
                        ReactGA.event({
                            category: `button.clicked`,
                            action: `Create Room`
                        });
                        window.location.href = `/${docId}`
                    }} className=" hover:shadow-md duration-150 px-4 py-2 rounded-lg shadow text-blue-500 bg-white border border-blue-600 font-semibold">Create Room</button>
                    {/* <button className=" hover:shadow-md duration-300 px-4 mx-2 py-2 rounded-lg shadow bg-blue-600 font-medium">Sign Up</button> */}
                    <div className="mt-10 flex">
                        <input id="roomIdInput" placeholder="Enter Room ID" type="text" className=" duration-300 rounded w-80 border-white focus:shadow-lg shadow-md text-black outline-none focus:outline-none px-4 py-3 codeFont" />
                        <button onClick={joinRoomViaRoomId} className="hover:shadow-lg duration-300 hover:bg-blue-700 px-4 ml-2 py-2 rounded-lg shadow bg-blue-600 font-medium">Join Room</button>
                    </div>
                    <div className="absolute bottom-24 flex justify-center items-center w-96 left-1/2 transform -translate-x-1/2">
    
</div>
                </div>
            </div>
        </div>
    )
}