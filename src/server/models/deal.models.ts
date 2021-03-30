const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
import { Request } from "express"
import {Client,IClient} from "./schemas/Client"
const ObjectID = require('mongodb').ObjectID;

/**
 * Callback for inserting a new client
 *
 * @callback createDealCallback
 * @param {Object} {} - An obect cointaing the success status.
 */

/**
 * Add a new client to the Client document, then pass the results to a callback function.
 *
 * @param {Request} req - The request object from the client.
 * @param {createDealCallback} callback - A callback to run.
 */
export const insertClient = async(req:Request,result:(data:{success:boolean})=>void) =>{

const client: IClient = new Client({ clientName: req.body.clientName,clientHistory:[{asd:"asd"}] });
  client.save(function (err) {
    if (err) return console.error(err);
   
  });

  result({success:true})
}

/**
 * Callback for getting all clients
 *
 * @callback getClientCallback
 * @param {Object} {} - An obect cointaing the success status.
 */

/**
 * Get clients from the Client document, then pass the results to a callback function.
 *
 * @param {Request} req - The request object from the client.
 * @param {getClientCallback} callback - A callback to run.
 */
 export const getClients = async(req:Request,result:(data:{success:boolean,values:{}})=>void) =>{
  

  const values = await Client.find({})
  
    result({success:true,values:values})
  }

