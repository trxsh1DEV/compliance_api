import axios from 'axios';
import DevicesManual from '../models/DevicesManual';
import { Request, Response } from 'express';

class DeviceController {
  async index(req: Request, res: Response) {
    const devices = await DevicesManual.find();

    try {
      return res.status(200).json(devices);
    } catch (err: any) {
      return res.status(err.response.status).json({
        errors: [err.message],
      });
    }
  }

  async store(req: Request, res: Response) {
    const device = new DevicesManual(req.body);
    console.log(req.body);

    try {
      const saveDevice = await device.save();

      return res.status(200).json(saveDevice);
    } catch (err: any) {
      return res.status(err.response.status).json({
        errors: [err.message],
      });
    }
  }
}

export default new DeviceController();
