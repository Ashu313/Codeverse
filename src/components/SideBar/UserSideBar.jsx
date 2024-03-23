import React from 'react';
import { ReactComponent as Courses } from '../../images/course.svg';
import { ReactComponent as Home } from '../../images/home.svg';
import { ReactComponent as Purchase } from '../../images/purchase.svg';
import { ReactComponent as Help } from '../../images/help.svg';
import { ReactComponent as Logout } from '../../images/logout.svg';
import { ReactComponent as FAQ } from '../../images/faq-icon.svg';
import {ReactComponent as Referral} from "../../images/business-task-icon.svg"
import {ReactComponent as Quiz} from "../../images/quiz-icon.svg"
import { ReactComponent as Add } from '../../images/add.svg';
import {ReactComponent as Interview} from '../../images/interview-svgrepo-com.svg'
import {ReactComponent as Code} from '../../images/code-svgrepo-com.svg'
import {ReactComponent as Problem} from '../../images/earth-day-calendar-svgrepo-com.svg'
import { NavLink } from 'react-router-dom';
import { isAuthenticated } from '../../coreComponents/helper/auth';
import { ReactComponent as Close } from '../../images/close.svg';
 import { useState } from 'react';
 import { useEffect } from 'react';

export default function UserSideBar({ handleNavbar }) {

  const [isAuthenticated1, setIsAuthenticated] = useState(false);

  // Check authentication status from local storage on component mount
 
  const getMenuRow = (component, title, showOnlyInUserLogin = false) => {
    
    const authStatus = isAuthenticated(); // Check authentication status

  if (showOnlyInUserLogin && !authStatus) {
    return null; // If showOnlyInUserLogin is true and user is not authenticated, return null
    }
     
    return (
      <NavLink
        to={title.toLowerCase()}
        className={({ isActive, isPending }) => (isActive ? 'text-blue-500 bg-red-950' : '')}
        onClick={handleNavbar}
      >
        <li class='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 '>
          {component}
          <span class='flex-1 ml-3 whitespace-nowrap'>{title}</span>
          {/* <span class='inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300'>
                3
                </span>
              */}
        </li>
      </NavLink>
    );
  };
  return (
    <div class='px-3 py-4 overflow-y-auto bg-gray-50'>
      <Close
        onClick={handleNavbar}
        className='w-4 block lg:hidden border hover:cursor-pointer border-black rounded-full bg-blue-500'
        />
      <div className='my-3 pl-2 font-semibold text-gray-800'>Main Menu</div>
      <ul class='space-y-2'>

        {getMenuRow(<Home className='h-9 w-9 hover:bg-blue-500' />, 'Home', false)}
        {getMenuRow(<Courses className='h-9 w-9 hover:bg-blue-500' />, 'Courses', false)}
        {getMenuRow(<FAQ className='h-9 w-9 hover:bg-blue-500' />, 'FAQ', false,'course/faq')}
       
        {getMenuRow(<Referral className='h-9 w-9 hover:bg-blue-500' />, 'Referral', false,'course/faq')}
        {getMenuRow(<Quiz className='h-9 w-9 hover:bg-blue-500' />, 'Quiz', false, )}
        {getMenuRow(<Interview className='h-9 w-9 hover:bg-blue-500' />, 'Interview', true)}
        {getMenuRow(<Purchase className='h-9 w-9 hover:bg-blue-500' />, 'Purchases', true)}
        {getMenuRow(<Code className='h-9 w-9 hover:bg-blue-500' />, 'ProblemOFTheDay', true)}
        {getMenuRow(<Problem className='h-9 w-9 hover:bg-blue-500' />, 'practiseCoding', true)}
      </ul>
      <ul class='pt-4 mt-4 space-y-2 border-t border-gray-200 dark:border-gray-700'>
        {getMenuRow(<Logout className='h-9 w-9' />, 'Logout', true)}
        {getMenuRow(<Help className='h-9 w-9' />, 'Settings', false)}
      </ul>
    </div>
  );
}
