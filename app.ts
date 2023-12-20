import express, { Application } from 'express';
import cors from 'cors';
// import deviceRoutes from './src/routes/devices';
// import deviceManualRoutes from './src/routes/devicesManual';
import complianceRoutes from './src/routes/compliance';
import clientsRoutes from './src/routes/clients';
import authRoutes from './src/routes/auth';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    const allowedOrigins = ['http://localhost', 'http://179.213.2.192'];
    this.app.use(
      cors({
        origin: (origin, callback) => {
          if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
          } else {
            callback(new Error('Origem não permitida pelo CORS'));
          }
        },
        allowedHeaders: 'Content-Type,Authorization',
        credentials: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      }),
    );
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  private routes(): void {
    // this.app.use('/api/devices/', deviceRoutes);
    // this.app.use('/api/devices-manual/', deviceManualRoutes);
    this.app.use('/api/auth/', authRoutes);
    this.app.use('/api/compliance/', complianceRoutes);
    this.app.use('/api/clients/', clientsRoutes);
  }
}

export default new App().app;
