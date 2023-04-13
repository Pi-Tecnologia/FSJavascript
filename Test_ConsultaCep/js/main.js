const inputCep = document.forms['formEndereco']['cep']
const inputRua = document.forms['formEndereco']['rua']
const inputBairro = document.forms['formEndereco']['bairro']
const inputCidade = document.forms['formEndereco']['cidade']
const inputEstado = document.forms['formEndereco']['estado']
const inputIbge = document.forms['formEndereco']['ibge']

const span = document.querySelector('span')

inputCep.onblur = exitInput

async function exitInput() {
  const cepPesquisado = inputCep.value

  await fetch(`https://viacep.com.br/ws/${cepPesquisado}/json/`)
    .then(dataJSON)
    .then(cepEncontrado)
    .catch(error)
}

function dataJSON(response) {
  return response.json()
}

function cepEncontrado(data) {
  span.classList.add('hidden')
  inputCep.classList.remove('red', 'erro')

  const { logradouro, bairro, localidade, uf, ibge } = data

  inputRua.value = logradouro
  inputBairro.value = bairro
  inputCidade.value = localidade
  inputEstado.value = uf
  inputIbge.value = ibge
}

function error() {
  span.classList.remove('hidden')
  inputCep.classList.add('red', 'erro')

  inputRua.value = ''
  inputBairro.value = ''
  inputCidade.value = ''
  inputEstado.value = ''
  inputIbge.value = ''
}