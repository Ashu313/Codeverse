import React, { useState } from 'react';
import { checkout, getKey, paymentVerification } from '../coreComponents/helper/payment';
import { isAuthenticated } from '../coreComponents/helper/auth';
import LoginModal from './SignIn/SignInModal';
import { useDispatch } from 'react-redux';
import { purchaseCourse } from '../redux/slice/users/courseslice';
 
import { useEffect } from 'react';
import { UserProfile } from '../redux/slice/users/userslice';
import { useSelector } from 'react-redux';
export default function BuyNowCard(props) {
  var image;
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { courseDetail } = props;
  console.log(courseDetail?.price);
  console.log(courseDetail?.email);
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handleClose = (type) => {
    setShowLoginModal(false);
  };
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(UserProfile());
     },[dispatch])
     const state=useSelector(state=>state?.users);
     const{Profile,Loading}=state;
     console.log(Profile);
    

  const handlePurchase = async (courseId,email) => {
    dispatch(purchaseCourse(courseId,email));
    console.log(courseId,email);
    const res =  loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const options = {
      key: "rzp_test_AWrlyaXOO9ncih", // This is Api key. you will get it from razorpay dashboard > account and settings > API keys
      amount: parseInt(courseDetail?.price)*100,
      currency: "INR", // your 3 letter currency code
      name: "Prep&Perform", // project or transaction name
      description: "Test Transaction",
      image: "", // your project logo
      handler: function (response) {
         console.log("response", response);
        orderPlace(); // after payment completes on stripe this function will be called and you can do your stuff
      },
      prefill: {
        name: Profile?.name,
        email: Profile?.email,
        contact: "9988556633",
        courseId:courseDetail?._id
      },
      notes: {

        address: "India",
      },
      theme: {
        color: "#158993",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    
  };
  if (!image) {
    image =
      'https://media.istockphoto.com/id/1366428092/photo/webinar-e-learning-skills-business-internet-technology-concepts-training-webinar-e-learning.webp?b=1&s=170667a&w=0&k=20&c=qjK4h0qt4W_NNG8TmboGw8RDRv8TNzEoFM_JEDZ1Ah0=';
  }
  const orderPlace = () => {
    dispatch(purchaseCourse(courseDetail?._id));
    console.log("HELLo World");

  };

 
  const Pay = async () => {
    let amount = 100;
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const options = {
      key: "rzp_test_AWrlyaXOO9ncih", // This is Api key. you will get it from razorpay dashboard > account and settings > API keys
      amount: parseInt(courseDetail?.price)*100,
      currency: "INR", // your 3 letter ,currency code
      name: "Prep&Perform", // project or transaction name
      description: "Test Transaction",
      courseId:courseDetail?._id,
      email:Profile?.email,
      image: "", // your project logo
      handler: function (response) {
        console.log("response", response);
       // console.log(courseId,email);
        console.log(courseDetail?._id,Profile?.email);
        
        orderPlace(); // after payment completes on stripe this function will be called and you can do your stuff
      },
      prefill: {
        name: Profile?.name,
        email: Profile?.email,
        contact: "9988556633",
      },
      notes: {
        address: "India",
      },
      theme: {
        color: "#158993",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const checkoutHandler = async () => {
    if (!isAuthenticated()) {
      setShowLoginModal(true);
      return;
    }

    const response = await fetch('/key');
    if (!response.ok) {
      throw new Error('Failed to fetch Razorpay key');
    }
    const { key } = await response.json();
    console.log(key);
  
    

   
  };
  return (
    <>
      <div className='absolute right-20 top-40 max-w-sm rounded-xl shadow-lg'>
        <img className='w-full h-44 rounded-xl' src={image} alt='Card' />
        <div className='px-6 py-4'>
          <div class='mb-2 text-left text-sm text-slate-500'>Price</div>
          <div class='mb-3 text-left font-bold text-sm'>₹{courseDetail.price}</div>
          <button
            type='button'
            class='bg-blue-600 py-2 px-7 w-4/5 mr-4 mb-4 text-white rounded-3xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-gray-200 '
            onClick={Pay}>  Buy now
          </button>
        </div>
      </div>
      {<LoginModal isOpen={showLoginModal} onClose={handleClose} />}
    </>
  );
}
