import React, { useEffect, useState, useRef, useCallback } from 'react';
import { io } from 'socket.io-client';
import { Controlled as CodeMirror } from 'react-codemirror2';
import ReactGA from 'react-ga';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/panda-syntax.css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/python/python';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/pascal/pascal';
import 'codemirror/mode/perl/perl';
import 'codemirror/mode/php/php';
import 'codemirror/mode/ruby/ruby';

import Peer from 'peerjs';
import closeIcon from '../images/icons/close.png';
import muteIcon from '../images/icons/mute.svg';
import videoIcon from '../images/icons/video.svg';
import phoneIcon from '../images/icons/phone.svg';
import { Icon } from '@iconify/react';
import eraser24Filled from '@iconify/icons-fluent/eraser-24-filled';
import penFill from '@iconify/icons-bi/pen-fill';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Skeleton, Progress, Tag } from "@chakra-ui/react"
import 'react-circular-progressbar/dist/styles.css';
import { v4 as uuidv4 } from 'uuid';

export default function IDE({ docId, modal, toggleModal, cpp14, setcpp14, java, setjava, js, setjs, php, setphp, pascal, setpascal, perl, setperl, ruby, setruby, python, setpython, input, setInput, selected, setSelected, output, textEditor, setTextEditor, processing, percentageStage, isInputBoxShown, setOutput }) {
    const [socket, setSocket] = useState(null);
    
    const [peer, setPeer] = useState(null);
    const userName = 'smit'
    const videoGrid = document.getElementById('video-grid');
    const myVideo = document.createElement('video');
    const audioElement = document.createElement('audio');
    const myVideoCont = document.createElement('div');
    myVideoCont.appendChild(audioElement);
    myVideoCont.appendChild(myVideo);
    myVideoCont.className = "videoContainer rounded mb-4"
    myVideo.muted = true;
    const [myStream, setMystream] = useState(null);
    const peers = {};
    const colorsRef = useRef(null);
    const [userId, setUserId] = useState(null);
    const [myvideoon, setMyvideoon] = useState(true);
    const [pencilColor, setPencilColor] = useState('#000000');
    const currentURL = window.location.href;

    useEffect(() => {
        ReactGA.pageview('IDE-screen');
        
      
        var tempSocket = io('http://localhost:3001');
        console.log(tempSocket);
        setSocket(tempSocket);
    
        
        const peer = new Peer( {
            host: "localhost",
            port: 9000,
            path: "/myapp",
        });
        console.log(
            peer
        )
        
        peer?.on('open', (id) => {
            console.log('Connected to PeerJS with ID:', id);
        });
    
        peer?.on('error', (error) => {
            console.error('PeerJS error:', error);
        });
    
        
        console.log(`Socket.IO server URL: ${process.env.REACT_APP_BACKEND_ENDPOINT_URL}`);
    
       
        return () => {
            tempSocket.disconnect();
            peer.destroy();
        };
    }, []);  
    
   

    useEffect(() => {
        if (socket == null) return;
        socket.emit('get-document', uuidv4());
        socket.once('load-document', (data) => {
            setcpp14(data?.cpp14 ||' ');
            setjava(data.java);
            setpython(data.python);
            setjs(data.js);
            setpascal(data.pascal);
            setphp(data.php);
            setperl(data.perl);
            setruby(data.ruby);
            setInput(data.input);
            setOutput(data.output);
        });
        // eslint-disable-next-line
    }, [socket, docId]);



    useEffect(() => {
        if (socket === null) return;
        var updateC = (delta) => {
            setpython(delta.python);
            setjava(delta.java);
            setcpp14(delta.cpp14);
            setInput(delta.input);
            setOutput(delta.output);
        }
        console.log("hurrah i have updated");
        socket.on('receive-changes', updateC);
        return () => {
            socket.off('receive-changes', updateC);
        }
        // eslint-disable-next-line
    }, [socket, cpp14, java, python, input, output]);

    useEffect(() => {
        if (socket === null) return;

        var data = {
            'cpp14': cpp14,
            'java': java,
            'python': python,
            'js': js,
            'perl': perl,
            'php': php,
            'ruby': ruby,
            'pascal': pascal,
            'input': input,
            'output': output
        };

        var savetodb = setTimeout(() => { socket.emit('save-document', data); socket.emit('changes', data); }, 2000);
        var updateC = (delta) => {
            setpython(delta.python);
            setjava(delta.java);
            setcpp14(delta.cpp14);
            setjs(delta.js);
            setpascal(delta.pascal);
            setphp(delta.php);
            setperl(delta.perl);
            setruby(delta.ruby);
        }
        socket.on('receive-changes', updateC);
        return () => {
            socket.off('receive-changes', updateC);
            clearTimeout(savetodb);
        };

    }, [socket, cpp14, java, js, pascal, php, perl, ruby, python, input, output]);



  
    
     
    // Assuming you have the stream from getUserMedia or elsewhere
   

   
          

              

       

     


   
   


   


   


    useEffect(() => {


        if (socket === null || colorsRef === null) return;
        const canvas = document.getElementById('whiteboard-canvas')
        const context = canvas.getContext('2d');
        const colorPicker = document.getElementById('pencil-color-picker');

        const colors = document.getElementsByClassName('color');
        // console.log(colors, 'the colors');
        // console.log(test);
        const current = {
            color: '#000000',
            width: 5,
        };

        const onColorUpdate = (e) => {
            let objectColor;
            for (let i = 0; i < e?.path?.length; i++) {
                if (e?.path[i]?.dataset?.color) {
                    if (e?.path[i]?.dataset?.color === "white") objectColor = "#ffffff"
                    else objectColor = pencilColor;
                    break;
                }
            }
            current.color = objectColor;
            if (current.color !== '#ffffff') current.width = 5;
            else current.width = 25;
        };

        const onPencilColorChange = (e) => {
            setPencilColor(e?.target?.value);
            current.color = e?.target?.value;
            if (current.color !== '#ffffff') current.width = 5;
            else current.width = 25;
        }

        for (let i = 0; i < colors?.length; i++) {
            colors[i].removeEventListener('click', onColorUpdate);
            colorPicker.removeEventListener('change', onPencilColorChange);
            colors[i].addEventListener('click', onColorUpdate, false);
            colorPicker.addEventListener('change', onPencilColorChange, false);
        }
        let drawing = false;


        const drawLine = (x0, y0, x1, y1, color, width, emit) => {
            context.beginPath();
            context.strokeStyle = color;
            context.moveTo(x0, y0);
            context.lineTo(x1, y1);
            console.log(color);
            console.log(context.strokeStyle);
            context.lineWidth = width;
            context.stroke();
            context.closePath();

            if (!emit) { return; }
            const w = canvas.width;
            const h = canvas.height;
            // console.log(w, h, window.width, window.height);

            
            setPencilColor(current.color);
           
            socket.emit('drawing', {
                x0: x0 / w,
                y0: y0 / h,
                x1: x1 / w,
                y1: y1 / h,
                color: current.color,
                width
            });
        };



        const onMouseDown = (e) => {

            // console.log(drawing + ' d');
            drawing = true;
            current.x = e.clientX || e.touches[0].clientX;
            current.y = e.clientY || e.touches[0].clientY;
        };

        const onMouseMove = (e) => {
            if (!drawing) { return; }
            drawLine(current.x, current.y, e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY, current.color, current.width, true);
            current.x = e.clientX || e.touches[0].clientX;
            current.y = e.clientY || e.touches[0].clientY;
        };

        const onMouseUp = (e) => {

            if (!drawing) { return; }
            drawing = false;
            drawLine(current.x, current.y, e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY, current.color, current.width, true);
        };
        const throttle = (callback, delay) => {
            let previousCall = new Date().getTime();
            return function () {
                const time = new Date().getTime();

                if ((time - previousCall) >= delay) {
                    previousCall = time;
                    callback.apply(null, arguments);
                }
            };
        };


        canvas.addEventListener('mousedown', onMouseDown, false);
        canvas.addEventListener('mouseup', onMouseUp, false);
        canvas.addEventListener('mouseout', onMouseUp, false);
        canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);

        canvas.addEventListener('touchstart', onMouseDown, false);
        canvas.addEventListener('touchend', onMouseUp, false);
        canvas.addEventListener('touchcancel', onMouseUp, false);
        canvas.addEventListener('touchmove', throttle(onMouseMove, 10), false);


        const onResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', onResize, false);
        onResize();
        const onDrawingEvent = (data) => {
            const w = canvas.width;
            const h = canvas.height;
            console.log(data.color);
            drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color, data.width);
        }
        socket.on('drawing', onDrawingEvent);
    }, [socket]);


    const handleInputFileChange = () => {
        const input = document.getElementById('input-file-upload');
        input.click();
    };

    const handleFileDataChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const textData = e.target.result;
            setInput(textData);
        }
        reader.readAsText(file);
    }
   
    
   
    
    
    

    return (
        <>
            <div className="flex" style={{overflow:'hidden'}}>
                <div className="h-screen flex flex-grow flex-col" style={{overflow:'hidden'}}>
                    <div className="flex-grow flex">
                        <div id="editor" className="flex-grow relative flex flex-col">
                            <FileTabs />
                            <div className="flex duration-500 relative overflow-y-auto px-2 pt-2 pb-4" style={isInputBoxShown ? { height: "94%", maxHeight: "calc(100vh - 10px)" } : { height: "calc(100vh - 310px)" }}>
                                <div className=" w-full custom-shadow h-full rounded-xl overflow-hidden">

                                    {

                                        <section className="playground">
                                            <div className="code-editor-java flex flex-col h-full mb-5 java-code">
                                                <div className="editor-header " style={{ backgroundColor: 'black' }}>
                                                    <LanguageSelector language={selected.toLowerCase()} setLanguage={setSelected}     style={{ backgroundColor: 'black' }}/>
                                                </div >
                                                {
                                                    selected === 'python' && <CodeMirror
                                                        value={
                                                            python
                                                        }
                                                        className="flex-grow text-base"
                                                        options={{
                                                            mode: 'python',
                                                            theme: 'dracula',
                                                            lineNumbers: true,
                                                            scrollbarStyle: null,
                                                            lineWrapping: true,
                                                        }}
                                                        style={{ backgroundColor: 'black' }}

                                                        onBeforeChange={(editor, data, changes) => {
                                                            setpython(changes);
                                                        }}
                                                    />
                                                }
                                                {
                                                    selected === 'cpp14' && <CodeMirror
                                                        value={
                                                            cpp14
                                                        }
                                                        className="flex-grow text-base"
                                                        options={{
                                                            mode: 'text/x-csrc',
                                                            theme: 'dracula',
                                                            lineNumbers: true,
                                                            scrollbarStyle: null,
                                                            lineWrapping: true,
                                                        }}
                                                        onBeforeChange={(editor, data, changes) => {
                                                            setcpp14(changes);
                                                        }}
                                                    />
                                                }
                                                {
                                                    selected === 'java' && <CodeMirror
                                                        value={
                                                            java
                                                        }
                                                        className="flex-grow text-base"
                                                        options={{
                                                            mode: 'text/x-java',
                                                            theme: 'dracula',
                                                            lineNumbers: true,
                                                            scrollbarStyle: null,
                                                            lineWrapping: true,
                                                        }}
                                                        onBeforeChange={(editor, data, changes) => {
                                                            setjava(changes);
                                                        }}
                                                    />
                                                }
                                                {
                                                    selected === 'javascript' && <CodeMirror
                                                        value={
                                                            js
                                                        }
                                                        className="flex-grow text-base"
                                                        options={{
                                                            mode: 'text/ecmascript',
                                                            theme: 'dracula',
                                                            lineNumbers: true,
                                                            scrollbarStyle: null,
                                                            lineWrapping: true,
                                                        }}
                                                        onBeforeChange={(editor, data, changes) => {
                                                            setjs(changes);
                                                        }}
                                                    />
                                                }
                                                {
                                                    selected === 'pascal' && <CodeMirror
                                                        value={
                                                            pascal
                                                        }
                                                        className="flex-grow text-base"
                                                        options={{
                                                            mode: 'text/x-pascal',
                                                            theme: 'dracula',
                                                            lineNumbers: true,
                                                            scrollbarStyle: null,
                                                            lineWrapping: true,
                                                        }}
                                                        onBeforeChange={(editor, data, changes) => {
                                                            setpascal(changes);
                                                        }}
                                                    />
                                                }
                                                {
                                                    selected === 'ruby' && <CodeMirror
                                                        value={
                                                            ruby
                                                        }
                                                        className="flex-grow text-base"
                                                        options={{
                                                            mode: 'text/x-ruby',
                                                            theme: 'dracula',
                                                            lineNumbers: true,
                                                            scrollbarStyle: null,
                                                            lineWrapping: true,
                                                        }}
                                                        onBeforeChange={(editor, data, changes) => {
                                                            setruby(changes);
                                                        }}
                                                    />
                                                }
                                                {
                                                    selected === 'php' && <CodeMirror
                                                        value={
                                                            php
                                                        }
                                                        className="flex-grow text-base"
                                                        options={{
                                                            mode: 'text/x-php',
                                                            theme: 'dracula',
                                                            lineNumbers: true,
                                                            scrollbarStyle: null,
                                                            lineWrapping: true,
                                                        }}
                                                        onBeforeChange={(editor, data, changes) => {
                                                            setphp(changes);
                                                        }}
                                                    />
                                                }
                                                {
                                                    selected === 'perl' && <CodeMirror
                                                        value={
                                                            perl
                                                        }
                                                        className="flex-grow text-base"
                                                        options={{
                                                            mode: 'text/x-perl',
                                                            theme: 'dracula',
                                                            lineNumbers: true,
                                                            scrollbarStyle: null,
                                                            lineWrapping: true,
                                                        }}
                                                        onBeforeChange={(editor, data, changes) => {
                                                            setperl(changes);
                                                        }}
                                                    />
                                                }

                                            </div>
                                        </section>
                                    }
                                </div>
                            </div>
                            <div className={`flex-grow ${modal ? "top-0" : " top-full"} duration-300 left-0 p-4 backdrop-filter backdrop-blur-sm absolute z-50 w-screen h-screen`}>
                                <div ref={colorsRef} className="colors absolute flex select-none left-10 top-10">
                                    <Icon icon={penFill} data-color="black" className="block cursor-pointer color black text-orange-standard" height="28" />
                                    <Icon icon={eraser24Filled} data-color="white" className="block cursor-pointer color white ml-4" height="30" />
                                    {/* color picker input element */}
                                    <input type="color" className="" id="pencil-color-picker" />
                                </div>
                                <div className="absolute right-10 select-none top-10">
                                    <img onClick={toggleModal} src={closeIcon} className="w-6 cursor-pointer" alt="close icon" />
                                </div>

                                <canvas id="whiteboard-canvas" style={{ height: "90%" }} className="m-0 border w-full bg-white rounded-xl border-black" />
                            </div>
                            <div className={`${isInputBoxShown ? "absolute w-full bottom-0 left-0 transform translate-y-full" : ""} duration-500`}>
                                <div className="shadow-lg border-2 border-opacity-50 border-theme-teal-dark mx-2 rounded-xl">
                                    <Tabs index={textEditor === "input" ? 0 : 1} isFitted variant="line" colorScheme="#224f5c50">
                                        <TabList>
                                            <Tab onClick={() => {
                                                setTextEditor("input");
                                            }} className=" font-semibold ">Input</Tab>
                                            <Tab onClick={() => {
                                                setTextEditor("output");
                                            }} className=" font-semibold ">Output</Tab>
                                        </TabList>
                                        <TabPanels>
                                            <TabPanel paddingX="2" paddingBottom="2" paddingTop="0" >
                                                <textarea className="  rounded-md outline-none w-full h-full p-4 resize-none" placeholder="enter an input..." onChange={(e) => { setInput(e.target.value) }} value={input} rows="4" cols="50">
                                                </textarea>
                                            </TabPanel>
                                            <TabPanel paddingX="0" paddingY="0" className="relative" >
                                                {processing && <Progress colorScheme="teal" size="sm" value={percentageStage} className="mb-1" />}
                                                <Skeleton isLoaded={!processing} className="rounded-xl px-2">
                                                    <textarea className={` ${processing ? "transform animate-pulse" : ""} rounded-md outline-none w-full h-full pt-4 pb-6 px-6 resize-none`} readOnly placeholder="output will be shown here" value={output} rows="4" cols="50">
                                                    </textarea>
                                                </Skeleton>
                                            </TabPanel>
                                        </TabPanels>
                                    </Tabs>
                                </div>
                                <input accept="text/plain" type="file" onChange={handleFileDataChange} className="hidden" id="input-file-upload" />
                                <div onClick={handleInputFileChange} className="mt-4 text-theme-teal-dark font-semibold w-full text-center cursor-pointer"><span className="hover:opacity-70">... or upload an file</span></div>

                            </div>
                        </div>
                        

                    </div>
                </div>
            </div>
        </>
    )
}



