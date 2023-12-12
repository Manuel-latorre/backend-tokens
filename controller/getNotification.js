const notificationSchema = require('../models/notifications');

const getNotification = async (req, res) => {
    try {
        const notifications = await notificationSchema.find({}, 'title body sentAt');
        res.status(200).json({ notifications });
      } catch (error) {
        console.error('Error al obtener notificaciones de la base de datos:', error);
        res.status(500).json({ error: 'Error al obtener notificaciones' });
      }
}

module.exports = getNotification; 