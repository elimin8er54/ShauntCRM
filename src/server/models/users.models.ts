const bcrypt = require("bcryptjs");
import {UserModel,UserLoginModel,IUser} from "./schemas/User";
import {createToken} from "../helpers/jwtCreator";

//We can always make a class with a callback for handling what gets sent back to the client.
//But from what I have learned it may lead to issues in the future when we want to do something outside of what the class allows
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
 * Validate if a user exists and then pass a token and status to a callback
 *
 * @param {Request} req - The request object from the user.
 * @param {updateUserCallback} callback - A callback to run.
 */

export const signIn = async ({username,password}: User, result:(data:{success:boolean,message:string,token:string|null})=>void) => {
  let success = false;
  let message = "";
  let token = null;
  try {
    //Mongoose types are broken it seens so we have to use find over findOne.
    const query:Array<IUser> = await UserModel.find({ userUsername:username, isRemoved: {  $eq: false  }}).limit(1);
  
    if (query.length ){
      const {userPassword,_id} = query[0];
      if( bcrypt.compareSync(password,userPassword)){
          success = true;
          message = "You have logged in! If everything worked correctly you shouldn't even see this message!";
          token = createToken(_id);
      }
    } else {
      message = "Your username or password is incorrect.";
    }
  } catch (err) {
    message = "There was an error when trying to validate the username and password";
    console.log(err);
  }
  result( {success:success,message:message,token:token})
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
export const createUser = async ({username,password}: User, result:(data:{success:boolean,message:string,token:string|null})=>void) => {
  let success = false;
  let message = "";
  let token = null;
  const pwd = bcrypt.hashSync(password, 8);

  try {
        //We should change this to async/await with a try catch block instead.
    const user:IUser = new UserModel({ userUsername:username.toLocaleLowerCase(),userPassowrd:pwd });
    user.save( (err,values) =>{
      if (err) { 
        message = "There was an error when trying to create the account";
        return console.error(err) } else {
          success = true;
          message = "Account has been created!";
          token = createToken(values._id);
        };
     
    });
  
  } catch (err) {
    message = "There was an error on the server.";
    console.log(err);
  }
  result( {success:success,message:message,token:token})

}




