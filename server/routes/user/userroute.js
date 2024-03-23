
const {registerUser, updateUserCtrl, adminSignup, adminSignin}=require('../../controllers/users/usercntroller')
const express=require('express');
const {fetchUser} = require('../../controllers/users/usercntroller');
const {loginCredentials} = require('../../controllers/users/usercntroller');
const{userProfileCtrl}=require('../../controllers/users/usercntroller');
const authMiddlewares = require('../../middlewares/authmiddlewares');

const userRoute=express.Router();
userRoute.post('/register',registerUser);
userRoute.get('/',authMiddlewares,fetchUser);
userRoute.post('/admin/signup', adminSignup);
userRoute.post('/admin/signin', adminSignin);
userRoute.get("/profile", authMiddlewares, userProfileCtrl);
userRoute.put("/profile", authMiddlewares, updateUserCtrl);
userRoute.post('/login',loginCredentials);
userRoute.use('/login',loginCredentials);

module.exports=userRoute;