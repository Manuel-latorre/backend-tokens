const notificationSchema = require('../models/notifications');
const tokenSchema = require('../models/token')

const postNotification = async (req, res) => {
    const { title, body } = req.body;

    const tokensFromDatabase = await tokenSchema.find({}, { _id: 0, token: 1 });
    const registeredTokens = tokensFromDatabase.map(item => item.token);

    
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
  
      if (!response.ok) {
        // Si la respuesta no es exitosa, lanza un error con el código de estado
        throw new Error(`Error en la solicitud: ${response.status}`);
      }
  
      const responseData = await response.json(); // Almacena el resultado de response.json()
  
      console.log('Notificación enviada:', responseData);
  
      // Guarda los detalles de la notificación en la base de datos
      await notificationSchema.create({ title, body });
  
      res.status(200).json({ message: 'Notificación enviada con éxito' });
    } catch (error) {
      console.error('Error al enviar la notificación o al guardar en la base de datos:', error);
      res.status(500).json({ error: 'Error al enviar la notificación o al guardar en la base de datos' });
    }
  };
  

module.exports = postNotification; 