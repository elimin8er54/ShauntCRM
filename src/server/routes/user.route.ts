const user = require("../controllers/user.controller");
import type { MongoClient } from 'mongodb';
import type { Application } from 'express';

module.exports = function (app: Application, client: MongoClient) {
  app.post("/api/createuser", user.signIn(client));
  app.post("/api/signin", user.createUser(client));
};

