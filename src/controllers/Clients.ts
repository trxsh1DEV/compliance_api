import { Request, Response } from "express";
import clientService from "../services/clients/clientService";
import { isValidObjectId } from "mongoose";
import { ClientType } from "../types/ControllersType";

class ClientsController {
  async findAllClients(req: Request, res: Response) {
    try {
      const clients = await clientService.findAll();

      if (clients.length <= 0) {
        return res.status(404).json({
          errors: ["There are no registered users"]
        });
      }

      return res.status(200).json(clients);
    } catch (err: any) {
      return res.status(404).json({
        errors: ["There are no registered users"]
      });
    }
  }

  async show(req: any, res: Response) {
    try {
      let { id } = req.params;

      if (!id) {
        // Aqui estou pegando o id q está no token e eu seto somente no middlewareAuth
        id = req.locals.clientId;
      }

      if (!isValidObjectId(id)) return res.status(400).json({ errors: "ID inválido" });
      const client = await clientService.show(id);

      if (!client)
        return res.status(404).json({
          errors: "Client not found"
        });

      return res.status(200).json(client);
    } catch (err: any) {
      return res.status(400).json({
        errors: [err.message]
      });
    }
  }

  async store(req: Request, res: Response) {
    try {
      const { name, email, isAdmin } = req.body;
      if (!name || !email || typeof isAdmin !== "boolean") {
        return res.status(400).json({
          errors: ["Submit all fields for registration"]
        });
      }

      const newClient = await clientService.create(req.body);
      if (!newClient) res.status(404).json({ errors: "Error creating client" });

      return res.status(201).json("User created successfully");
    } catch (err: any) {
      return res.status(500).json({
        errors: [err.message]
      });
    }
  }

  async update(req: any, res: Response) {
    const {
      name,
      social_reason,
      email,
      avatar,
      isAdmin,
      contact,
      cnpj,
      criticalProblems,
      typeContract,
      feedback
    }: ClientType = req.body;

    let { id } = req.params;

    if (!id) {
      id = req.locals.clientId;
    }

    if (!isValidObjectId(id)) return res.status(400).json({ errors: "ID inválido" });

    if (
      !name &&
      !email &&
      !avatar &&
      !social_reason &&
      !contact &&
      !cnpj &&
      !criticalProblems &&
      feedback <= 0 &&
      typeof isAdmin !== "boolean" &&
      typeContract !== "Fixo" &&
      typeContract !== "Avulso"
    ) {
      return res.status(400).json({
        errors: "Submit at least one for update"
      });
    }

    try {
      const clientData = {
        id,
        name,
        social_reason,
        email,
        avatar,
        isAdmin: !!isAdmin,
        contact,
        cnpj,
        criticalProblems,
        feedback,
        typeContract
      };

      const updatedClient = await clientService.update(clientData);
      if (!updatedClient) {
        return res.status(404).json({
          errors: "Cliente não encontrado"
        });
      }

      res.status(200).json({ message: `Client updated successfully` });
    } catch (err: any) {
      return res.status(500).json({
        errors: [err.message]
      });
    }
  }

  async delete(req: any, res: Response) {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) return res.status(400).json({ errors: ["ID inválido"] });

      const client = await clientService.delete(id);

      if (!client)
        return res.status(404).json({
          errors: "Client not found"
        });

      return res.status(200).json({ message: "Client removed successfully" });
    } catch (err: any) {
      return res.status(400).json({
        errors: [err.message]
      });
    }
  }
}

export default new ClientsController();
