import { Request, Response } from 'express';

import Compliance from '../models/Compliance';
import { calculatePointing } from '../services/Calc/operations';
import Clients from '../models/Clients';

class ComplianceController {
  // async index(req: Request, res: Response) {
  //   const devices = await Compliance.find();

  //   try {
  //     return res.status(200).json(devices);
  //   } catch (err: any) {
  //     return res.status(err.response.status).json({
  //       errors: [err.message],
  //     });
  //   }
  // }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { complianceId } = req.params;

      const compliance = await Compliance.findById(complianceId);

      if (!compliance)
        return res.status(404).json({ errors: ['Compliance não encontrado'] });

      const client = await Clients.findById(id);
      if (!client)
        return res.status(404).json({ errors: ['Cliente não encontrado'] });

      for (const item of client?.compliances) {
        if (item._id.equals(complianceId)) {
          return res.status(200).json(compliance);
        }
      }

      return res.status(404).json({
        errors: ['Compliance não encontrado nos (Compliances) desse cliente'],
      });
    } catch (err: any) {
      return res.status(500).json({
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

      const test = calculatePointing(compliance, id);
      console.log(test);
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
    try {
      const client = await Clients.findOne({ id: req.body.client });

      if (!client) {
        return res.status(404).json({ error: 'Client not found' });
      }

      // Crie novas Compliances com base nos dados da solicitação
      const compliances = await Compliance.create(req.body.data);

      // Certifique-se de que `compliances` é uma array
      const complianceIds = Array.isArray(compliances)
        ? compliances.map((compliance) => compliance._id)
        : [compliances._id];

      // Associe as Compliances ao campo 'compliances' do Client
      client.compliances.push(...complianceIds);
      await client.save();

      res.status(201).json(compliances);
    } catch (error: any) {
      console.log(error.message);
      res.status(500).json({ error: error.message });
    }
  }
}

export default new ComplianceController();
