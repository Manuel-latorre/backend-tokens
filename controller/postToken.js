const tokenSchema = require('../models/token');

const postToken = async (req, res) => {
  const { fcmtoken } = req.body;

  try {
    // Verifica si el token ya está registrado para evitar duplicados
    const existingToken = await tokenSchema.findOne({ token: fcmtoken });

    if (!existingToken) {
      // Si el token no existe, guárdalo en la base de datos
      await Token.create({ token: fcmtoken });
      res.status(200).json({ message: 'Token registrado con éxito' });
    } else {
      // Si el token ya existe, responde indicando que ya está registrado
      res.status(200).json({ message: 'El token ya está registrado' });
    }
  } catch (error) {
    console.error('Error al registrar el token en la base de datos:', error);
    res.status(500).json({ error: 'Error al registrar el token en la base de datos' });
  }
}

module.exports = postToken; 