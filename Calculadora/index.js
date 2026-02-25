//!Functions de operadores aritméticos
const fatorial = n => (n <= 1 ? 1 : n * fatorial(n - 1))

const somar = (a, b) => a + b

const multiplicar = (a, b) => a * b

const dividir = (a, b) => a / b

const subtracao= (a, b) => a - b


let visorAtual = ""
let primeiroNumero = 0
let operador = null
let resultadoMostrado = false
let travarVisor = false

document.getElementById('visor').value = primeiroNumero

//! Só vai adicionar o segundo numero se o operador nao for fatorial
function AdicionarNumero(num) {
    if(!travarVisor){
        visorAtual += num  //*Adiciona o número a váriavel que mais tarde sera atribuida ao visor
        document.getElementById('visor').value = visorAtual
    }
}


function apagar() {
    visorAtual = visorAtual.substring(0, visorAtual.length - 1) //*Pega o valor todo da variável com os números, menos o ultimo apagando-o
    document.getElementById('visor').value = visorAtual //*Atualiza o valor do input com o novo valor da váriavel
}

//*Adiciona um "ouvinte" para capturar quando qualquer tecla do teclado for pressionada
document.addEventListener("keydown", function (e) {
    //*Verifica se a tecla pressionada é Backspace
    if (e.key === "Backspace" || e.key == 'Escape') {
        e.preventDefault() // evita apagar o input todo
        if(resultadoMostrado){
            visorAtual = "" 
            document.getElementById('visor').value = visorAtual
            resultadoMostrado = !resultadoMostrado
        }else{
            apagar()
        }
        return
    }

    //*Verifica se a tecla que foi apertada é um botão do teclado númerico
    if (!isNaN(e.key) && e.key !== " ") {
        //! Chama a função adicionarNumero passando o número digitado
        AdicionarNumero(e.key)
        resultadoMostrado = !resultadoMostrado
        return
    }

    if (e.key === "Enter" || e.key === "="){
        igual()
        e.preventDefault()
        resultadoMostrado = true
        return
    }

    if(["+", "-", "*", "/", "!"].includes(e.key)){
        definirOperador(e.key)
        resultadoMostrado = !resultadoMostrado
        return
    }

})

function definirOperador(op) {
    primeiroNumero = Number(visorAtual) //*A váriavel captura o primeiro número adicionado ao visor quando o operador for selecionado
    operador = op
    
    if(op == '!'){
        travarVisor = true
        visorAtual += '!'
        
    }else{
        visorAtual = ""
    }

    if(!primeiroNumero && operador == '-'){
        visorAtual += '-'
    }else if(!primeiroNumero && operador == '+'){
        visorAtual += '+'
    }

    if(resultadoMostrado){
        travarVisor = !travarVisor
    }

    document.getElementById('visor').value = visorAtual
}

function igual() {
    resultadoMostrado = true
    let resultado
    let segundoNumero = Number(visorAtual) //*A váriavel só capturara o segundo número quando o sinal de igual for clicado

    //!Espera a "escolha" do operador aritmético que o usuário vai selecionar
    switch (operador) {
        //!Chamada das funções para cada caso
        case '+':
            resultado = somar(primeiroNumero, segundoNumero)
            break            
        case '*':
            resultado = multiplicar(primeiroNumero, segundoNumero)
            break
        case '/':
            resultado = dividir(primeiroNumero, segundoNumero)
            break
        case '-':
            if(!primeiroNumero && segundoNumero < 0){
                resultado = somar(0, segundoNumero)
                operador = '+'
            }else{
                resultado = subtracao(primeiroNumero, segundoNumero)
            }
            break
        case '!':
            resultado = fatorial(primeiroNumero)
            visorAtual = resultado
            document.getElementById('visor').value = `${primeiroNumero}! = ${resultado}`
            break
        default:
            resultado = "Erro"
    }

    travarVisor = false

    //Só vai executar se o operador nao for o fatorial
    if(operador != '!'){
        visorAtual = resultado
        document.getElementById('visor').value = `${primeiroNumero} ${operador} ${segundoNumero} = ${resultado}`//*Exibe no visor a conta completa
    }
}


/**
*                                                  ,-.
*                                               ("O_)
*                                              / `-/
*                                             /-. /
*                                            /   )
*                                           /   /  
*                              _           /-. /
*                             (_)"-._     /   )
*                               "-._ "-'""( )/    
*                                   "-/"-._" `. 
*                                    /     "-.'._
*                                   /\       /-._"-._
*                    _,---...__    /  ) _,-"/    "-(_)
*                ___<__(|) _   ""-/  / /   /
*                 '  `----' ""-.   \/ /   /
*                               )  ] /   /
*                       ____..-'   //   /                       )
*                   ,-""      __.,'/   /   ___                 /,
*                  /    ,--""/  / /   /,-""   """-.          ,'/
*                 [    (    /  / /   /  ,.---,_   `._   _,-','
*                  \    `-./  / /   /  /       `-._  """ ,-'
*                   `-._  /  / /   /_,'            ""--"
*                       "/  / /   /"         
*                       /  / /   /
*                      /  / /   /  o!O
*                     /  |,'   /  
*                    :   /    /
*                    [  /   ,'   "Blackadder"
*                    | /  ,'
*                    |/,-'
*                    P'  ____   _                                     
*   / __ \ (_) ___   __ _  ___  ___ _ ____      __
*  / / _` || |/ _ \ / _` |/ _ \/ __| '_ \ \ /\ / /
* | | (_| || | (_) | (_| | (_) \__ \ |_) \ V  V / 
*  \ \__,_|/ |\___/ \__,_|\___/|___/ .__/ \_/\_/  
*   \____/__/                      |_|          
*                  @ j o a o s p w
*/
                   

