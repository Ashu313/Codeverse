/*import IDE from './components/IDE.jsx';

import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import { v4 as uuidV4 } from 'uuid';
import Login from './components/Auth/Login.js';

function App() {
  return (
   
    <Router>
      <Routes>
        <Route path="/" exact element={<Navigate to={`/${uuidV4()}`}/>}/>
    <Route path="/:id" element={<IDE/>} />
      </Routes>
    </Router>

    
  );
}

export default App;
*/
import { useState, useEffect } from 'react';
import IDE from "./components/IDE";
// import { Login, Logout } from "./components/auth/Auth0";
import { useAuth0 } from '@auth0/auth0-react'
import { Tooltip, Avatar } from "@chakra-ui/react"
import { Icon } from '@iconify/react';
import axios from 'axios';
import { v4 as uuidV4 } from 'uuid';
import ReactGA from 'react-ga';
import runIcon from './images/icons/run.svg';
import whiteboard24Regular from '@iconify/icons-fluent/whiteboard-24-regular';
import Preview from './components/Preview';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/auth/login/login';
import Register from './components/auth/register/register';
import Header from './components/Header';
import Home from './components/frontpage/homepage';
import LandingPage from './components/pages/LandingPage';
 import Home2 from './pages/Home';
import Home1 from './qui-component/pages/Home1';
import Topic from './qui-component/pages/Topic';
import React from 'react';
  import Header1 from './qui-component/Header1';
import ReferralSystem from './components/referral/referral';

