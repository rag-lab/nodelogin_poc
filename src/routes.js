import { Router } from 'express';
import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';
import authMiddleware from './middleware/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/signin', SessionController.store);

// routes.use(authMiddleware); // global todas as rotas pra baixo vao precisar de autenticacao
routes.get('/users/:id', authMiddleware, UserController.index); // aqui define so para uma rota especifica
routes.get('/users/:id', UserController.index);

routes.all('*', (req, res) => res.status(404).json({ mensagem: 'Rota invalida' }));

export default routes;
