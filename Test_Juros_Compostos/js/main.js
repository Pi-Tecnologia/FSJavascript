
const formSimulador = document.querySelector('#formSimulador')

const divSimulador = document.querySelector('.simulador')

formSimulador.onsubmit = async function resultadoAPI(e) {
  e.preventDefault()


  const nome = document.forms['formSimulador']['nome'].value
  const mensalidade = parseInt(document.forms['formSimulador']['mensalidade'].value)
  const inputTaxa = document.forms['formSimulador']['taxa'].value
  const tempo = parseInt(document.forms['formSimulador']['tempo'].value)

  const nomeCliente = document.querySelector('.nomeCliente')
  const valorInvestido = document.querySelector('.valorInvestido')
  const meses = document.querySelector('.meses')
  const resultadoInvestimento = document.querySelector('.resultadoInvestimento')

  const taxa = parseFloat((inputTaxa.replace(",", "."))/100)

  const expr = {
    "expr": `${mensalidade} * (((1 + ${taxa})) ^ ${tempo} - 1) / ${taxa}`
  }

  const resultado = await fetch('http://api.mathjs.org/v4/', {
    method: 'POST',
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(expr)
  }).then(response => response.json())

  const valorFinal = parseFloat(resultado.result)



  nomeCliente.innerText = nome
  valorInvestido.innerText = mensalidade.toFixed(2)
  resultadoInvestimento.innerText = valorFinal.toFixed(2)
  meses.innerText = tempo
  divSimulador.classList.add('hidden')
}

const btnSimularNovamente = document.querySelector('.simularNovamente')

btnSimularNovamente.onclick = () => {
  divSimulador.classList.remove('hidden')
}