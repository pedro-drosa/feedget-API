import express from "express";

class App {
  public server;

  constructor() {
    this.server = express();
    this.middlewares();
  }

  private middlewares() {
    this.server.use(express.json());
  }
}

export default new App().server;
