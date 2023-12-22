import Clients from '../../models/Clients';
import { ClientType } from '../../types/ControllersType';

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

  static update(clientData: ClientType) {
    const { avatar, email, id, name, password, social_reason, isAdmin } =
      clientData;
    return Clients.findOneAndUpdate(
      { _id: id },
      {
        avatar,
        email,
        name,
        password,
        social_reason,
        isAdmin,
      },
    );
  }
}

export default ClienteService;
