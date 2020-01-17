import express from 'express'; // sucrase habilita sintaxe impor/export
import routes from './routes';
import './database'; // pega o arquivo index.js automaticamente

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json()); // habilita express receber req json
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
