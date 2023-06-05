const router = require('express').Router()

router.get('/', (req, res) => {
  res.render('admin/index')
})

router.get('/categorias', (req, res) => {
  res.render('admin/categorias')
})

router.get('/categorias/add', (req, res) => {
  res.render('admin/categoriasadd')
})

router.get('/posts', (req, res) => {
  res.send('Pagina de posts')
})

module.exports = router