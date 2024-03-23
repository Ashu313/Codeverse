import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import http from "../../../coreComponents/helper/http";
export const getCourse=createAsyncThunk("courses/fetchCourses",async(payload,{rejectWithValue,getState,dispatch})=>{

    const config={
        headers:{
            "content-type":"application/json",
          
        }
    }
try{
   const {data}=await axios.get('http://localhost:3001/api/users/user/courses',config)
   return data;
}
catch(error)
{
 if(!error?.response)
 {
    throw error;
 }
 return rejectWithValue(error?.respone?.data);

}
});
export const getCourseDetail=createAsyncThunk("courses/getDetail",async(courseId,payload,{rejectWithValue,getState,dispatch})=>{

    const Coursetoken=getState()?.courses?.userAuth?.courses?.token;
    const config={
        headers:{
            "content-type":"application/json",
            
           
        }
    }
try{
   const {data}=await axios.get(`http://localhost:3001/api/users/user/course/65fabffd5f0da31ba53b077e`,config)
   return data;
}
catch(error)
{
 if(!error?.response)
 {
    throw error;
 }
 return rejectWithValue(error?.respone?.data);

}
});

export const getCourseData=createAsyncThunk("courses/getCourse",async(payload,{rejectWithValue,getState,dispatch})=>{

    const config={
        headers:{
            "content-type":"application/json",
            
        }
    }
try{
   const {data}=await axios.get('http://localhost:3001/api/users/user/purchased',config)
   return data;
}
catch(error)
{
 if(!error?.response)
 {
    throw error;
 }
 return rejectWithValue(error?.respone?.data);

}
});
export const CreateCourse=createAsyncThunk("courses/CreateCourse",async(payload,{rejectWithValue,getState,dispatch})=>{

    const config={
        headers:{
            "content-type":"application/json",
           
        }
    }
try{
   const {data}=await axios.post('http://localhost:3001/api/users/admin/course/create',payload,config)
   return data;
}
catch(error)
{
 if(!error?.response)
 {
    throw error;
 }
 return rejectWithValue(error?.respone?.data);
}
});
export const purchaseCourse = createAsyncThunk(
    "courses/purchaseCourse",
    async (courseId, { rejectWithValue, getState, dispatch }) => {
      try {
        const token = getState().courses.userAuth.token;
        const config = {
          headers: {
            "content-type": "application/json",
         
          },
        };
        // Make API call to purchase course
        const { data } = await axios.post(
          `http://localhost:3001/api/users/user/course/${courseId}`,
          {},
          config
        );
        return data;
      } catch (error) {
        if (!error.response) {
          throw error;
        }
        return rejectWithValue(error.response.data);
      }
    }
  );
const initialState = {
    courses2: [],
    courseDetails: null,
    purchasedCourses: [],
    loading: false,
    error: null,
  };
const courseSlice=createSlice({
    name: 'courses',
  initialState,
  reducers: {},
    
    //builder 3 choice handle krta hai 
    //1.fulfiled 2.reject 3.pending state
    extraReducers:builder=>{
        builder.addCase(getCourse.pending,(state,action)=>{
            state.userLoading=true;
            state.userServerErr=undefined;
            state.userAppErr=undefined;
        
        

    })
    builder.addCase(getCourse.fulfilled,(state,action)=>{
        
        console.log(action);
        state.userAuth=action?.payload;
        state.userLoading=false;
        state.userServerErr=undefined;
        state.userAppErr=undefined;
    
    
})
builder.addCase(getCourse.rejected,(state,action)=>{
    console.log(action);
    state.userLoading=false;
    state.userAppErr=action?.payload?.msg;
    state.userServerErr=action?.error?.msg;
 
    
    
    })
        
        
 
builder.addCase(getCourseDetail.rejected,(state,action)=>{
    state.userLoading=false;
    state.userServerErr=action?.payload?.msg;
    state.userAppErr=action?.payload?.msg;


})
builder.addCase(getCourseDetail.pending,(state,action)=>{
    state.userLoading=true;
    state.userServerErr=undefined;
    state.userAppErr=undefined;



})
builder.addCase(getCourseDetail.fulfilled,(state,action)=>{
state.userAuth=action?.payload;
state.userLoading=false;
state.userServerErr=undefined;
state.userAppErr=undefined;


})
builder.addCase(getCourseData.rejected,(state,action)=>{
    state.userLoading=false;
    state.userServerErr=action?.payload?.msg;
    state.userAppErr=action?.payload?.msg;


})
builder.addCase(getCourseData.pending,(state,action)=>{
    state.Loading=true;
    state.ServerErr=undefined;
    state.AppErr=undefined;



})
builder.addCase(getCourseData.fulfilled,(state,action)=>{
state.Profile=action?.payload;
state.Loading=false;
state.ServerErr=undefined;
state.AppErr=undefined;


})

builder.addCase(CreateCourse.rejected,(state,action)=>{
    state.Loading=false;
    state.ServerErr=action?.payload?.msg;
    state.AppErr=action?.payload?.msg;


})
builder.addCase(CreateCourse.pending,(state,action)=>{
    state.userLoading=true;
    state.userServerErr=undefined;
    state.userAppErr=undefined;



})
builder.addCase(CreateCourse.fulfilled,(state,action)=>{
state.UserUpdate=action?.payload;
state.userLoading=false;
state.userServerErr=undefined;
state.userAppErr=undefined;


})
 builder.addCase(purchaseCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      builder.addCase(purchaseCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.purchasedCourses.push(action.payload);
      })
      builder.addCase(purchaseCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
}

});
export default courseSlice.reducer;
