import { ServerSpec } from "./ServerSpec";
import http, { createServer } from "http";
import io from "socket.io";

export class GameServer implements ServerSpec {
  private readonly server: http.Server;
  private readonly ioServer: io.Server;
  private readonly port: number;

  constructor(port) {
    this.server = createServer();
    this.ioServer = new io.Server(this.server, {
      cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"],
      },
    });
    this.port = port;

    this.registerIOListeners();
  }

  private registerIOListeners() {
    this.ioServer.on("connection", (socket: io.Socket) => {
      console.log(`${socket.id} has connected`);
      socket.send("Welcome to the server");
    });
  }

  start() {
    this.server.listen(this.port);
  }

  stop() {
    this.server.close();
  }
}
