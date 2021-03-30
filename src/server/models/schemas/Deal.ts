const mongoose = require('mongoose');
import  {ObjectID} from "mongodb";
import {historySchema} from "./ReusedEnums";


const dealSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
      },
     
      dealClientID: {
        type: [ObjectID],

      },
      dealTotal: {
        type: Number,

      },
    
      dealIsRemoved: {
        type: Boolean,
        required: true,
        default:false
      },


    userHistory: {
        type:[historySchema],
        required:true
    }
  });

  export const Deal = mongoose.model('Deal', dealSchema);

