import Clients from '../../models/Clients';
import jwt from 'jsonwebtoken';

const loginService = async (email: string) =>
  await Clients.findOne({ email: email }).select('+password');

const generateToken = (id: string) =>
  jwt.sign(
    { id },
    process.env.TOKEN_SECRET || '0b5e57cb787c23d243864885e13b113c',
    { expiresIn: '1d' },
  );

export { loginService, generateToken };
