const mongoose = require("mongoose")
const express = require('express')
const cors = require("cors");


require("dotenv").config();

const app = express()
const port = process.env.PORT || 8080

//middleware
app.use(cors())
app.use(express.json())


const registeredTokens = [];

app.post('/registrar-token', (req, res) => {
  const { token } = req.body;

  // Almacena el token
  registeredTokens.push(token);

  console.log('Token registrado:', token);
  res.status(200).json({ message: 'Token registrado con éxito' });
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
    res.status(200).json({ message: 'Notificación enviada con éxito' });
  } catch (error) {
    console.error('Error al enviar la notificación:', error);
    res.status(500).json({ error: 'Error al enviar la notificación' });
  }
});


mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to database'))
.catch((error) => console.error(error))

app.listen(port, () => console.log('server listening on port', port))