


const mongoose = require("mongoose")
const express = require('express')
const cors = require("cors");


require("dotenv").config();

const controllers = require('./controller')


const app = express()
const port = process.env.PORT || 8080

//middleware
app.use(cors())
app.use(express.json())


app.post('/registrar-token', controllers.postToken)
app.post('/enviar-notificacion', controllers.postNotification)
app.post('/prueba', controllers.postPrueba)
app.post('/register', controllers.createUser)
app.post('/login', controllers.getSession)

app.get('/ver-tokens', controllers.getToken);
app.get('/users', controllers.getUser)
app.get('/ver-notificaciones', controllers.getNotification)

  app.get("/", function(req, res){
    res.send("backend tokenssss")
})

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to database'))
.catch((error) => console.error(error))

app.listen(port, () => console.log('server listening on port', port))