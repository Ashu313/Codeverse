import React from 'react';
import course from '../images/courseImage.jpg';
export default function Home2() {
  return (
    <>
      <h1 class='font-extrabold mt-8 text-center text-4xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-violet-900 to-violet-700' style={{padding:'4rem'}}>
       Prep&Perform
      </h1>
      <div className='mx-auto' >
        <img className='h-[600px] mx-auto' src={course} alt='Course Selling' />
      </div>
    </>
  );
}
