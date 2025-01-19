const router = require('express').Router()
const mongoose = require('mongoose')

require('../models/Categoria')
require('../models/Postagem')

const Categoria = mongoose.model('categorias')
const Postagem = mongoose.model('postagens')

router.get('/', (req, res) => {
  res.render('admin/index')
})

router.get('/categorias', (req, res) => {
  Categoria.find().sort({data: 'desc'})
    .then((categorias) => {
      res.render('admin/categorias', {categorias: categorias})
    }).catch((error) => {
      req.flash("error_msg", "Erro ao listar as categorias.")
      req.redirect('/admin')
    })
})

router.get('/categorias/add', (req, res) => {
  res.render('admin/categoriasadd', {
    error: []
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
  } else {
    const newCategoria = {
      nome: req.body.nome,
      slug: req.body.slug
    }

    new Categoria(newCategoria).save()
      .then(() => {
        req.flash('success_msg', 'Categoria criada com sucesso!')
        res.redirect("/admin/categorias")
      }).catch((error) => {
        req.flash('error_msg', 'Erro ao salvar a categoria. Tente novamente.')
        res.redirect('/admin')
      })
  }
})

router.get('/categorias/edit/:id', (req, res) => {
  Categoria.findOne({'_id': req.params.id})
    .then((categoria) => {
      res.render('admin/categoriasedit', {
        categoria: categoria,
        error: [{}]
      })
    }).catch((error) => {
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
        }).catch((error) => {
          req.flash('error_msg', 'Erro interno ao tentar alterar a categoria. Tente novamente.')
          res.redirect('/admin/categorias')
        })
    }).catch((error) => {
      req.flash('error_msg', 'Erro ao tentar alterar a categoria. Tente novamente.')
      res.redirect('/admin/categorias')
    })
})

router.post('/categorias/delete', (req, res) => {
  Categoria.findOneAndRemove({'_id': req.body.id})
    .then(() => {
      req.flash('success_msg', 'Categoria deletada com sucesso.')
      res.redirect('/admin/categorias')
    }).catch((error) => {
      req.flash('error_msg', 'Erro ao tentar deletar a categoria. Tente novamente.')
      res.redirect('/admin/categorias')
    })
})

router.get('/postagens', (req, res) => {
    Postagem.find().populate('categoria').sort({data: 'desc'})
    .then((postagens) => {
      res.render('admin/postagens', {
        'postagens': postagens
      })
    }).catch((error) => {
      req.flash('error_msg', 'Erro ao carregar o formulário.')
      res.redirect('/admin')
    })
})

router.get('/postagens/add', (req, res) => {
  Categoria.find()
    .then((categorias) => {
      res.render('admin/postagensadd', {
        categorias: categorias,
        errors: []
      })
    })
})

router.post('/postagens/add', (req, res) => {
  let errors = []

  if (req.body.categoria === "0") {
    errors.push({message: 'Categoria inválida. Cadastre uma categoria.'})
  }

  if (errors.length > 0) {
    res.render('admin/postagensadd', {
      errors: errors
    })
  } else {
    const newPostagem = {
      titulo: req.body.titulo,
      slug: req.body.slug,
      descricao: req.body.descricao,
      conteudo: req.body.conteudo,
      categoria: req.body.categoria
    }

    new Postagem(newPostagem).save()
      .then(() => {
        req.flash('success_msg', 'Postagem salva com sucesso.')
        res.redirect('/admin/postagens')
      }).catch((error) => {
        req.flash('error_msg', 'Erro ao salvar a postagem. Tente novamente.')
        res.redirect('/admin/postagens')
      })
  }
})

router.get('/postagens/edit/:id', (req,res) => {
  Postagem.findOne(({_id: req.params.id}))
    .then((postagem) => {
      Categoria.find()
        .then((categorias) => {
          res.render('admin/postagensedit', {
            'categorias': categorias,
            'postagem': postagem,
            'errors': []
          })
        }).catch((error) => {
          req.flash('error_msg', 'Erro ao listar as categorias.')
          res.redirect('/admin/postagens')
        })

    }).catch((error) => {
      req.flash('error_msg', 'Erro ao carregar o formulário. Tente novamente.')
      res.redirect('/admin/postagens')
    })
})

router.post('/postagens/edit', (req, res) => {
  // fazer validação dos campos
  Postagem.findOne({_id: req.body.id})
    .then((postagem) => {
      postagem.titulo = req.body.titulo
      postagem.slug = req.body.slug
      postagem.descricao = req.body.descricao
      postagem.conteudo = req.body.conteudo
      postagem.categoria = req.body.categoria

      postagem.save().then(() => {
        req.flash('success_mesg', 'Postagem alterada com sucesso.')
        res.redirect('/admin/postagens')
      }).catch((error) => {
      req.flash('success_msg', 'Erro interno.')
      res.redirect('/admin/postagens')
    })

    }).catch((error) => {
      req.flash('error_msg', 'Erro ao alterar a postagem.')
      res.redirect('/admin/postagens')
    })
})

router.get('/postagens/delete/:id', (req, res) => {
  Postagem.findOneAndRemove({_id: req.params.id})
    .then(() => {
      req.flash('success_msg', 'Postagem deletada com sucesso.')
      res.redirect('/admin/postagens')
    }).catch((error) => {
      req.flash('error_msg', 'Erro ao apagar a postagem.')
      res.redirect('/admin/postagens')
  })
})

module.exports = router