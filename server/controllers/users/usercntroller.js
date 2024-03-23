const expressAsyncHandler=require('express-async-handler');
 

const  Admin = require('../../../server/models/admin');
const  User = require('../../../server/models/user');
const generateToken=require('../../../server/middlewares/generateToken');
var jwt = require('jsonwebtoken');
const adminSignup = async (req, res) => {
  const { email } = req.body;
  const newAdmin = new Admin(req.body);
  try {
    const admin = await Admin.findOne({ email });
    if (admin) {
      return res.status(422).json({ error: 'Email already exits' });
    } else {
      await newAdmin.save();
      const token = jwt.sign({ email, role: 'admin' },"jbhbhgvgvg333", process.env.JWT_KEY, {
        expiresIn: '3h'
      });
      res.json({ message: 'Admin created successfully', token });
    }
  } catch (e) {
    console.log('In Error', e);
  }
};
const adminSignin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Admin.findOne({ email, password });
    if (!user) {
      return res.status(422).json({ error: 'Email does not exits' });
    } else {
      const token = jwt.sign({ email, role: 'admin' },"jbhbhgvgvg333", process.env.JWT_KEY ,{
        expiresIn: '3h'
      });
      res.json({ message: 'Logged in successfully', token });
    }
  } catch (e) {
    console.log('In Error', e);
  }
};


const registerUser=expressAsyncHandler(async(req,res)=>{

    const {firstname,email,password}=req?.body;
    const userExists=await User.findOne({email});
    if(userExists){

    
        throw new Error('user already exists');
    }
    
try{

    const user=await User.create({firstname,email,password});
    console.log(user);
    res.status(200).json(user);
}
catch(error)
{
    res.json(error);
}
});

const fetchUser=expressAsyncHandler(async(req,res)=>{
  
    try{
        const users=await User.find({});
        console.log(users);
    res.json(users);
    }catch(err)
    {
        res.json(err);
       
    }
}); 
const userProfileCtrl = expressAsyncHandler(async (req, res) => {
    const { _id } = req?.user;
    console.log(_id);
  
    try {
      const myProfile = await User.findById(req?.user?._id);
  
      res.json(myProfile);
    } catch (error) {
      res.json(error);
    }
  });
  const updateUserCtrl = expressAsyncHandler(async (req, res) => {
    const { _id } = req?.user;
   
    const user = await User.findByIdAndUpdate(
      _id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.json(user);
  });
//login check;
const loginCredentials=expressAsyncHandler(async(req,res)=>{
const{email,password}=req?.body;
 
const userFound=await User.findOne({email});
console.log(userFound)
console.log(userFound?.id);
//&& (await userFound?.isPasswordMatch(password))
if(userFound && (await userFound?.isPasswordMatch(password)))
{
    
   res.json({

    _id:userFound?._id,
    firstname:userFound?.firstname,
    email:userFound?.email,
    password:userFound?.password,
    token:generateToken(userFound?._id),
     
   })
}
else
{
 
throw new Error('invalid login credintals');
}


});

module.exports={adminSignin,adminSignup,registerUser,fetchUser,loginCredentials,userProfileCtrl,updateUserCtrl};
//module.exports=fetchUser; 
//module.exports=LoginCredentials ;