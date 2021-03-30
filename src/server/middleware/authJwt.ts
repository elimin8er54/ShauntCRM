const jwt = require('jsonwebtoken');
const config = require("../config/auth.config");
const auth = require("../config/auth.config");
import { Response, Request, NextFunction } from 'express';

interface Token extends Request{
  custom: { 
    token: string,
    user_id:string 
  }
}

/**
 * Express middleware for removing and expired users token or renewing an active users token
 *
 * @param {Request} req - The request object from the user.
 * @param {Response} res - The response object to send to the user.
 * @param {Next} res - We use next() when we do not want the middleware chain to stop.
 */

exports.verifyToken = (req: Token, res: Response, next: NextFunction): any => {
const{authorization} = req.headers;
  //IF YOU CHANGE THIS MAKE SURE TO CHANGE THE CLIENT CHECK TOO. TokenCheck.tsx
const EXPIRE_IN = 60 * 15;
  const header = authorization;
  let token;
  if (typeof header !== "undefined") {
    const bearer = header.split(" ");
    token = bearer[1];


  } else {
    return res.status(403).send({
      message: "No token provided!",
    });
  }
  jwt.verify(token, config.secret, (err: Error, decoded: any) => {
   
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
        success: false,
      });
    } else {
      //Reset the expire timer for the token
    
      const token = jwt.sign({ user_id: decoded.user_id }, auth.secret, {
        expiresIn: EXPIRE_IN,
      });
     
      req.custom['token']=token;
      req.custom['user_id']=decoded.user_id;
      next();
    }
  });
}


/**
 * This is to add to the end of a middleware chain if we needed to just check for a token without doing anything else.
 * Example: app.post("/api/isValidToken", verifyToken, passedCheck);
 *
 * @param {Request} req - The request object from the user.
 * @param {Response} res - The response object to send to the user.
 */
exports.passedCheck = (req: Request, res: Response) => {
  const {token} = req.body;
  res.json({ success: true,token:token});
}