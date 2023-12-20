
import { configureStore } from "@reduxjs/toolkit";
import Userslices from "../slice/users/userslice";

const store=configureStore({
    reducer:{
        users:Userslices,
       
       
    }, //ek object hai
})
export default store;