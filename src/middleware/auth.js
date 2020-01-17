import jwt from 'jsonwebtoken';
import { promisify } from 'util'; // pega funcao de callback e convrte para uso do async/await
import authConfig from '../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ mensagem: 'Não autorizado1' });
  }

  const [, token] = authHeader.split(' '); // desestrutura e pega so o token

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.userId = decoded.id; // salva o userId na requisicao para uso futuro
    return next();
  } catch (error) {
    return res.status(401).json({ mensagem: 'Não autorizado2' });
  }
};
