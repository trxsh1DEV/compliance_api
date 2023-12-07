import express, { Application } from 'express';
import cors from 'cors';
import deviceRoutes from './src/routes/devices';
import deviceManualRoutes from './src/routes/devicesManual';
import complianceRoutes from './src/routes/compliance';
import clientsRoutes from './src/routes/clients';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    // Adicione outros middlewares conforme necessário, como expressJwt
    // this.app.use(
    //   expressJwt({ secret: 'your-secret-key' }).unless({
    //     path: ['/api/public-route'], // Rotas públicas excluídas da verificação do token
    //   })
    // );
  }

  private routes(): void {
    this.app.use('/api/devices/', deviceRoutes);
    this.app.use('/api/devices-manual/', deviceManualRoutes);
    this.app.use('/api/compliance/', complianceRoutes);
    this.app.use('/api/clients/', clientsRoutes);
  }
}

export default new App().app;
