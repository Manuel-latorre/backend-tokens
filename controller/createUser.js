const User = require('../models/user');
const bcrypt = require('bcryptjs');

const createUser = async (req, res) => {
    try {
        // Obtener datos del cuerpo de la solicitud
        const { fullname, email, password } = req.body;

        // Validar que los campos requeridos estén presentes
        if (!fullname || !email || !password) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
        }

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'El correo electrónico ya está registrado.' });
        }

        // Cifrar la contraseña antes de almacenarla
        const hashedPassword = await bcrypt.hash(password, 12);

        // Crear un nuevo usuario con el carrito inicializado
        const newUser = new User({
            email,
            fullname,
            password: hashedPassword,
        });

        // Guardar el usuario en la base de datos
        await newUser.save();

        // Responder con el usuario creado
        res.status(201).json({
            _id: newUser._id,
            email: newUser.email,
            fullname: newUser.fullname,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

module.exports = createUser;
