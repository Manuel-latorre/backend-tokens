const tokenSchema = require('../models/token');

const getToken = async (req, res) => {
  try {
      const tokens = await tokenSchema.find({});
      const totalTokens = tokens.length;

      res.status(200).json({
          success: true,
          message: 'Tokens recuperados con éxito',
          totalTokens,
          tokens,
      });

      console.log(tokens);
  } catch (error) {
      console.error('Error al obtener tokens de la base de datos:', error);
      res.status(500).json({ success: false, error: 'Error al obtener tokens' });
  }
};


module.exports = getToken; 