//user schema
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
import crypto from "node:crypto";
import { kMaxLength } from "node:buffer";

const userSchema = new mongoose.Schema( 
    {
        name: {
            type: String,
            required: [true, "please enter your name "],
            //     Ayush     => :'ayush'
            trim: true,
            MaxLength: [50, "your name cannot be longer than 50 characters"]
        },
        email:{
            type: String,
            required: [true, "please enter your email ID"],
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, "please enter a valid email Address"]
        },
        password: {
            type: String,
            required: [true, "please enter your password"],
            minlength: [6, "your password must be at longer than 6 characters"],
            select: false
        }, 
        passwordConfirm: {
            type: String,
            required: [true, "please confirm your password"],
            validate: {
                //this only works on create and save
                validator: function(el){
                    return el === this.password;
                },
                message: "passwords d\are not the same"
            }
        },
        phoneNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },
        avatar: {
            url: {type:String},
            public_id: {type:String}
        },
        PasswordChangedAt:{
            type: Date
        },
        passwordResetToken:{
            type: String,
            selection: false,index: true
        },
        passwordResetExpires:{
            type: Date,
            Select:false,
        },
    },
    { timestamps: true }
)

userSchema.set("toJSON",{
    transform:function (doc,ret){
        delete ret. password;
         delete ret. passwordConfirm;
          delete ret. passwordResetToken;
           delete ret. passwordResetExpires;
            delete ret. __v;
            return ret;
    }
}
)
// password logic
//hashing
userSchema.pre("save",async function(){
    if(!this.isModified("password") ) return;
    this.password = await bcrypt.hash(this.password,12)
    this.passwordConfirm = undefined;
}
) 


//login check
// test123 === e32tr2yut36rgdw6r536r537
userSchema.methods.correctPassword =async function(candidatePassword,userPassword){
    return await bcrypt.compare(candidatePassword,userPassword)
}
//
userSchema.methods.changedPasswordAfter = function (JWTTimestamp){
    if (this.PasswordChangedAt){
        const changedTimeStamp = parsInt(
        this.PasswordChangedAt.getTime()/1000,
        10
        );
        return JWTTimestamp < changedTimeStamp
  }
  return false;

    }

    // forget password
    userSchema.methods.createPasswordRestToken = function(){
        const restToken = crypto.randomBytes(32).toString("hex");
        this.passwordRestToken =crypto.createHash("sha256")
        .update(restToken)
        .digest("hex");
        this.passwordResetExpires = Date.now() +10 * 60* 1000;
        return restToken;
    }


    const User = mongoose.model("User", userSchema);
    //in monodb :users
    export{User};



