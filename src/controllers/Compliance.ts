import { Request, Response } from 'express';

import Compliance from '../models/Compliance';
import { calculatePointing } from '../services/operations';

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

  async store(req: Request, res: Response) {
    const compliance = new Compliance(req.body);

    try {
      const saveCompliance = await compliance.save();

      return res.status(200).json(saveCompliance);
    } catch (err: any) {
      return res.status(400).json({
        errors: [err.message],
      });
    }
  }
  async complianceCalculate(req: Request, res: Response) {
    try {
      const complianceId = req.params.id;
      console.log(complianceId);

      // Encontrar o Compliance pelo ID
      const compliance = await Compliance.findOne({
        complianceId: complianceId,
      });

      if (!compliance) {
        return res.status(404).json({ errors: ['Compliance não encontrado'] });
      }
      console.log('oi');

      const complianceArray = [compliance];
      const test = complianceArray.map((item) => item.server.servers);

      // const complianceCurrent = calculatePointing(complianceArray);
      // console.log(complianceCurrent);
      return res.status(200).json(test);
    } catch (err: any) {
      return res.status(500).json({
        errors: [err.message],
      });
    }
  }
}

export default new ComplianceController();
