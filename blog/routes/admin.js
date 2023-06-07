const router = require('express').Router()
const mongoose = require('mongoose')

require('../models/Categoria')

const Categoria = mongoose.model('categorias')

router.get('/', (req, res) => {
  res.render('admin/index')
})

router.get('/categorias', (req, res) => {
  res.render('admin/categorias')
})

router.get('/categorias/add', (req, res) => {
  res.render('admin/categoriasadd')
})

router.post('/categorias/new', (req, res) => {
  let errors = []

  if (!req.body.nome || typeof req.body.nome === undefined || req.body.nome === null) {
    errors.push({message: 'Nome inválido'})
  }

  if (req.body.nome.length < 3) {
    errors.push({message: 'Digite no mínimo 3 caracteres.'})
  }

  if (!req.body.slug || typeof req.body.slug === undefined || req.body.slug === null) {
    errors.push({message: 'Slug inválido'})
  }

  if (errors.length > 0) {
    res.render('admin/categoriasadd', {errors: errors})
  }

  console.log(errors)

  const newCategoria = {
    nome: req.body.nome,
    slug: req.body.slug
  }

  new Categoria(newCategoria).save()
    .then(() => {console.log('Categoria salva com suceso')})
    .catch((error) => {console.log('Erro ao salvar:' + error)})
})

router.get('/posts', (req, res) => {
  res.send('Pagina de posts')
})

module.exports = router