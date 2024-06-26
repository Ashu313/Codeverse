const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

 
const userSchema=mongoose.Schema({
    
    firstname:{

        required:[true,'first name is require'],
        type:String,
    },
    email:{
        required:[true,'first name is require'],
        type:String
    },
    password:{
    
        required:[true,'first name is require'],
        type:String
    },
    isAdmin:{

        type:Boolean,
        default:false,
    },
    purchasedCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
      }
    ]
},
{
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
)
userSchema.pre("save",async function(next){

  //  console.log(this);
  const salt=await bcrypt.genSalt(10);
  this.password=await bcrypt.hash(this.password,salt);
  next();

});
//verify password
userSchema.methods.isPasswordMatch=async function(enteredpassword)
{
return  await bcrypt.compare(enteredpassword,this.password);
}

const User=mongoose.model('User',userSchema);
module.exports=User;