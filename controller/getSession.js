const User = require('../models/user');
const bcrypt = require('bcryptjs');

const getSession = async (req, res) => {
    try {
        // Obtener datos del cuerpo de la solicitud
        const { email, password } = req.body;

        // Validar que los campos requeridos estén presentes
        if (!email || !password) {
            return res.status(400).json({ error: 'Correo electrónico y contraseña son obligatorios.' });
        }

        // Obtener el usuario de la base de datos, asegurándote de seleccionar la propiedad password
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({ error: 'Credenciales inválidas.' });
        }

        if (!user.password) {
            return res.status(401).json({ error: 'La contraseña no está definida para este usuario.' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Credenciales inválidas.' });
        }

        // Aquí puedes generar un token de autenticación si estás utilizando JWT u otro método de autenticación.

        // Responder con información del usuario, o el token, según tu implementación
        res.status(200).json({
            _id: user._id,
            email: user.email,
            fullname: user.fullname,
            // Puedes incluir más información del usuario si es necesario
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

module.exports = getSession;
