import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import complianceService from "../services/compliance/complianceService";
import clientService from "../services/clients/clientService";
import { calculatePointing } from "../services/calc/operations";
import { infraDefault } from "../services/data/infraDefault";

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
      const { complianceId } = req.params;
      // Se no body da requisição não especificar um cliente por padrão vou pegar o clientID q está no próprio token do user logado
      // @ts-ignore
      const id = req.body.client || req.locals.clientId;

      const client = await clientService.show(id);
      if (!client) return res.status(404).json({ errors: ["Client Not Found"] });

      if (!complianceId) {
        const getLatestCompliance = await complianceService.latest(id);
        if (getLatestCompliance) return res.status(200).json(getLatestCompliance);

        return res.status(200).json(infraDefault);
      }

      for (const item of client?.compliances) {
        if (item._id.equals(complianceId)) {
          const compliance = await complianceService.show(complianceId);
          if (!compliance) return res.status(404).json({ errors: ["Compliance Not Found"] });

          return res.status(200).json(compliance);
        }
      }

      return res.status(404).json({
        errors: ["Compliance não encontrado nos (Compliances) desse cliente"]
      });
    } catch (err: any) {
      return res.status(500).json({
        errors: [err.message]
      });
    }
  }

  async latestCompliance(req: Request, res: Response) {
    try {
      // @ts-ignore
      // @ts-ignore
      const id = req.body.client || req.locals.clientId;

      const getLatestCompliance = await complianceService.latest(id);
      if (getLatestCompliance) return res.status(200).json(getLatestCompliance);

      return res.status(200).json(infraDefault);
    } catch (err: any) {
      return res.status(500).json({ errors: err.message });
    }
  }

  async complianceCalculate(req: Request, res: Response) {
    try {
      const { id } = req.params;

      // Encontrar o Compliance pelo ID
      const compliance = await complianceService.show(id);

      if (!compliance) {
        return res.status(404).json({ errors: ["Compliance não encontrado"] });
      }

      await calculatePointing(compliance, id);
      return res.status(200).json(compliance);
    } catch (err: any) {
      return res.status(500).json({
        errors: [err.message]
      });
    }
  }

  async store(req: Request, res: Response) {
    try {
      const client = await clientService.show(req.body.data.client);

      if (!client) {
        return res.status(404).json({ errors: ["Client not found"] });
      }
      const compliances = await complianceService.store(req.body.data);

      // Certifique-se de que `compliances` é uma array
      const complianceIds = Array.isArray(compliances)
        ? compliances.map((compliance) => compliance._id)
        : [compliances._id];

      // Associe as Compliances ao campo 'compliances' do Client
      client.compliances.push(...complianceIds);
      await client.save({ validateModifiedOnly: true });

      res.status(201).json(compliances);
    } catch (err: any) {
      console.log(err.message);
      res.status(500).json({ errors: [err.message] });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const complianceId = req.params.id;
      const { client: id } = req.body;

      if (!isValidObjectId(id) || !isValidObjectId(complianceId))
        return res.status(400).json({ errors: "ID inválido" });

      const client = await clientService.show(id);

      if (!client) return res.status(404).json({ errors: ["Cliente não encontrado"] });

      for (const item of client?.compliances) {
        if (item._id.equals(complianceId)) {
          const dataInfra = req.body;

          if (
            !dataInfra.server &&
            !dataInfra.ha &&
            !dataInfra.backup &&
            !dataInfra.firewall &&
            !dataInfra.security &&
            !dataInfra.inventory &&
            !dataInfra.servicesOutsourcing
          ) {
            return res.status(400).json({
              errors: ["Submit at least one for update"]
            });
          }

          await complianceService.update(dataInfra, complianceId);
          return res.status(200).json({ message: "Compliance updated successfully" });
        }
      }

      return res.status(404).json({
        errors: ["Compliance não encontrado nos (Compliances) desse cliente"]
      });
    } catch (err: any) {
      return res.status(500).json({
        errors: [err.message]
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { complianceId } = req.body;

      const client = await clientService.show(id);
      if (!client) return res.status(404).json({ errors: ["Client Not Found"] });

      for (const item of client?.compliances) {
        if (item._id.equals(complianceId)) {
          const compliance = await complianceService.show(complianceId);
          if (!compliance) return res.status(404).json({ errors: ["Compliance Not Found or Removed"] });

          const removeIndex = client.compliances.findIndex((item) => item._id.equals(complianceId));
          if (removeIndex !== -1) {
            client.compliances.splice(removeIndex, 1);
            await client.save({ validateModifiedOnly: true });
          }
          return res.status(200).json(compliance);
        }
      }

      return res.status(404).json({
        errors: ["Compliance não encontrado nos (Compliances) desse cliente"]
      });
    } catch (err: any) {
      return res.status(500).json({
        errors: [err.message]
      });
    }
  }
}

export default new ComplianceController();
