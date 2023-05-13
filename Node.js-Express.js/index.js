const express = require('express')
const path = require('path')

const app = express()

// definindo os arquivos estáticos (views)
app.use(express.static(path.join(__dirname, 'views')))

// definindo os arquivos públicos (css e javascript)
app.use(express.static(path.join(__dirname, 'public')))

// rotas
app.get('/', (req, res) => {
  res.render('views/index')
})




// 404 error (not found)
app.use((req, res) => {
  res.send('Página não encontrada')
})

// executando servidor
const port = process.env.port || 8080
app.listen(port, () => console.log(`O servidor está escutando na porta ${port}`))