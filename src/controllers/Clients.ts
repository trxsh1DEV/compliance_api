import Clients from '../models/Clients';
import { Request, Response } from 'express';

class ClientsController {
  async index(req: Request, res: Response) {
    const clients = await Clients.find();

    try {
      return res.status(200).json(clients);
    } catch (err: any) {
      return res.status(err.response.status).json({
        errors: [err.message],
      });
    }
  }

  async store(req: Request, res: Response) {
    try {
      // Criar um novo cliente
      const newClient = new Clients(req.body);
      const savedClient = await newClient.save();

      return res.status(201).json(savedClient);
    } catch (err: any) {
      return res.status(400).json({
        errors: [err.message],
      });
    }
  }
}

export default new ClientsController();
