const inputCep = document.forms['formEndereco']['cep']
const inputRua = document.forms['formEndereco']['rua']
const inputBairro = document.forms['formEndereco']['bairro']
const inputCidade = document.forms['formEndereco']['cidade']
const inputEstado = document.forms['formEndereco']['estado']
const inputIbge = document.forms['formEndereco']['ibge']

function dataJSON(response) {
  return response.json()
}

function consultaCep(data) {
  const { logradouro, bairro, localidade, uf, ibge } = data

  inputRua.value = logradouro
  inputBairro.value = bairro
  inputCidade.value = localidade
  inputEstado.value = uf
  inputIbge.value = ibge
}

function error() {
  console.log('Erro!')
}

async function exitInput() {
  console.log(inputCep.value.length)
  if (inputCep.value.length === 8) {
    const cepPesquisado = inputCep.value
  
    const dadosCep = await fetch(`https://viacep.com.br/ws/${cepPesquisado}/json/`)
      .then(dataJSON)
      .then(consultaCep)
      .catch(error)    
  }
}

inputCep.onblur = exitInput