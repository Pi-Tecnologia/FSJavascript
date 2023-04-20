const divProducts = document.querySelector('.products')
const btnNextPage = document.querySelector('.btn-next-page')

btnNextPage.onclick = () => funcaoprodutos()



const objProducts = fetch('https://frontend-intern-challenge-api.iurykrieger.now.sh/products?')



console.log()

/*
async function funcaoprodutos() {
  const objProducts = await fetch('https://frontend-intern-challenge-api.iurykrieger.now.sh/products?').then(response => response.json())

  const { nextPage, products } = objProducts
  divProducts.innerHTML = ''
  products.forEach(item => {
    divProducts.innerHTML += `
    <div class="product">
    <img class="image" src=${item.image} alt="Imagem do Produto">
    <span class="name">${item.name}</span>
    <p class="description">${item.description}</p>
    <p class="old-price">De: R$ ${item.oldPrice}</p>
    <span class="new-price">Por: R$ ${item.price}</span>
    <button>Comprar</button>
    </div>
    `
  })

}
*/

/*

{"products": [{
  "id":0,
  "name":"Product Number 0",
  "image":"//imagens.pontofrio.com.br/Control/ArquivoExibir.aspx?IdArquivo=6875461",
  "oldPrice":309,
  "price":282,
  "description":"Product long description number 0 just to make more than one like of text.",
  "installments":
    {
      "count":10,
      "value":28.2
    }
  }],
  "nextPage":"frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=2"
}

          <img class="image" src="" alt="Imagem do Produto">
          <span class="name">Nome do Produto</span>
          <p class="description">Descrição do produto um pouco maior, com duas linhas ou três que explica melhor do que se trata.</p>
          <p class="old-price">De: R$23,99</p>
          <span class="new-price">Por: R$19,99</span>
          <p class="installment">ou 2x de R$9,99</p>
          <button>Comprar</button>
*/
