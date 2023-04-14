const inputCep = document.forms['formEndereco']['cep']
const inputRua = document.forms['formEndereco']['rua']
const inputBairro = document.forms['formEndereco']['bairro']
const inputCidade = document.forms['formEndereco']['cidade']
const inputEstado = document.forms['formEndereco']['estado']
const inputIbge = document.forms['formEndereco']['ibge']

const span = document.querySelector('span')
const loading = document.querySelector('#loading')

inputCep.onblur = onExitInput

async function onExitInput() {
  const cepPesquisado = inputCep.value
  loading.classList.remove('hidden')

  const resultado = await fetch(`https://viacep.com.br/ws/${cepPesquisado}/json/`)
                            .then(response => response.json())
                            .catch(error)

  const { logradouro, bairro, localidade, uf, ibge } = resultado

  span.classList.add('hidden')
  loading.classList.add('hidden')
  inputCep.classList.remove('red', 'erro')

  inputRua.value = logradouro
  inputBairro.value = bairro
  inputCidade.value = localidade
  inputEstado.value = uf
  inputIbge.value = ibge
}

function error() {
  span.classList.remove('hidden')
  loading.classList.add('hidden')
  inputCep.classList.add('red', 'erro')

  inputRua.value = ''
  inputBairro.value = ''
  inputCidade.value = ''
  inputEstado.value = ''
  inputIbge.value = ''
}
