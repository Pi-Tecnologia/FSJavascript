const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const mongoose = require('mongoose')

const admin = require('./routes/admin.js')

const app = express()

// Configurações
  mongoose.Promise = global.Promise
  mongoose.connect("mongodb://localhost:27017")
    .then(() => {'Banco de dados conectado com sucesso'})
    .catch((error) => {console.log('Erro ao se conectar com o Banco de Dados: ' + error)})

  app.use(bodyParser.urlencoded({extended: true}))
  app.use(bodyParser.json())

  app.set('view engine', 'ejs')

  app.use(express.static(path.join(__dirname, 'public')))

// Rotas
  app.use('/admin', admin)

// servidor
const port = process.env.port || 8080
app.listen(port, () => console.log(`O servidor está escutando na porta ${port}`))