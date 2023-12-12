const tokenSchema = require('../models/token');

const getToken = async (req, res) => {
    try {
        
        const tokens = await tokenSchema.find({}, 'token');
        res.status(200).json({ tokens });
        console.log(tokens);
      } catch (error) {
        console.error('Error al obtener tokens de la base de datos:', error);
        res.status(500).json({ error: 'Error al obtener tokens' });
      }
}

module.exports = getToken; 