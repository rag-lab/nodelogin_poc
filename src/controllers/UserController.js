import jwt from 'jsonwebtoken';
import { addMinutes, compareAsc } from 'date-fns';
import User2 from '../database/schemas/User';
import authConfig from '../config/auth';

class UserController {
  async index(req, res) {
    const { id } = req.params;
    const user = await User2.findOne({ _id: id });

    if (user != null) {
      const ultimoLogin_mais30 = addMinutes(user.ultimo_login, 30);
      const dataAtual = new Date();
      const isValid = compareAsc(ultimoLogin_mais30, dataAtual); // 1 valid, -1 expirado

      if (isValid > 0) {
        return res.status(200).json(user);
      }
      return res.status(401).json({ mensagem: 'Sessão inválida' });
    }
    return res.status(400).json({ mensagem: 'usuario inexistente' });
  }


  async store(req, res) {
    if (req.body.nome && req.body.email && req.body.senha) {
      if (req.body.senha && req.body.senha === req.body.senha2) {
        // busca por ja existente
        const userExists = await User2.findOne({ email: req.body.email });
        if (userExists) {
          return res.status(400).json({ mensagem: 'email já existe.' });
        }

        // hash

        // cria user
        const newUser = await User2.create({
          nome: req.body.nome,
          email: req.body.email,
          telefones: req.body.telefones,
          senha: req.body.senha,
          senha2: req.body.senha2,
          ultimo_login: new Date(),
        });

        const { id } = newUser;
        return res.json({
          newUser,
          token: jwt.sign({ id }, authConfig.secret, { expiresIn: authConfig.expiresIn }),
        });
      }
      return res.status(400).json({ mensagem: 'Senhas não são iguais' });
    }
    return res.status(400).json({ mensagem: 'Nome, senha e email required' });
  }
}


export default new UserController();
