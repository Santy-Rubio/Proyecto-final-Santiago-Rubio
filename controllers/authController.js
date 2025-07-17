import jwt  from 'jsonwebtoken';
const authController = {};

authController.login = (req, res) => {
  const { username, password } = req.body;

  // Usuario fijo de ejemplo
  if (username === 'admin' && password === '123456') {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.json({ token });
  } else {
    res.status(401).json({ error: 'Credenciales inválidas' });
  }
};

export default authController;
