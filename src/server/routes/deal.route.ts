const { verifyToken, passedCheck } = require("../middleware/authJwt");
const deal = require("../controllers/deal.controller");
import type { Application } from 'express';

module.exports = function (app: Application) {
  app.post("/api/insertclient",verifyToken, deal.insertClient);
  app.post("/api/getclients",verifyToken, deal.getClients);
  
};

