import React from "react";
import { useState, useEffect } from 'react';
 
// import { Login, Logout } from "./components/auth/Auth0";
import { io } from 'socket.io-client';
import { Tooltip, Avatar ,useDisclosure, IconButton} from "@chakra-ui/react"
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from "react-redux";
import { UserProfile } from "../redux/slice/users/userslice";

 
import ReactGA from 'react-ga';
import runIcon from '../images/icons/run.svg';
import whiteboard24Regular from '@iconify/icons-fluent/whiteboard-24-regular';
import axios from 'axios';
var socket = io('http://localhost:3001');

const Header=({ docId,runCode, toggleModal, isAuthenticated, isInputBoxShown, setisInputBoxShown }) =>
{
    const [toolTip, showToolTip] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [isUserPresent, setIsUserPresent] = useState(false);
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);
    const googleDocsUrl = 'https://docs.google.com/document/d/1tCCAg2TgdSR1WKFixA9Vt9JVkrj0Fo9XVsSuTpbHlKc/edit?usp=sharing'
  
    const toggleTooltip = () => {
      setIsTooltipOpen(!isTooltipOpen);
    };
    const [content, setContent] = useState('');
   
  
    useEffect(() => {
      // Join the room based on the document ID
      socket.emit('joinRoom', { docId });
  
      // Listen for changes in the document content
      socket.on('updateContent', (newContent) => {
        setContent(newContent);
      });
  
      // Clean up the socket connection when the component unmounts
      return () => {
        socket.emit('leaveRoom', { docId });
        socket.off('updateContent');
      };
    }, [docId]);
  
    const handleContentChange = (newContent) => {
      // Update the local content and broadcast the changes to other users
      setContent(newContent);
      socket.emit('contentChange', { docId, newContent });
    };
  
  
//const [profile,setProfile]=useState(false);

const dispatch=useDispatch();
 useEffect(()=>{
dispatch(UserProfile());
 },[dispatch])
 const state=useSelector(state=>state?.users);
 const{Profile,Loading}=state;
 console.log(Profile);

 

  
    useEffect(() => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        setUserInfo(user);
        if (user) {
          setIsUserPresent(true);
        }
        else setIsUserPresent(false);
      }
      catch (e) {
        setIsUserPresent(false);
      }
    }, [])
  
    const toggleInputBox = () => {
      ReactGA.event({
        category: `button.clicked`,
        action: `Input Box ${isInputBoxShown ? "Closed" : "Opened"}`,
      });
      setisInputBoxShown(!isInputBoxShown);
    }
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
      <div className=" bg-purple-standard flex py-2 px-4 justify-between items-center rounded-b-lg custom-shadow-medium">
        <div className="flex items-center">
          <div className="h-7 flex items-center font-medium text-xl codeFont text-orange-standard">
            <img className="h-full" src={'./logo.png'} alt="codeverse logo" />
            
          </div>
        </div>
        <div className="flex items-center">
        {isTooltipOpen &&
        <iframe
        src={googleDocsUrl}
        title="Embedded Google Docs"
        width="100%"
        height="100vh"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        style={{
          position: 'absolute',
          top: '100px',
          zIndex: '1',
          width: '100vw',
          height: 'calc(100vh - 100px)',
          left: '0',
        }}

        ></iframe>
        
        }
              
          <button className=" text-white mr-4" onClick={toggleTooltip}><Icon icon="bi:input-cursor-text" className="text-orange-standard" height="24" /></button>
      
    
          <Tooltip label="Input/Output" hasArrow fontSize="md" bg="teal.600">
            <button className=" text-white mr-4" onClick={toggleInputBox}><Icon icon="bi:input-cursor-text" className="text-orange-standard" height="24" /></button>
          </Tooltip>
          <Tooltip label="Whiteboard" hasArrow fontSize="md" bg="teal.600">
            <button className=" text-white mr-4" onClick={toggleModal}><Icon icon={whiteboard24Regular} className="text-orange-standard" height="28" /></button>
          </Tooltip>
          <Tooltip label="Run Code" hasArrow fontSize="sm" bg="teal.600">
            <button onClick={runCode} className="bg-orange-standard flex items-center text-base font-medium rounded px-3 py-0.5 mr-2">
              <img className="h-2.5" src={runIcon} alt="run code icon" />
              <span className="ml-2">Run</span>
            </button>
          </Tooltip>
          {/* {
            isAuthenticated ?
              <Logout /> :
              <Login />
          } */}
          {
            Profile &&
            <Tooltip label={Profile?.email} hasArrow fontSize="sm" bg="teal.900">
              <Avatar size="sm" name={Profile?.firstname} src={userInfo?.picture} />
            </Tooltip>
          }
          <div className="mx-1 relative">
            {
              isAuthenticated &&
              <img onMouseEnter={() => { showToolTip(true) }} onMouseLeave={() => { showToolTip(false) }} className="h-7 w-7 rounded-full" src={userInfo.picture} alt="user icon" />
            }
            {
              toolTip &&  Profile &&
              <div className="absolute z-50 top-full right-0 mt-2 text-center text-xs text-gray-200 bg-black mr-4 px-1">{userInfo.email}</div>
            }
          </div>
        </div>
      </div>
    )
        }
  
    export default Header;