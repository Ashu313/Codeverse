import React, { useEffect, useState } from 'react';
import { getCourseDetails } from '../coreComponents/helper/apiCalls';
import { useParams } from 'react-router';
import TabContent1 from '../components/CourseDetails/TabContent1';
import TabContent2 from '../components/CourseDetails/TabContent2';
import BuyNowCard from '../components/BuyNowCard';
import { isAdmin } from '../coreComponents/helper/utils';
import { useSelector, useDispatch } from 'react-redux';
import { getCourse, getCourseDetail } from '../redux/slice/users/courseslice';

function CourseDetails() {
  const [courseDetail, setCourseDetail] = useState({});
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(1);
  const dispatch = useDispatch();
  const courses = useSelector(state => state?.courses?.userAuth?.courses);

  const changeTab = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  useEffect(() => {
    dispatch(getCourse());
  }, [dispatch]);

  useEffect(() => {
    if (courses && courses.length > 0) {
      const fetchCourseDetails = async () => {
        console.log("i M BACK")
        try {
          const courseId = id;
          const course = courses.find(course => course._id === courseId);
          console.log(courseId);
          console.log(course);
          setCourseDetail(course);
          if (course) {
            const details = await dispatch(getCourseDetail(courseId));
            console.log(details);
          //  setCourseDetail(details.payload); // Assuming details are in payload
          }
        } catch (error) {
          console.error("Error fetching course details:", error);
          // Handle the error here, e.g., set a default value for courseDetail or show an error message
        }
      };
      fetchCourseDetails();
    }
  }, [dispatch, courses, id]);
  console.log(courseDetail);
  return (
    <>
      <div className='bg-gray-700 py-12 text-4xl text-center text-white'>{courseDetail?.name}</div>
      {!isAdmin() && <BuyNowCard courseDetail={courseDetail} />}
      <div className='border-b mt-6 w-2/5 mx-auto'>
        <nav className='flex'>
          <button
            className={`px-4 py-2 text-md font-normal ${
              activeTab === 1
                ? 'text-[#1266de] font-semibold border-b-4 border-[#1266de]'
                : 'text-black'
            } hover:-blue-600 focus:outline-none active:text-gray-800 active:bg-gray-100`}
            onClick={() => changeTab(1)}
          >
            Overview
          </button>
          <button
            className={`px-4 py-2 text-md font-normal  ${
              activeTab === 2
                ? 'text-[#1266de] font-semibold border-b-4 border-[#1266de]'
                : 'text-black'
            } g-white hover:text-blue-600 focus:outline-none active:text-gray-800 active:bg-gray-100`}
            onClick={() => changeTab(2)}
          >
            Content
          </button>
        </nav>
      </div>

      <div className='mt-6 w-2/5 mx-auto'>
        <div className={`${activeTab === 1 ? '' : 'hidden'}`}>
          <TabContent1 courseDetail={courseDetail} />
        </div>
        <div className={`${activeTab === 2 ? '' : 'hidden'}`}>
          <TabContent2 courseDetail={courseDetail} />
        </div>
      </div>
    </>
  );
}

export default CourseDetails;
