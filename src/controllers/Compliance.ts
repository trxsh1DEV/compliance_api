import { Request, Response } from 'express';
import { calculatePointing } from '../services/Calc/operations';
import { isValidObjectId } from 'mongoose';
import complianceService from '../services/compliance/complianceService'
import clientService from '../services/clients/clientService';

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
      const { complianceId } = req.body;

      const client = await clientService.show(id);
      if (!client)
        return res.status(404).json({ errors: ['Client Not Found'] });

      for (const item of client?.compliances) {
        if (item._id.equals(complianceId)) {
          const compliance = await complianceService.show(complianceId);
          if (!compliance) return res.status(404).json({ errors: ['Compliance Not Found'] });

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
      const compliance = await complianceService.show(id);

      if (!compliance) {
        return res.status(404).json({ errors: ['Compliance não encontrado'] });
      }

      await calculatePointing(compliance, id);
      return res.status(200).json(compliance);
    } catch (err: any) {
      return res.status(500).json({
        errors: [err.message],
      });
    }
  }

  async latestCompliance(req: Request, res: Response) {
    try {
      const latestCompliance = await complianceService.latest()

      if (!latestCompliance) {
        return res.status(404).json({ errors: 'Compliance Not Found' });
      }
      console.log(latestCompliance)

      return res.status(200).json(latestCompliance);
    } catch (err: any) {
      return res.status(500).json({ errors: err.message });
    }
  }

  async store(req: Request, res: Response) {
    try {
      const client = await clientService.show(req.body.data.client);

      if (!client) {
        return res.status(404).json({ error: ['Client not found'] });
      }

      // Crie novas Compliances com base nos dados da solicitação
      const compliances = await complianceService.store(req.body.data);

      // Certifique-se de que `compliances` é uma array
      const complianceIds = Array.isArray(compliances)
        ? compliances.map((compliance) => compliance._id)
        : [compliances._id];

      // Associe as Compliances ao campo 'compliances' do Client
      client.compliances.push(...complianceIds);
      await client.save({validateModifiedOnly: true});

      res.status(201).json(compliances);
    } catch (error: any) {
      console.log(error.message);
      res.status(500).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
      try {
        const { id } = req.params;
        const { compliance: complianceId } = req.body.data;

        if (!isValidObjectId(id) || !isValidObjectId(complianceId)) return res.status(400).json({ errors: 'ID inválido' });

      const client = await clientService.show(id);

      if (!client) return res.status(404).json({ errors: ['Cliente não encontrado'] });

        for (const item of client?.compliances) {
          if (item._id.equals(complianceId)) {
            const dataInfra = req.body.data;

            if(!dataInfra.server && !dataInfra.ha && !dataInfra.backup){
              return res.status(400).json({
                errors: 'Submit at least one for update',
              });
            }

            await complianceService.update(dataInfra);
            return res.status(200).json({message: 'Compliance updated successfully'});
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

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { complianceId } = req.body;

      const client = await clientService.show(id);
      if (!client)
        return res.status(404).json({ errors: ['Client Not Found'] });

      for (const item of client?.compliances) {
        if (item._id.equals(complianceId)) {
          const compliance = await complianceService.show(complianceId);
          if (!compliance) return res.status(404).json({ errors: ['Compliance Not Found or Removed'] });

          const removeIndex = client.compliances.findIndex((item) => item._id.equals(complianceId))
          if(removeIndex !== -1){
            client.compliances.splice(removeIndex, 1);
            await client.save({ validateModifiedOnly: true });
          }
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
}

export default new ComplianceController();
