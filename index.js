const TokenModel = require("./models/token");
const NotificationModel = require("./models/notifications");


const mongoose = require("mongoose")
const express = require('express')
const cors = require("cors");


require("dotenv").config();

const app = express()
const port = process.env.PORT || 8080

//middleware
app.use(cors())
app.use(express.json())


app.post('/registrar-token', async (req, res) => {
    const { token } = req.body;
  
    try {
      // Crea un nuevo documento en la base de datos
      await TokenModel.create({ token });
      console.log('Token registrado en la base de datos:', token);
      res.status(200).json({ message: 'Token registrado con éxito' });
    } catch (error) {
      console.error('Error al registrar el token en la base de datos:', error);
      res.status(500).json({ error: 'Error al registrar el token' });
    }
  });


  app.get('/ver-tokens', async (req, res) => {
    try {
      // Obtiene todos los documentos de la colección Token
      const tokens = await TokenModel.find({}, 'token');
      res.status(200).json({ tokens });
    } catch (error) {
      console.error('Error al obtener tokens de la base de datos:', error);
      res.status(500).json({ error: 'Error al obtener tokens' });
    }
  });

  app.post('/enviar-notificacion', async (req, res) => {
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
      await NotificationModel.create({ title, body });
  
      res.status(200).json({ message: 'Notificación enviada con éxito' });
    } catch (error) {
      console.error('Error al enviar la notificación:', error);
      res.status(500).json({ error: 'Error al enviar la notificación' });
    }
  });

  app.get('/ver-notificaciones', async (req, res) => {
    try {
      const notifications = await NotificationModel.find({}, 'title body sentAt');
      res.status(200).json({ notifications });
    } catch (error) {
      console.error('Error al obtener notificaciones de la base de datos:', error);
      res.status(500).json({ error: 'Error al obtener notificaciones' });
    }
  });


mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to database'))
.catch((error) => console.error(error))

app.listen(port, () => console.log('server listening on port', port))