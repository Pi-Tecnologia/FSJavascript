const router = require('express').Router()
const mongoose = require('mongoose')

require('../models/Categoria')

const Categoria = mongoose.model('categorias')

router.get('/', (req, res) => {
  res.render('admin/index')
})

router.get('/categorias', (req, res) => {
  Categoria.find().sort({data: 'desc'})
    .then((categorias) => {
      res.render('admin/categorias', {categorias: categorias})
    })
    .catch((error) => {
      req.flash("error_msg", "Erro ao listar as categorias.")
      req.redirect('/admin')
    })
})

router.get('/categorias/add', (req, res) => {
  res.render('admin/categoriasadd', {
    error: [
    ]
  })
})

router.post('/categorias/add', (req, res) => {
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
    res.render('admin/categoriasadd', {
      error: errors
    })
  }

  const newCategoria = {
    nome: req.body.nome,
    slug: req.body.slug
  }

  new Categoria(newCategoria).save()
    .then(() => {
      req.flash('success_msg', 'Categoria criada com sucesso!')
      res.redirect("/admin/categorias")
    })
    .catch((error) => {
      req.flash('error_msg', 'Erro ao salvar a categoria. Tente novamente.')
      res.redirect('/admin')
    })

})

router.get('/categorias/edit/:id', (req, res) => {
  Categoria.findOne({'_id': req.params.id})
    .then((categoria) => {
      res.render('admin/categoriasedit', {
        categoria: categoria,
        error: [{}]
      })
    })
    .catch((error) => {
      req.flash('error_msg', 'Essa categoria não existe')
      res.redirect('/admin/categorias')
    })
})

router.post('/categorias/edit', (req, res) => {

  Categoria.findOne({'_id': req.body.id})
    .then((categoria) => {

      categoria.nome = req.body.nome
      categoria.slug = req.body.slug

      categoria.save()
        .then(() => {
          req.flash('success_msg', 'Categoria alterada com sucesso.')
          res.redirect('/admin/categorias')
        })
        .catch((error) => {
          req.flash('error_msg', 'Erro interno ao tentar alterar a categoria. Tente novamente.')
          res.redirect('/admin/categorias')
        })
    })
    .catch((error) => {
      req.flash('error_msg', 'Erro ao tentar alterar a categoria. Tente novamente.')
      res.redirect('/admin/categorias')
    })
})

router.post('/categorias/delete', (req, res) => {
  Categoria.findOneAndRemove({'_id': req.body.id})
    .then(() => {
      req.flash('success_msg', 'Categoria deletada com sucesso.')
      res.redirect('/admin/categorias')
    })
    .catch((error) => {
      req.flash('error_msg', 'Erro ao tentar deletar a categoria. Tente novamente.')
      res.redirect('/admin/categorias')
    })
})

router.get('/posts', (req, res) => {
  res.send('Pagina de posts')
})

module.exports = router