import express, { Application } from "express";
import cors from "cors";
import complianceRoutes from "./src/routes/compliance";
import clientsRoutes from "./src/routes/clients";
import authRoutes from "./src/routes/auth";
import commomUsersRoutes from "./src/routes/commomUser";
import helmet from "helmet";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    const corsOptions = {
      origin: ["http://localhost:5173", "http://179.213.2.192"],
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      allowedHeaders: "Content-Type,Authorization",
      optionsSuccessStatus: 204
    };
    this.app.use(helmet());
    this.app.use(cors(corsOptions));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.use("/api/auth/", authRoutes);
    this.app.use("/api/compliance/", complianceRoutes);
    this.app.use("/api/admin/clients/", clientsRoutes);
    this.app.use("/api/user/", commomUsersRoutes);
  }
}

export default new App().app;
