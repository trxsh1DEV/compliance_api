import { Request, Response } from 'express';
// import Compliance from '../models/Compliance';
import clientService from '../services/clients/clientService';
import { isValidObjectId } from 'mongoose';

class ClientsController {
  async findAllClients(req: Request, res: Response) {
    try {
      const clients = await clientService.findAll();

      if (clients.length <= 0) {
        return res.status(404).json({
          errors: ['There are no registered users'],
        });
      }
      return res.status(200).json(clients);
    } catch (err: any) {
      return res.status(err.response.status).json({
        errors: [err.message],
      });
    }
  }

  async show(req: any, res: Response) {
    try {
      const { id } = req.params;
      // const { isOwnProfile, isAdmin } = req.body;

      if (!isValidObjectId(id))
        return res.status(400).json({ errors: ['ID inválido'] });

      const client = await clientService.show(id);

      if (!client)
        return res.status(404).json({
          errors: 'Client not found',
        });

      // if (!isAdmin && !isOwnProfile)
      //   res.status(401).json({ errors: ['Unauthorized'] });

      return res.status(200).json(client);
    } catch (err: any) {
      return res.status(400).json({
        errors: [err.message],
      });
    }
  }

  async store(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({
          errors: ['Submit all fields for registration'],
        });
      }
      const newClient = await clientService.create(req.body);
      if (!newClient) res.status(404).json({ errors: 'Error creating client' });

      return res.status(201).json('User created successfully');
    } catch (err: any) {
      return res.status(500).json({
        errors: [err.message],
      });
    }
  }
  async update(req: any, res: Response) {
    const { name, social_reason, email, password, avatar, isAdmin } = req.body;
    const { id } = req.params;
    if (!isValidObjectId(id))
      return res.status(400).json({ errors: 'ID inválido' });

    if (!name && !email && !password && !avatar && !social_reason) {
      return res.status(400).json({
        errors: 'Submit at least one for update',
      });
    }
    try {
      const clientData = {
        id,
        name,
        social_reason,
        email,
        password,
        avatar,
        isAdmin,
      };

      await clientService.update(clientData);

      res.status(200).json({ message: 'Client updated successfully' });
    } catch (err: any) {
      return res.status(500).json({
        errors: [err.message],
      });
    }
  }
}

export default new ClientsController();
