const mongoose = require('mongoose');
import  {ObjectID} from "mongodb";
import {historySchema} from "./ReusedEnums";


//_id also stored in an array @see Team.ts called teamUserID
//_id also stored in an array @see Client.ts called clientUserID
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
      },
      userUsername: {
        type: String,
        required: true,
        lowercase: true,
        minLength:3,
        maxLength:20
      },
      userPassword: {
        type: String,
        required: true
      },
      userPhone:String,
      userEmail:String,
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
        required:true
    }
  });

  export const User = mongoose.model('User', userSchema);

