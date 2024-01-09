const User = require('../models/user');

const getUsers = async (req, res) => {
    try {
        // Obtener todos los usuarios de la base de datos
        const users = await User.find({}, { password: 0 }); // Excluir el campo de contraseña en la respuesta

        // Responder con la lista de usuarios
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

module.exports = getUsers;