function RightVideoPanel({ muteCam, muteMic }) {

    const [isMuteCam, setIsMuteCam] = useState(false)
    const [isMuteMic, setIsMuteMic] = useState(false)

    return (
        <div style={{ height: "calc(100vh - 47px)" }} className="overflow-hidden duration-300 bg-transparent px-2 pt-2 pb-3 flex flex-col items-center justify-start">
            <div className="flex overflow-hidden custom-shadow-light h-full rounded-lg justify-start items-center flex-col bg-gradient-to-br from-purple-standard via-purple-dark to-theme-orange bg-opacity-100 relative pt-2 px-2 shadow-lg">
                <Tag size={"md"} variant="solid" w="full" colorScheme="#EE9B00">
                    People in room
                </Tag>
        
     
                <div className="justify-between flex-col pt-2 pb-3">
                    <div style={{ width: "200px" }} className="flex flex-col video-grid-height items-center overflow-y-auto justify-start" id="video-grid">
                    </div>
                    <div className="flex items-center absolute backdrop-filter backdrop-blur left-0 bottom-0 pt-2 rounded-lg pb-4 w-full justify-around mt-2">
                        <button onClick={() => {
                            setIsMuteMic(!isMuteMic)
                            muteMic();
                            console.log("Button clicked. isMuteMic:", isMuteMic);
                        }} className={` ${isMuteMic ? "bg-theme-orange text-white" : " bg-theme-grey"} border transform duration-300 hover:shadow-2xl shadow-lg border-transparent rounded-full h-8 w-8 p-1.5`}>
                            <img src={muteIcon} alt="mute icon" />
                        </button>
                        <button onClick={() => {
                            setIsMuteCam(!isMuteCam)
                            muteCam();
                            console.log("Button clicked. isMuteMic:", isMuteMic);
                        }} className={`${isMuteCam ? "bg-theme-orange text-white" : " bg-theme-grey"} border transform duration-300 hover:shadow-2xl shadow-lg border-transparent rounded-full h-8 w-8 p-1.5`}>
                            <img src={videoIcon} alt="video icon" />
                        </button>
                        <button onClick={() => {
                            window.location.href = "/"
                        }} className=" bg-red-600 border border-transparent shadow-2xl rounded-full h-8 w-8 p-1.5">
                            <img src={phoneIcon} alt="phone icon" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function LanguageSelector({ language, setLanguage }) {
    return (
        <select className="text-white cursor-pointer bg-transparent"   onChange={(e) => {
            setLanguage(e.target.value)
        }} value={language} name="language-selector">
            <option className="bg-theme-dark-blue"  style={{ backgroundColor: 'black' }} value="cpp14">cpp14</option>
            <option className="bg-theme-dark-blue"  style={{ backgroundColor: 'black' }} value="python">python</option>
            <option className="bg-theme-dark-blue" style={{ backgroundColor: 'black' }} value="java">java</option>
            <option className="bg-theme-dark-blue" style={{ backgroundColor: 'black' }} value="javascript">javascript</option>
            <option className="bg-theme-dark-blue" style={{ backgroundColor: 'black' }} value="perl">perl</option>
            <option className="bg-theme-dark-blue"  style={{ backgroundColor: 'black' }}value="php">php</option>
            <option className="bg-theme-dark-blue" style={{ backgroundColor: 'black' }} value="ruby">ruby</option>
            <option className="bg-theme-dark-blue"  style={{ backgroundColor: 'black' }}value="pascal">pascal</option>
        </select>
    )
}

function FileTabs({ files }) {
    return (
        <div className="w-full">
            {
                files && files.map((file, index) => {
                    return (
                        <div className="flex flex-col items-center justify-center" key={index}>
                            <div className="flex flex-col items-center justify-center">
                                <div className="flex-grow flex-shrink-0">
                                    <img className="h-4 my-2" src={file.icon} alt="file icon" />
                                </div>
                                <div className="flex-grow flex-shrink-0">
                                    <span className="ml-2">{file.name}</span>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

function SidePanel() {
    return (
      <div className="bg-purple-dark text-orange-standard w-20">
        <span>Share Room ID</span>
        <br />
        <span>Join Room</span>
        <br />
        <span>Download</span>
        <br />
      </div>
    );
  }
  
  function ShareRoomID() {
    const currentURL = window.location.href;
    return (
      <div className="bg-orange-standard text-purple-dark p-5">
        Share
        <div className="my-5 text-purple-dark">
          <span className="bg-grey-standard w-min rounded-l px-3 py-1 align-middle">
            {currentURL}
          </span>
          <span
            onClick={() =>
              navigator.clipboard.writeText(window.location.href)
            }
            className="bg-grey-standard bg-opacity-50 w-min px-3 py-1 rounded-r align-middle"
          >
            Copy
          </span>
        </div>
        <div className="text-purple-dark">
          NOTE: Anyone with the link can join & edit the code
        </div>
      </div>
    );
  }
  
  function JoinRoom() {
    const [input, setInput] = useState('');
    return (
      <div className="bg-orange-standard text-purple-dark p-5">
        Join
        <div className="my-5 text-purple-dark">
          <input
            type="text"
            value={input}
            onInput={(e) => setInput(e.target.value)}
            className="bg-grey-standard w-min rounded-l px-3 py-1 align-middle outline-none border-none"
          />
          <button className="bg-grey-standard bg-opacity-50 w-min px-3 py-1 rounded-r align-middle">
            <a href={input}>Join</a>
          </button>
        </div>
        <div className="text-purple-dark">
          NOTE: Make sure you are entering the correct URL
        </div>
      </div>
    );
  }
  
// function SidePanel() {
//   return (
//     <div className="bg-purple-dark text-orange-standard w-20">
//       <span>Share Room ID</span>
//       <br />
//       <span>Join Room</span>
//       <br />
//       <span>Download</span>
//       <br />
//     </div>
//   )
// }

// function ShareRoomID() {
//   const currentURL = window.location.href;
//   return (
//     <div className="bg-orange-standard text-purple-dark p-5">
//       Share
//       <div className="my-5 text-purple-dark">
//         <span className="bg-grey-standard w-min rounded-l px-3 py-1 align-middle">
//           {currentURL}
//         </span>
//         <span onClick={() => navigator.clipboard.writeText(window.location.href)} className="bg-grey-standard bg-opacity-50 w-min px-3 py-1 rounded-r align-middle">
//           Copy
//         </span>
//       </div>
//       <div className="text-purple-dark">
//         NOTE: Anyone with the link can join & edit the code
//       </div>
//     </div>
//   )
// }

// function JoinRoom() {
//   const [input, setInput] = useState('');
//   return (
//     <div className="bg-orange-standard text-purple-dark p-5">
//       Join
//       <div className="my-5 text-purple-dark">
//         <input type="text" value={input} onInput={e => setInput(e.target.value)} className="bg-grey-standard w-min rounded-l px-3 py-1 align-middle outline-none border-none" />
//         <button className="bg-grey-standard bg-opacity-50 w-min px-3 py-1 rounded-r align-middle">
//           <a href={input}>Join</a>
//         </button>
//       </div>
//       <div className="text-purple-dark">
//         NOTE: Make sure you are entering correct URL
//       </div>
//     </div>
//   )
// }