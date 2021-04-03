import { GameServer } from "./GameServer";
import { ApiServer } from "./ApiServer";
import dotenv from "dotenv";

dotenv.config();

const apiServer = new ApiServer(process.env.API_PORT);
const gameServer = new GameServer(process.env.GAME_PORT);
apiServer.start();
gameServer.start();
