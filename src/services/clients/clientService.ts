import Clients from '../../models/Clients';
import { ClientType } from '../../types/ControllersType';

interface ClientTypeId extends ClientType {
  id: string;
}

class ClienteService {
  static create(body: ClientType) {
    return Clients.create(body);
  }

  static findAll() {
    return Clients.find();
  }

  static show(id: string) {
    return Clients.findById(id);
  }

  static update(clientData: ClientTypeId) {
    const { avatar, email, id, name, password, social_reason } = clientData;
    return Clients.findOneAndUpdate(
      { _id: id },
      {
        avatar,
        email,
        name,
        password,
        social_reason,
      },
    );
  }
}

export default ClienteService;
