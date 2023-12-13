const pruebaSchema = require('../models/prueba');

const postPrueba = async (req, res) => {
    try {
        const { title, name } = req.body;
        const nuevaPrueba = new pruebaSchema({ title, name });
        const resultado = await nuevaPrueba.save();
        res.status(201).json(resultado);
      } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
      }
}

module.exports = postPrueba;