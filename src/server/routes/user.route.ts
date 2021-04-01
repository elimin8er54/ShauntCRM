const user = require("../controllers/user.controller");
const { verifyToken, passedCheck } = require("../middleware/authJwt");
import type { Application } from 'express';

module.exports = function (app: Application) {
  app.post("/api/createuser", user.signIn);
  app.post("/api/signin", user.createUser);
  app.post("/api/jwtauth", verifyToken, passedCheck);
};

