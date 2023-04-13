const formulario = document.querySelector('#formulario')
const botaoCalcular = document.querySelector('button')
const divResultado = document.querySelector('#resultado')
const inputDolar = document.querySelector('#dolar')


formulario.onsubmit = function(event) {
  event.preventDefault()

  const valorDolar = inputDolar.value
  calculaDolar(valorDolar)
    .then(convertJSON)
    .then(resultadoConvertido)
    .catch(() => console.log('erro'))
}

async function calculaDolar(dolar) {
  const apiKey="123456897"

  await fetch(`https://free.currconv.com/api/v7/convert?q=${dolar}&compact=ultra&apiKey=${apiKey}`)
}

function convertJSON() {
  return response.json()
}

function resultadoConvertido(data) {
  const { USD_BRL } = data
  divResultado.innerHTML = USD_BRL
}