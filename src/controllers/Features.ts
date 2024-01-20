import axios from "axios";
import { Request, Response } from "express";
import ClienteService from "../services/clients/clientService";
import { filterRegexUppercaseAndSpaces } from "../utils/regex";

class Features {
  async snapshots(req: Request, res: Response) {
    try {
      // Criar as credenciais codificadas em base64
      const credentials = btoa(`${process.env.LOGIN_GRAFANA}:${process.env.PASSWORD_GRAFANA}`);
      const user = await ClienteService.show(req.body.clientId);

      const options = {
        headers: {
          Authorization: `Basic ${credentials}`,
          "Content-Type": "application/json"
        }
      };

      const snapshots = await axios.get(process.env.URL_GRAFANA || "", options);

      // Pegando somente o dominio de um e-mail, ex: user@domain.com, obtenho só o "domain"
      const domainMatch = (user?.email?.match(/@([^.]+)\./)?.[1] || "").trim();
      if (!domainMatch) return res.status(400).json("Invalid user email domain");

      const regex = filterRegexUppercaseAndSpaces(domainMatch);

      const resultadoFiltrado = snapshots.data.filter((item: any) => regex.test(item.name));

      if (resultadoFiltrado.length === 0) return res.status(404).json("No Dashboards found in Grafana");

      return res.json(resultadoFiltrado[0].externalUrl);
    } catch (err: any) {
      return res.status(500).json({
        errors: [err.message]
      });
    }
  }
}

export default new Features();
