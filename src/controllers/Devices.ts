import axios from 'axios';
import { Request, Response } from 'express';

class DeviceController {
  async index(req: Request, res: Response) {
    console.log(req.body);
    const url = 'https://apiintegracao.milvus.com.br/api/dispositivos/listagem';
    const token =
      '4ftDeuY2fGACB2JmjChNjF8AI8lDChLZriLLuVfFzgA04IJu54phOXimw95Vi4Hz6mGjxnTuwdcCPTfPUnstIImThfFlOwRM0MKtt';

    const config = {
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
    };

    try {
      const result = await axios.post(url, req.body, config);
      return res.status(200).json(result.data);
    } catch (err: any) {
      return res.status(err.response.status).json({
        errors: [
          'Falha ao buscar dispositivos',
          err.message,
          err.response.status,
          err.data && err.data,
        ],
      });
    }
  }
}

export default new DeviceController();
