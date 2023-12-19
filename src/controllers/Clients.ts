import { Request, Response } from 'express';
// import Compliance from '../models/Compliance';
import clientService from '../services/users/clientService';
import { isValidObjectId } from 'mongoose';

class ClientsController {
  async findAllClients(req: Request, res: Response) {
    try {
      const clients = await clientService.findAll();

      if (clients.length <= 0) {
        return res.status(404).json({
          errors: 'There are no registered users',
        });
      }

      return res.status(200).json(clients);
    } catch (err: any) {
      return res.status(err.response.status).json({
        errors: [err.message],
      });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!isValidObjectId(id))
        return res.status(400).json({ errors: 'ID inválido' });

      const client = await clientService.show(id);
      if (!client)
        return res.status(404).json({
          errors: 'Client not found',
        });

      return res.status(200).json(client);
    } catch (err: any) {
      return res.status(400).json({
        errors: [err.message],
      });
    }
  }

  async store(req: Request, res: Response) {
    try {
      const { name, social_reason, email, password, avatar } = req.body;
      if (!name || !email || !password || !avatar) {
        return res.status(400).json({
          errors: 'Submit all fields for registration',
        });
      }

      const newClient = await clientService.create(req.body);
      if (!newClient) res.status(404).json({ errors: 'Error creating client' });

      return res
        .status(201)
        .json({ id: newClient._id, name, email, avatar, social_reason });
    } catch (err: any) {
      return res.status(400).json({
        errors: [err.message],
      });
    }
  }
  async update(req: Request, res: Response) {
    const { name, social_reason, email, password, avatar } = req.body;
    const { id } = req.params;

    if (!name && !email && !password && !avatar && !social_reason) {
      return res.status(400).json({
        errors: 'Submit at least one for update',
      });
    }

    if (!isValidObjectId(id))
      return res.status(400).json({ errors: 'ID inválido' });

    const client = await clientService.show(id);

    if (!client)
      return res.status(404).json({
        errors: 'Client not found',
      });
    const clientData = { id, name, social_reason, email, password, avatar };

    await clientService.update(clientData);

    res.status(200).json({ message: 'Client updated successfully' });
  }
}

export default new ClientsController();
