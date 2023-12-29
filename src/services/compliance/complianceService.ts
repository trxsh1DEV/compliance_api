import Compliance from '../../models/Compliance';

class ComplianceService {
  static async update(clientData: any, id: string) {
    const { server, ha, backup } = clientData;
    console.log(clientData);

    return await Compliance.findOneAndUpdate(
      { _id: id },
      {
        server,
        ha,
        backup,
      },
    );
  }

  static async show(id: string) {
    return await Compliance.findById(id);
  }

  static async latest() {
    return await Compliance.findOne().sort({ createdAt: -1 });
  }

  static async delete(id: string) {
    return await Compliance.findOneAndDelete({ _id: id });
  }

  static async store(data: any) {
    return await Compliance.create(data);
  }
}

export default ComplianceService;
