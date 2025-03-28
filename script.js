
var fretePagar = undefined
const valorFrete = {
    sul: 18,
    nordeste: 26,
    norte: 30,
    centroOeste: 20,
    sudeste: 12
};

const estadosRegiao = {
        "AC": valorFrete.norte,
        "AL": valorFrete.nordeste,
        "AP": valorFrete.norte,
        "AM": valorFrete.norte,
        "BA": valorFrete.nordeste,
        "CE": valorFrete.nordeste,
        "ES": valorFrete.sudeste,
        "GO": valorFrete.centroOeste,
        "MA": valorFrete.nordeste,
        "MT": valorFrete.centroOeste,
        "MS": valorFrete.centroOeste,
        "DF": valorFrete.centroOeste,
        "MG": valorFrete.sudeste,
        "PA": valorFrete.norte,
        "PB": valorFrete.nordeste,
        "PR": valorFrete.sul,
        "PE": valorFrete.nordeste,
        "PI": valorFrete.nordeste,
        "RJ": valorFrete.sudeste,
        "RN": valorFrete.nordeste,
        "RS": valorFrete.sul,
        "RO": valorFrete.norte,
        "RR": valorFrete.norte,
        "SC": valorFrete.sul,
        "SP": valorFrete.sudeste,
        "SE": valorFrete.nordeste,
        "TO": valorFrete.norte

}

function pegarCep(){
    const frete = document.getElementById("frete")
    const cep = document.getElementById("inputCEP").value

    if(cep.length < 8){
        return alert("Precisa ser 8 números")
    }

    fetch(`https://cep.awesomeapi.com.br/json/${cep}`).then(response => response.json())
    .then(dados =>{
        let estado = dados.state
        let valor = estadosRegiao[estado]
        fretePagar = valor 
        let valorTexto = valor.toString().padEnd(2,0)
        frete.innerText = `R$${(valorTexto)}`
    })
}



function calcularDolar(){
    var dolar;
    var precos = document.querySelectorAll('.card-text')
    
        fetch('https://economia.awesomeapi.com.br/json/last/USD').then(response => response.json())
        .then(dados =>{
            dolar = parseFloat(dados.USDBRL.bid)
        }).then(() => {
            fetch( 'http://localhost:3000/brinquedos').then(response => response.json())
            .then(brinquedos =>{
                let i = 0
                brinquedos.forEach(brinquedo => {
                    precos[i].innerHTML = `$${brinquedo.precoDolar}  ou  R$${(dolar * brinquedo.precoDolar).toFixed(2)}`
                    i++
                });
            }).catch(() => {                
                document.getElementById("erro").innerHTML = "Conexão falha com alguma API, seja do dólar, CEP ou com as informações dos problemas"
            })
        })
}
function carregarProdutos(){
    const imgs = document.getElementsByClassName("card-img-top")
    const titulo = document.getElementsByClassName("card-title")
    
    fetch("http://localhost:3000/brinquedos").then(response => response.json())
    .then(brinquedos =>{
        brinquedos.forEach((brinquedo, i) =>{
            imgs[i].src = brinquedo.img
            imgs[i].alt = brinquedo.nome
            titulo[i].innerHTML = brinquedo.nome
        })
    })
}

calcularDolar()
carregarProdutos()

setInterval(calcularDolar, 30000)

function comprar(id) {
    if(fretePagar == undefined){
        alert("Necessário colocar o CEP")
        return
    }
    fetch("http://localhost:3000/brinquedos").then(response => response.json())
    .then(dados => {
        dados.forEach(brinquedo => {
            if(brinquedo.id == id){

                localStorage.setItem("produtos", [brinquedo.nome, "/", brinquedo.avaliacao,"/", brinquedo.precoDolar,"/", brinquedo.cores,"/", brinquedo.img, "/", fretePagar])
                window.location.href = `produto.html`
            }
        });
    })
}