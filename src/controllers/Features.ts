import axios from "axios";
import { Request, Response } from "express";
import ClienteService from "../services/clients/clientService";
import { filterRegexUppercaseAndSpaces } from "../utils/regex";

class Features {
  async dashboards(req: Request, res: Response) {
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
      const dashboards = await axios.get(`${process.env.URL_GRAFANA}/api/dashboards/public-dashboards`, options);

      // Pegando somente o dominio de um e-mail, ex: user@domain.com, obtenho só o "domain"
      const domainMatch = (user?.email?.match(/@([^.]+)\./)?.[1] || "").trim();
      if (!domainMatch) return res.status(400).json("Invalid user email domain");

      const regex = filterRegexUppercaseAndSpaces(domainMatch);

      const resultFilter = dashboards.data.publicDashboards.filter((item: any) => regex.test(item.title));

      if (resultFilter.length === 0) return res.status(404).json("No Dashboards found in Grafana");
      // const idDashboards = resultFilter.map((item: any) => {
      //   return {
      //     id: item.accessToken,
      //     title: item.title
      //   };
      // });

      return res.json(resultFilter);
    } catch (err: any) {
      return res.status(500).json({
        errors: [err.message]
      });
    }
  }
}

export default new Features();
