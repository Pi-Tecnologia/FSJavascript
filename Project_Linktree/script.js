let titulo = document.querySelector('#nome')

titulo.innerHTML = 'Fábio Celestino'

document.title = 'Linktree - Fábio'

let fotoPrincipal = document.querySelector('.foto-principal')

fotoPrincipal.src = '/images/youtube.png'


let subTitulo = document.querySelector('h2')

subTitulo.innerHTML = 'Estudante'


let linkTree = document.querySelectorAll('a')

linkTree.forEach(function(dados, index){

    dados.innerHTML = 'Subtítulos'

})