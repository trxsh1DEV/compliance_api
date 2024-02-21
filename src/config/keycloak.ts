import KeycloakConnect from "keycloak-connect";
import session from "express-session";

export const memoryStore = new session.MemoryStore();
const config: KeycloakConnect.KeycloakConfig = {
  realm: "Demo-Realm",
  "auth-server-url": "http://localhost:8080/",
  resource: "nodejs-microservice", // == cliendID
  "confidential-port": 0,
  "ssl-required": "external"
};

const keycloak = new KeycloakConnect({ store: memoryStore }, config);

export default keycloak;
