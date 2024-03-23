import '../../App.css';
import React, { useContext } from 'react'

import Button from '../Button';
import Icons from '../Icons';
import ImageIcons from '../ImageIcons';
import { useNavigate } from "react-router-dom";

import { useLocation } from 'react-router-dom';
import { ThemeContext } from '../../App';


export default function Home1() {
  const navigate = useNavigate();
  let location = useLocation();
  const {theme,setTopic} = useContext(ThemeContext)
 

  const selectTopic = (topic) => {
    setTopic(topic)
   return navigate(`/topic/${topic}`);
  }

  location.pathname === "/" && setTopic()

  return (
   
    <div  className={`${theme?"bg-[#F4F6FA]":"bg-[#313E51]"}`} style={{position:"relative",height:'1000px'}}>
   <div className='lg:max-w-7xl px-5 md:px-14 lg:px-0  lg:mx-auto ' style={{position:"relative"}}>
   
    <div className='flex flex-col h-screen justify-center  ' style={{position:"relative"}}>
    <div className='lg:grid lg:grid-cols-2 pt-24 md:pt-0' style={{display:'block',position:'relative'}}>
    <div className='mb-14 lg:mb-0' style={{position:"relative"}}>
      <h1 className={`${!theme?"text-[#F4F6FA]":"text-[#313E51]"} text-[40px] md:text-[64px] font-light`} style={{position:"relative"}}> Welcome to the <br/><span className='font-medium'>Quiz IQ!</span></h1>
      <p className='lg:text-[#626C7F] text-[14px] md:text-[20px] mt-5 italic'>Pick a subject to get started.</p>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  <div className="bg-white p-4 rounded-md shadow-md flex items-center justify-center">
    <button onClick={() => selectTopic(0)} className="topic-button" style={{height:'200px'}}>
      <div className="bg-[#FFF1E9] p-1 rounded-md mr-2">
        <img src="/images/icon-html.svg" alt="HTML" className="h-4.5rem w-4.5rem" />
      </div>
      <p className='lg:text-[#626C7F] text-[14px] md:text-[20px] mt-5 '>HTML</p> 
    </button>
  </div>
  <div className="bg-white p-4 rounded-md shadow-md flex items-center justify-center">
    <button onClick={() => selectTopic(1)} className="topic-button"  style={{height:'200px'}}>
      <div className="bg-[#E0FDEF] p-1 rounded-md mr-2">
        <img src="/images/icon-css.svg" alt="CSS" className="h-4.5rem w-4.5rem" />
      </div>
      <p className='lg:text-[#626C7F] text-[14px] md:text-[20px] mt-5 '>CSS</p>
    </button>
  </div>
  <div className="bg-white p-4 rounded-md shadow-md flex items-center justify-center">
    <button onClick={() => selectTopic(2)} className="topic-button"  style={{height:'200px'}}>
      <div className="bg-[#EBF0FF] p-1 rounded-md mr-2">
        <img src="/images/icon-js.svg" alt="JavaScript" className="h-4.5rem w-4.5rem" />
      </div>
      <p className='lg:text-[#626C7F] text-[14px] md:text-[20px] mt-5'>Javascript</p>
    </button>
  </div>
  <div className="bg-white p-4 rounded-md shadow-md flex items-center justify-center">
    <button onClick={() => selectTopic(3)} className="topic-button"  style={{height:'200px'}}>
      <div className="bg-[#F6E7FF] p-1 rounded-md mr-2">
        <img src="/images/icon-accessibility.svg" alt="Accessibility" className="h-4.5rem w-4.5rem" />
      </div>
      <p className='lg:text-[#626C7F] text-[14px] md:text-[20px] mt-5 '>Accesibility</p>
    </button>
  </div>
  <div className="bg-white p-4 rounded-md shadow-md flex items-center justify-center">
    <button onClick={() => selectTopic(4)} className="topic-button"  style={{height:'200px'}}>
      <div className="bg-[#F6E7FF] p-1 rounded-md mr-2">
        <img src="/images/icon-accessibility.svg" alt="Accessibility" className="h-4.5rem w-4.5rem" />
      </div>
      <p className='lg:text-[#626C7F] text-[14px] md:text-[20px] mt-5 '>ReactJs</p>
    </button>
  </div> <div className="bg-white p-4 rounded-md shadow-md flex items-center justify-center">
    <button onClick={() => selectTopic(5)} className="topic-button"  style={{height:'200px'}}>
      <div className="bg-[#F6E7FF] p-1 rounded-md mr-2">
        <img src="/images/icon-accessibility.svg" alt="Accessibility" className="h-4.5rem w-4.5rem" />
      </div>
      <p className='lg:text-[#626C7F] text-[14px] md:text-[20px] mt-5 '>Redux</p>
    </button>
  </div> <div className="bg-white p-4 rounded-md shadow-md flex items-center justify-center">
    <button onClick={() => selectTopic(6)} className="topic-button"  style={{height:'200px'}}>
      <div className="bg-[#F6E7FF] p-1 rounded-md mr-2">
        <img src="/images/icon-accessibility.svg" alt="Accessibility" className="h-4.5rem w-4.5rem" />
      </div>
      <p className='lg:text-[#626C7F] text-[14px] md:text-[20px] mt-5 '>Java</p>
    </button>
  </div> <div className="bg-white p-4 rounded-md shadow-md flex items-center justify-center">
    <button onClick={() => selectTopic(7)} className="topic-button"  style={{height:'200px'}}>
      <div className="bg-[#F6E7FF] p-1 rounded-md mr-2">
        <img src="/images/icon-accessibility.svg" alt="Accessibility" className="h-4.5rem w-4.5rem" />
      </div>
      <p className='lg:text-[#626C7F] text-[14px] md:text-[20px] mt-5  '>Cloud Computing</p>
    </button>
  </div> 
</div>


    </div>
    </div>
    </div>
   </div>
  
  );
}