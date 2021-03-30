const mongoose = require('mongoose');
import type { Schema,Model,Document }  from "mongoose";
import {ObjectID} from "mongodb";
import {historySchema} from "./ReusedEnums";

export enum ClientStage {
    NOTHING = "NOTHING",
    CONTACTED = "CONTACTED",
    LEAD = "LEAD",
    PENDING = "PENDING",
    FINAL = "FINAL",
    NULL = "NULL"
}
export interface IClient extends Document {
  email: string;
  firstName: string;
  lastName: string;
}

const clientSchema:Schema = new mongoose.Schema({
    clientName: {
        type: String,
        required: true
      },
    clientPhone:String,
    clientEmail:String,
    clientPhotoURL:String,
    clientIsRemoved: {
        type: Boolean,
        required: true,
        default:false
      },
    clientUserID: [ObjectID],

    clientStage:{
        type:String,
        required:true,
        enum:[ClientStage],
        default:ClientStage.NOTHING
    },
    clientHistory: {
        type:[historySchema],
        validate: (v:[]) => v == null || v.length > 0
    }
  });

  export const Client: Model<IClient> = mongoose.model('Client', clientSchema);

