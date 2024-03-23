import React from 'react';
import IDE from '../IDE1.jsx';
import { useState } from 'react';
import ReactGA from 'react-ga';

import axios from 'axios';
import Header from '../Header1.js';

const Problem = () => {
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
  const [isInputBoxShown, setisInputBoxShown] = useState(true);
  const toggleModal = () => {
    ReactGA.event({
      category: `button.clicked`,
      action: `Whiteboard ${modal ? "Opened" : "Closed"}`,
    });
    setModal(!modal);
  }
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

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100" style={{position:'relative'}}>
      {/* Content Container */}
      <div className="w-1/2 px-8">
        <div className="bg-blue-500 text-white py-4 px-6 rounded-lg shadow-lg mb-8">
          <h1 className="text-3xl font-bold">Daily DSA Problems</h1>
          <p className="text-lg">Challenge yourself with new problems every day!</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8" style={{marginLeft:'-20px'}}>
          <div className="bg-blue-100 text-blue-900 py-4 px-6 rounded-lg mb-8">
            Chocolate Problem --- updated daily to keep yourself involved in DSA
          </div>

          <div className="py-4">
            <h3 className='text-xl font-bold mb-4'>Today's Question</h3>
            <p className='text-lg'>Chocolate Distribution Problem</p>

            <h3 className='text-xl font-bold mt-8 mb-4'>Introduction</h3>
            <p className="text-lg">Given an array of N integers where each value represents the number of chocolates in a packet. Each packet can have a variable number of chocolates. There are m students, the task is to distribute chocolate packets such that: Each student gets one packet. The difference between the number of chocolates in the packet with maximum chocolates and the packet with minimum chocolates given to the students is minimum.</p>

            <h3 className='text-xl font-bold mt-8 mb-4'>Efficient Approach for Chocolate Distribution Problem</h3>
            <p className="text-lg">The idea is based on the observation that to minimize the difference, we must choose consecutive elements from a sorted packet. We first sort the array arr[0..n-1], then find the subarray of size m with the minimum difference between the last and first elements.</p>

            <h3 className='text-xl font-bold mt-8 mb-4'>Actual Implementation</h3>
            <a className='bg-blue-500 text-white py-2 px-4 text-lg inline-block mt-2 rounded-lg shadow-md' href='https://www.geeksforgeeks.org/chocolate-distribution-problem/' target="_blank">Refer to GeeksForGeeks for help</a>

            <br />
            <br />
          </div>
        </div>
      </div>

      {/* Compiler or Other Element */}
      <div className="w-1/2 h-full bg-gray-300" style={{marginTop:'40px'}}>
      <Header docId={docId}  runCode={runCode}  toggleModal={toggleModal} isInputBoxShown={isInputBoxShown} setisInputBoxShown={setisInputBoxShown} />
      <IDE docId={docId} modal={modal} java={java} setjava={setjava} toggleModal={toggleModal} setModal={setModal} cpp14={cpp14} setcpp14={setcpp14} js={js} setjs={setjs} php={php} setphp={setphp} perl={perl} setperl={setperl} ruby={ruby} setruby={setruby} pascal={pascal} setpascal={setpascal} python={python} setpython={setpython} input={input} setInput={setInput} selected={selected} setSelected={setSelected} output={output} setOutput={setOutput} textEditor={textEditor} setTextEditor={setTextEditor} processing={processing} setProcessing={setProcessing} percentageStage={percentageStage} setPercentageStage={setPercentageStage} isInputBoxShown={isInputBoxShown} />
        {/* You can place the compiler or any other element here */}
      </div>
    </div>
  )
}

export default Problem
