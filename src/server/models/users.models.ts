const bcrypt = require("bcryptjs");
const auth = require("../config/auth.config");
const jwt = require("jsonwebtoken");
const ObjectID = require('mongodb').ObjectID;
import {UserModel,IUser} from "./schemas/User"

//We can always make a class with a callback for handling what gets sent back to the client.
//But from what I have learned it may lay lead to issues in the future when we want to do something outside of what the class allows
//Remember we are not making a package we are making something from the packages we use.

interface User  {
  username: string;
  password: string;
}

/**
 * Callback for getting a message 
 *
 * @callback updateUserCallback
 * @param {Object} {} - An obect cointaing the success status.
 */

/**
 * Update or Insert a user, then pass the results to a callback function.
 *
 * @param {Request} req - The request object from the user.
 * @param {updateUserCallback} callback - A callback to run.
 */

export const signin = async ({username,password}: User, result:(data:{success:boolean,message:string})=>void) => {
  let success = false;
  let message = "";
  try {
    const user:IUser = new UserModel({ userName:username,userPassowrd:password });
    user.save( (err) =>{
      if (err) { 
        message = "There was an error when trying to validate the username and password";
        return console.error(err) } else {
          success = true;
          message = "You have logged in! If everything worked correctly you shouldn't even see this message!";
        };
     
    });
  
  } catch (err) {
    message = "There was an error on the server.";
    console.log(err);
  }
  result( {success:success,message:message})
}


/**
 * Callback for getting a message 
 *
 * @callback getClientCallback
 * @param {Object} {} - An obect cointaing the success status.
 */

/**
 * Update or Insert a user, then pass the results to a callback function.
 *
 * @param {Request} req - The request object from the user.
 * @param {updateUserCallback} callback - A callback to run.
 */
export const updateagent = async ({username,password}: User, result:(data:{success:boolean,values:{}})=>void) => {



}




