const tokenSchema = require('../models/token');

const postToken = async (req, res) => {
    const token  = tokenSchema(req.body);
  
    try {
      // Crea un nuevo documento en la base de datos
      await tokenSchema.create({ token });
      console.log('Token registrado en la base de datos:', token);
      res.status(200).json({ message: 'Token registrado con éxito' });
    } catch (error) {
      console.error('Error al registrar el token en la base de datos:', error);
      res.status(500).json({ error: 'Error al registrar el token' });
    }
}

module.exports = postToken; 