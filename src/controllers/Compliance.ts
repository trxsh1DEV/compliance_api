import { Request, Response } from 'express';

import Compliance from '../models/Compliance';
import { calculatePointing } from '../services/operations';
import Clients from '../models/Clients';

class ComplianceController {
  async index(req: Request, res: Response) {
    const devices = await Compliance.find();

    try {
      return res.status(200).json(devices);
    } catch (err: any) {
      return res.status(err.response.status).json({
        errors: [err.message],
      });
    }
  }

  async complianceCalculate(req: Request, res: Response) {
    try {
      const { id } = req.params;

      // Encontrar o Compliance pelo ID
      const compliance = await Compliance.findOne({ _id: id });

      if (!compliance) {
        return res.status(404).json({ errors: ['Compliance não encontrado'] });
      }

      const complianceCurrent = calculatePointing(compliance);
      console.log(complianceCurrent);
      return res.status(200).json(compliance);
    } catch (err: any) {
      return res.status(500).json({
        errors: [err.message],
      });
    }
  }
  async latestCompliance(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const client = await Clients.findById(id);

      if (!client) {
        return res.status(404).json({ errors: 'Client not found' });
      }

      const latestCompliance = await Compliance.findOne({ client: id }).sort({
        createdAt: -1,
      });

      if (!latestCompliance) {
        return res
          .status(404)
          .json({ errors: 'None compliance found for there client' });
      }

      return res.status(200).json(latestCompliance);
    } catch (err: any) {
      return res.status(500).json({ errors: err.message });
    }
  }

  async store(req: Request, res: Response) {
    const clientId = req.body.client;

    try {
      // Encontre o Client pelo ID
      const client = await Clients.findById(clientId);

      if (!client) {
        return res.status(404).json({ error: 'Client not found' });
      }

      // Crie novas Compliances com base nos dados da solicitação
      const compliances = await Compliance.create(req.body);

      // Certifique-se de que `compliances` é uma array
      const complianceIds = Array.isArray(compliances)
        ? compliances.map((compliance) => compliance._id)
        : [compliances._id];

      // Associe as Compliances ao campo 'compliances' do Client
      client.compliances.push(...complianceIds);
      await client.save();

      // Envie a resposta com as Compliances associadas ao Client
      res.status(201).json(compliances);
    } catch (error: any) {
      // Trate erros aqui
      res.status(500).json({ error: error.message });
    }
  }
}

export default new ComplianceController();
