import Compliance from "../../models/Compliance";
import { ICompliance } from "../../types/ModelTypesCompliance";

class ComplianceService {
  static async update(clientData: ICompliance, id: string) {
    const { server, ha, backup, inventory, servicesOutsourcing, firewall, security } = clientData;

    return await Compliance.findOneAndUpdate(
      { _id: id },
      {
        server,
        ha,
        backup,
        inventory,
        servicesOutsourcing,
        firewall,
        security
      }
    );
  }

  static async show(id: string) {
    return await Compliance.findById(id);
  }

  static async delete(id: string) {
    return await Compliance.findOneAndDelete({ _id: id });
  }

  static async store(data: any) {
    return await Compliance.create(data);
  }
}

export default ComplianceService;
