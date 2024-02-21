import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import { resolve } from "path";
import session from "express-session";
// Routes
import complianceRoutes from "./src/routes/compliance";
import clientsRoutes from "./src/routes/clients";
import authRoutes from "./src/routes/auth";
import commomUsersRoutes from "./src/routes/commomUser";
import avatarRoutes from "./src/routes/avatar";
import featuresRoutes from "./src/routes/features";
import keycloak, { memoryStore } from "./src/config/keycloak";

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
    this.app.use(cors(corsOptions)); // Coloque antes do express.json() e express.urlencoded()
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, "uploads")));
    this.app.use(
      session({
        secret: "dkas)@#DKas)d@DKAW)@KE@!%ik1q)wDAKs",
        resave: false,
        saveUninitialized: true,
        cookie: {
          maxAge: 1000 * 60 * 10
        },
        store: memoryStore
      })
    );
    this.app.use(
      keycloak.middleware({
        admin: "/info-admin/",
        logout: "/logout"
      })
    );
  }

  private routes(): void {
    this.app.use("/auth/", authRoutes);
    this.app.use("/compliance/", complianceRoutes);
    this.app.use("/admin/clients/", clientsRoutes);
    this.app.use("/user/", commomUsersRoutes);
    this.app.use("/images/", avatarRoutes);
    this.app.use("/features/", featuresRoutes);
  }
}

export default new App().app;