import Merge_faq from './Faq/merge';
import MyRoutes from './Routes/Routes';
import Course from './pages/Courses';
import { Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import { isAdminAuthenticated } from './coreComponents/helper/adminAuth.';
import CourseDetails from './pages/CourseDetails';
import { PrivateRoute } from './Routes/PrivateRoutes';
import Purchases from './pages/Purchases';
import Setting from './pages/Setting';
import Logout from './coreComponents/Logout';
import HomeEvent from './components/events/HomeEvent';
import Problem from './components/Coding/DailyProblems';
import Homepage from './components/Coding/Homepage';
import { Array } from './components/Coding/Array';
import LinkedList from './components/Coding/LinkedList';
import Stack from './components/Coding/Stack';
import Queue from './components/Coding/Queue';
import SearchSort from './components/Coding/SearchSort';
import Matrix from './components/Coding/Matrix';
import String from './components/Coding/String';
import SignUpModal from './components/SignUp/SignUpModal';
import LoginModal from './components/SignIn/SignInModal';
const ThemeContext = React.createContext()
function App() {
  const [textEditor, setTextEditor] = useState('input');
  const [processing, setProcessing] = useState(false);
  const [percentageStage, setPercentageStage] = useState(0);
  const [selected, setSelected] = useState('python');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [python, setpython] = useState('');
  const [cpp14, setcpp14] = useState('');
  const [cpp17, setcpp17] = useState('');
  const [c, setc] = useState('');
  const [java, setjava] = useState('');
  const [js, setjs] = useState('');
  const [pascal, setpascal] = useState('');
  const [perl, setperl] = useState('');
  const [php, setphp] = useState('');
  const [ruby, setruby] = useState('');
  const [modal, setModal] = useState(false);
  const [docId, setDocId] = useState(null);
  const [isDocId, setIsDocId] = useState(false);
  const { isAuthenticated, user } = useAuth0();
  const [isInputBoxShown, setisInputBoxShown] = useState(true);
  const[theme, setTheme] = useState(true)
  const[topic, setTopic] = useState()
  const data = require('./data.json');
  const settheme = () => {
    setTheme(pre=>!pre)
  }
  

 
  useEffect(() => {
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
        label: `${user.email}`
      });
    }
    // eslint-disable-next-line
  }, []);


  let statusLoop = null;

  const runCode = () => {

    ReactGA.event({
      category: `button.clicked`,
      action: `Run Code`,
      lang: `${selected}`
    });

    setOutput('')
    setTextEditor('output');
    setProcessing(true);
    setPercentageStage(10);
    setisInputBoxShown(false);

    var lang = selected;
    const backend_url =  "http://localhost:3001/runcode";
    var source = "print(1)";
    if (lang === "python") {
      source = python;
    }
     else if (lang === "c") {
      source = c;
    }
    
    else if (lang === "cpp14") {
      source = cpp14;
    }
    else if (lang === "cpp17") {
      source = cpp17;
    }
    else if (lang === "java") {
      source = java;
    }
    else if (lang === "javascript") {
      source = js;
    }
    else if (lang === "pascal") {
      source = pascal;
    }
    else if (lang === "perl") {
      source = perl;
    }
    else if (lang === "php") {
      source = php;
    }
    else if (lang === "ruby") {
      source = ruby;
    }
    if (lang === "javascript") lang = "javascript_node";
    var data = {
      "lang": lang.toUpperCase(),
      "source": source,
      "input": input,
      "memory_limit": 243232,
      "time_limit": 5,
      "context": "{'id': 213121}",
      "callback": "https://client.com/callback/"
    }


    var status;
    var raw = JSON.stringify(data);

    var requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: raw,
      redirect: 'follow'
    };
    fetch(backend_url, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        status = data.status_update_url;
        const url = backend_url + "?url=" + status;

        setPercentageStage(25)

        statusLoop = setInterval(() => {
          fetch(url, {
            method: 'GET'
          })
            .then((res) => res.json())
            .then((data) => {
              setPercentageStage(75)
              // console.log(data);
              if (data.result.compile_status === 'OK') {
                if (data.result.run_status.status === 'AC') {
                  getOutput(data.result.run_status.output);
                  clearInterval(statusLoop);
                }
                else if (data.result.run_status.status === 'OLE') {
                  setOutput(data.result.run_status.status_detail);
                  setProcessing(false);
                  clearInterval(statusLoop);
                }
                else if (data.result.run_status.status !== 'NA') {
                  setOutput(data.result.run_status.stderr);
                  setProcessing(false);
                  clearInterval(statusLoop);
                }
              }
              else {
                setOutput(data.result.compile_status);
                setProcessing(false);
                clearInterval(statusLoop);
                return;
              }
            })
            .catch(e => {
              setProcessing(false);
              clearInterval(statusLoop);
              console.log(e)
            });
        }, 2000)
      }).catch(e => {
        console.log(e)
      });;

  };

  const getOutput = (link) => {
    axios.get(link).then((res) => {
      setPercentageStage(100)
      setProcessing(false);
      setOutput(res.data);
    }).catch((err) => {
      console.log(err);
    })
  }

  const toggleModal = () => {
    ReactGA.event({
      category: `button.clicked`,
      action: `Whiteboard ${modal ? "Opened" : "Closed"}`,
    });
    setModal(!modal);
  }
  useEffect(() => {
    // Simulate an asynchronous operation to fetch isDocId
    setTimeout(() => {
      setIsDocId(true); // Set isDocId to true after some time (replace with your actual logic)
    }, 2000); // Simulating a 2-second delay, replace with your actual data fetching logic
  }, []);
  return (
    <>
 
 <ThemeContext.Provider value={{ theme, setTheme: settheme, data, setTopic }}>
    <Router>
      <Routes>
      
        <Route path='/land' element={<Home/>}/>
        <Route path='/login' element={<Login />} />
        <Route path="/event" element={<HomeEvent/>}/>
        <Route path='/register' element={<Register />} />
        <Route path="/home" element={<LandingPage/>}/>
        <Route path="/home2" element={<Home2/>}/>
        <Route path="topic/:id" element={<Topic />} />
        <Route path='/Array' element={<Array/>}/>
        <Route path='/linkedlist' element={<LinkedList/>}/>
        <Route path="/stack" element={<Stack/>}/>
        <Route path="/queue" element={<Queue/>}/>
        <Route path='/string' element={<String/>}/>
        <Route path="/sort" element={<SearchSort/>}/>
<Route path='/matrix' element={<Matrix/>}/>
       
        <Route element={<Layout keys='userLayout' />}>
        <Route
              index
              element={isAdminAuthenticated() ? <Navigate to='/admin' replace /> : <Home2 />}/>
         <Route path="referral" element={<ReferralSystem/>}/>
         <Route path="/courses" element={<Course/>}/>
         <Route path="/faq" element={<Merge_faq/>}/>
         
         <Route path='/home' element={<Navigate to='/' replace />} />
          
            <Route path='/course/:id' element={<CourseDetails/>} />
            <Route path='/purchases' element={<PrivateRoute component={Purchases} />} />
            <Route path='/settings' element={<PrivateRoute component={Setting} />} />
            <Route path='/logout' element={<Logout/>} />
            <Route path='/problemofTheDay' element={<Problem/>}/>
            <Route path='/practiseCoding' element={<Homepage/>}/>
            <Route path='/interview' element={
      isDocId ? (
        <>
           <Preview docId={docId} />

        </>
      ) : (
        <Preview docId={docId} />
      )
    } />
            
        </Route>
        
        
        {/* Add other routes as needed */}
   
   
    
        <Route element={<Layout keys='userLayout' />}>
           <Route index element={<Home1 />} />
          <Route path="/quiz" element={<Home1/>} />
         
          </Route>
        </Routes>
        
      </Router>
    </ThemeContext.Provider>
    <Router>
      <Routes>
     
       
  
    
      </Routes>
    </Router>
    {isDocId && !["/practisecoding","/problemoftheday","/","/Array","linkedlist","stack","/queue","/sort","/string","/homepage","/problem",'/login', '/register','/home','/course/self-learning','/help',"/course/faq","/courses","/course/referral","/faq","/topic/0","/topic/1","/topic/2","/topic/3","/topic/4","/topic/5","/topic/6","/topic/7","/topic/8","/topic/9","/topic/10","/event","/problem","/interview"].includes(window.location.pathname)?(
  <div className="h-screen flex flex-grow flex-col">
    <Header docId={docId} userInfo={user} runCode={runCode} isAuthenticated={isAuthenticated} toggleModal={toggleModal} isInputBoxShown={isInputBoxShown} setisInputBoxShown={setisInputBoxShown} />
    <IDE docId={docId} modal={modal} java={java} setjava={setjava} toggleModal={toggleModal} setModal={setModal} cpp14={cpp14} setcpp14={setcpp14} js={js} setjs={setjs} php={php} setphp={setphp} perl={perl} setperl={setperl} ruby={ruby} setruby={setruby} pascal={pascal} setpascal={setpascal} python={python} setpython={setpython} input={input} setInput={setInput} selected={selected} setSelected={setSelected} output={output} setOutput={setOutput} textEditor={textEditor} setTextEditor={setTextEditor} processing={processing} setProcessing={setProcessing} percentageStage={percentageStage} setPercentageStage={setPercentageStage} isInputBoxShown={isInputBoxShown} />
  </div>
    ):null}
    
  </>
);
 

}
export {ThemeContext}

export default App;

