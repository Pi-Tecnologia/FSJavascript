const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')

const admin = require('./routes/admin.js')

const app = express()

// Configurações
  app.use(session({
    secret: 'appBlog',
    resave: true,
    saveUninitialized: true
  }))
  app.use (flash())

  app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    next()
  })

  mongoose.Promise = global.Promise
  mongoose.connect("mongodb://127.0.0.1/blog")
  const db = mongoose.connection
  db.once('open', () => {
    console.log('Banco de Dados conectado com sucesso.')
  })
  db.on('error', console.error.bind(console, 'Erro na conexão: '))

  app.use(bodyParser.urlencoded({extended: true}))
  app.use(bodyParser.json())

  app.set('view engine', 'ejs')

  app.use(express.static(path.join(__dirname, 'public')))

// Rotas
  app.use('/admin', admin)

// servidor
const port = process.env.port || 8080
app.listen(port, () => console.log(`O servidor está escutando na porta ${port}`))