import jwt from 'jsonwebtoken';
import User from '../database/schemas/User';

class SessionController {
  async store(req, res) {
    const { email, senha } = req.body;

    // email existe?
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ mensagem: 'Usuário e/ou senha inválidos' });
    }

    // senha esta ok?
    if (!(await user.checkSenha(senha))) {
      return res.status(401).json({ mensagem: 'Usuário e/ou senha inválidos (senha)' });
    }

    // atualiza dt do ultimo login
    user.ultimo_login = new Date();
    await user.update(user);

    const { id, nome } = user; // desestruturacao pega so user + token

    return res.json({
      user,
      token: jwt.sign({ id }, 'e6a0881bbee027e56bfb4ec361827e9e', { expiresIn: '7d' }), // sky job
    });
  }
}

export default new SessionController();
