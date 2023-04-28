
const formSimulador = document.querySelector('#formSimulador')
const divSimulador = document.querySelector('.simulador')
const divContentResultado = document.querySelector('.contentResultado')
const btnSimularNovamente = document.querySelector('.simularNovamente')

btnSimularNovamente.onclick = () => {
  divSimulador.classList.remove('hidden')
  divContentResultado.classList.add('hidden')
}

formSimulador.onsubmit = async function resultadoAPI(e) {
  e.preventDefault()

  const nome = document.forms['formSimulador']['nome']
  const mensalidade = document.forms['formSimulador']['mensalidade']
  const inputTaxa = document.forms['formSimulador']['taxa']
  const tempo = document.forms['formSimulador']['tempo']

  const nomeCliente = document.querySelector('.nomeCliente')
  const valorInvestido = document.querySelector('.valorInvestido')
  const meses = document.querySelector('.meses')
  const resultadoInvestimento = document.querySelector('.resultadoInvestimento')
  
  /***** CONSULTA A API *****/
  const taxa = parseFloat((inputTaxa.value.replace(",", "."))/100)

  const expr = {
    "expr": `${parseInt(mensalidade.value)} * (((1 + ${taxa})) ^ ${parseInt(tempo.value)} - 1) / ${taxa}`
  }

  const resultado = await fetch('http://api.mathjs.org/v4/', {
    method: 'POST',
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(expr)
  }).then(response => response.json())

  const valorFinal = parseFloat(resultado.result)


  /***** PREENCHIMENTO DA TELA DE RESULTADO *****/
  nomeCliente.innerHTML = nome.value
  valorInvestido.innerHTML = parseInt(mensalidade.value).toFixed(2)
  resultadoInvestimento.innerHTML = valorFinal.toFixed(2)
  meses.innerHTML = tempo.value
  divSimulador.classList.add('hidden')
  divContentResultado.classList.remove('hidden')
}