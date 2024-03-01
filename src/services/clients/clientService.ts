import Clients from "../../models/Clients";
import { ClientType } from "../../types/ControllersType";

class ClienteService {
  static async create(body: ClientType) {
    return await Clients.create(body);
  }

  static async findAll() {
    return await Clients.find().sort({ createdAt: -1 });
  }

  static async getUserEmail(email: string) {
    return await Clients.findOne({ email: email });
  }

  static async show(id: string) {
    return await Clients.findById(id);
  }

  static async update(clientData: ClientType) {
    try {
      const {
        avatar,
        email,
        id,
        name,
        social_reason,
        isAdmin,
        criticalProblems,
        typeContract,
        cnpj,
        feedback,
        contact
      } = clientData;

      return await Clients.findOneAndUpdate(
        { _id: id },
        {
          avatar,
          email,
          name,
          social_reason,
          isAdmin,
          criticalProblems,
          typeContract,
          cnpj,
          feedback,
          contact
        },
        { new: true }
      );
    } catch (err: any) {
      throw new Error(`Erro ao atualizar cliente: ${err.message}`);
    }
  }

  static async delete(id: string) {
    return await Clients.findOneAndDelete({ _id: id });
  }
}

export default ClienteService;
