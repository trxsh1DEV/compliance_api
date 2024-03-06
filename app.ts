import express, { Application } from "express";
import cors, { CorsOptions } from "cors";
import helmet from "helmet";
import { resolve } from "path";
// Routes
import complianceRoutes from "./src/routes/compliance";
import clientsRoutes from "./src/routes/clients";
import authRoutes from "./src/routes/auth";
import commomUsersRoutes from "./src/routes/commomUser";
import avatarRoutes from "./src/routes/avatar";
import testRoutes from "./src/routes/test";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    const corsOptions: CorsOptions = {
      origin: ["http://localhost:5173", "https://portalcliente.infonova.com.br", "localhost:5421"],
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      allowedHeaders: "Content-Type,Authorization",
      optionsSuccessStatus: 204
    };
    this.app.use(cors(corsOptions)); // Coloque antes do express.json() e express.urlencoded()
    this.app.use(helmet());

    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, "uploads")));
  }

  private routes(): void {
    this.app.use("/auth/", authRoutes);
    this.app.use("/compliance/", complianceRoutes);
    this.app.use("/admin/clients/", clientsRoutes);
    this.app.use("/user/", commomUsersRoutes);
    this.app.use("/images/", avatarRoutes);
    this.app.use("/test/", testRoutes);
  }
}

export default new App().app;
