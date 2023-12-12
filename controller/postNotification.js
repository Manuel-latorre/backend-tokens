const notificationSchema = require('../models/notifications');

const postNotification = async (req, res) => {
    const { title, body } = req.body;
  
    // Envia notificación a todos los tokens registrados
    const notification = {
      registration_ids: registeredTokens,
      notification: {
        title,
        body,
      },
    };
  
    try {
      const response = await fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `key=${process.env.FCM_SERVER_KEY}`,
        },
        body: JSON.stringify(notification),
      });
  
      const data = await response.json();
      console.log('Notificación enviada:', data);
  
      // Guarda los detalles de la notificación en la base de datos
      await notificationSchema.create({ title, body });
  
      res.status(200).json({ message: 'Notificación enviada con éxito' });
    } catch (error) {
      console.error('Error al enviar la notificación:', error);
      res.status(500).json({ error: 'Error al enviar la notificación' });
    }
}

module.exports = postNotification; 