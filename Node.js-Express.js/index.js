const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()

// definindo template engine
app.set('view engine', 'ejs')

// definindo os arquivos estáticos (views)
// usar apenas se não usar template engine
// app.use(express.static(path.join(__dirname, 'views')))

// definindo os arquivos públicos (css e javascript)
app.use(express.static(path.join(__dirname, 'public')))

// rotas
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Digital Tech - Home'
  }) // se não usar template engine colocar views/index
})

app.get('/posts', (req, res) => {  
  const dados = fs.readFileSync('public/dados.json')
  res.render('posts', {
    title: 'Digital Tech - Posts',
    posts: JSON.parse(dados)
  })
})


// 404 error (not found)
app.use((req, res) => {
  res.send('Página não encontrada')
})

// executando servidor
const port = process.env.port || 8080
app.listen(port, () => console.log(`O servidor está escutando na porta ${port}`))