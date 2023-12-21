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
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/auth/login/login';
import Register from './components/auth/register/register';
import Header from './components/Header';
import Home from './components/frontpage/homepage';

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

  return (
    <>
 
    <Router>
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={
      isDocId ? (
        <>
           <Preview docId={docId} />
        </>
      ) : (
        <Preview docId={docId} />
      )
    } />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
    {isDocId && !['/login', '/register','/home'].includes(window.location.pathname)?(
  <div className="h-screen flex flex-grow flex-col">
    <Header docId={docId} userInfo={user} runCode={runCode} isAuthenticated={isAuthenticated} toggleModal={toggleModal} isInputBoxShown={isInputBoxShown} setisInputBoxShown={setisInputBoxShown} />
    <IDE docId={docId} modal={modal} java={java} setjava={setjava} toggleModal={toggleModal} setModal={setModal} cpp14={cpp14} setcpp14={setcpp14} js={js} setjs={setjs} php={php} setphp={setphp} perl={perl} setperl={setperl} ruby={ruby} setruby={setruby} pascal={pascal} setpascal={setpascal} python={python} setpython={setpython} input={input} setInput={setInput} selected={selected} setSelected={setSelected} output={output} setOutput={setOutput} textEditor={textEditor} setTextEditor={setTextEditor} processing={processing} setProcessing={setProcessing} percentageStage={percentageStage} setPercentageStage={setPercentageStage} isInputBoxShown={isInputBoxShown} />
  </div>
    ):null}
    
  </>
);
 

}

export default App;

