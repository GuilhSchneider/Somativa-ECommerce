if(localStorage.getItem("produtos") == null || localStorage.getItem("produtos") == ""){
    window.location.href = "index.html"
}

var precoReal = 0

const produto = document.getElementById("produto")
const avaliacao = document.getElementById("avaliacao")
const preco = document.getElementById("preco")
const corFrete = document.getElementById("corFrete")
const quantidade = document.getElementById("quantidade")
const imgProduto = document.getElementById("imgProduto")
const freteElement = document.getElementById("frete")
const total = document.getElementById("total")

// 0 - nome,
// 1 - avaliacao, 
// 2 - preco
// 3 - cor
// 4 - imagem
//
var dados = []

dados = localStorage.getItem("produtos").split(",/,")

dados.forEach(dado => console.log(dado))


document.title = dados[0]
produto.innerHTML = dados[0]
avaliacao.innerHTML = dados[1]
freteElement.innerHTML = dados[5]

fetch('https://economia.awesomeapi.com.br/json/last/USD').then(response => response.json())
.then(money =>{
    dolar = parseFloat(money.USDBRL.bid)
    preco.innerHTML = `$${dados[2]} ou R$`+((dolar*parseFloat(dados[2])).toFixed(2))

        precoReal = dolar * dados[2]
        total.innerHTML = `R$${(precoReal + parseFloat(dados[5])).toFixed(2)}`
})


imgProduto.src = dados[4]

// preco.innerHTML
corFrete.innerHTML = dados[3]


