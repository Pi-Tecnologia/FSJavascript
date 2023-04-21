const divProducts = document.querySelector('.products')
const btnNextPage = document.querySelector('.btn-next-page')

let adressApi = '//frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1'

async function funcaoprodutos(adress) {
  const objProducts = await fetch(`https:${adress}`).then(response => response.json())
  
  const { nextPage, products } = objProducts
  
  products.forEach(item => {
    divProducts.innerHTML += `
    <div class="product">
    <img class="image" src=${item.image} alt="Imagem do Produto">
    <span class="name">${item.name}</span>
    <p class="description">${item.description}</p>
    <p class="old-price">De: R$ ${item.oldPrice.toFixed(2)}</p>
    <span class="new-price">Por: R$ ${item.price.toFixed(2)}</span>
    <p class="installment">ou ${item.installments.count}x de R$ ${item.installments.value.toFixed(2)}</p>
    <button>Comprar</button>
    </div>
    `
  })
  
  adressApi = nextPage
}

funcaoprodutos(adressApi)

btnNextPage.onclick = () => funcaoprodutos(adressApi)