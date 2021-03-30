const {
  insertClient,
  getClients

} = require('../models/deal.models');
import { Request, Response } from "express"

// We still need to leave eq as a prameter so express does not think it is Responose instead
exports.getClients = (req: Request,res: Response): void => {

    getClients((data: any) => {
   
      if (!data.success) {

        res.status(500).send({
          data
        });
      } else

        res.json(data);
    });
  };


exports.insertClient = (req: Request, res: Response): void => {
   
    if (!req.body) {
      res.status(400).send({ message: 'You didn\'t send anything' });
    }

    insertClient(req, (data: any) => {

      if (!data.success) {

        res.status(500).send({
          data
        });
      } else

        res.json(data);
    });
  };


