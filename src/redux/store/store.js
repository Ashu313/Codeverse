
import { configureStore } from "@reduxjs/toolkit";
import Userslices from "../slice/users/userslice";
import courseslice from "../slice/users/courseslice";


const store=configureStore({
    reducer:{
        users:Userslices,
        courses:courseslice,
        
       
       
       
    }, //ek object hai
})
export default store;