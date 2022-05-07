import "dotenv/config";
import cors from "cors";
import express from "express";
import routes from "./routes/index.routes";

class App {
  public server;

  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  private routes() {
    this.server.use(routes);
  }

  private middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
  }
}

export default new App().server;
