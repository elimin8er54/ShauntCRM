const mongoose = require('mongoose');
import type { Schema,Model,Document }  from "mongoose";
import  {ObjectID} from "mongodb";
import {historySchema} from "./ReusedEnums";

export interface IUser extends Document  {
  userPassword:string;
}

const userSchema:Schema = new mongoose.Schema({
    userName: {
        type: String
      },
      userUsername: {
        type: String,
        lowercase: true,
        required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
        minLength:3,
        maxLength:20
      },
      userPassword: {
        type: String,
        required: true
      },
      userPhone:String,
      userEmail:{
        type:String,
        lowercase: true,
      },
      userPhotoURL:String,
      userIsRemoved: {
        type: Boolean,
        required: true,
        default:false
      },
      //This is the ID of the super owner. This ID will be its own _id if it is the master account
      teamMasterID: {
        type: ObjectID,
        required: true
      },
    userHistory: {
        type:[historySchema],
         validate: (v:[]) => v == null || v.length > 0
    }
  });


  const userLoginSchema:Schema = new mongoose.Schema({
      userUsername: {
        type: String,
        lowercase: true,
        required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
        minLength:3,
        maxLength:20
      }
  });

  

  export const UserLoginModel:Model<IUser> = mongoose.model('UserLogin', userLoginSchema);
  export const UserModel:Model<IUser> = mongoose.model('User', userSchema);

