import { ServerSpec } from "./ServerSpec";
import express from "express";
import http, { createServer } from "http";

export class ApiServer implements ServerSpec {
  private readonly server: http.Server;
  private readonly port: number;

  constructor(port) {
    const app = express();
    this.registerListeners(app);

    this.server = createServer(app);
    this.port = port;
  }

  private registerListeners(app: express.Application) {
    app.get("/", (req, res) => res.send("Lol"));
  }

  start() {
    this.server.listen(this.port);
  }

  stop() {
    this.server.close();
  }
}
