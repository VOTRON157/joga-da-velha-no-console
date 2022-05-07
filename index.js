// Codigo desenvolvido por Mateus Mendes, todos os diretos reservados.
let taNaVez = true;
const rd = require("readline");
require("colors")

const inquirer = rd.createInterface({
    input: process.stdin,
    output: process.stdout
});

let jogo = {
    tabuleiro: [
        "*", "*", "*", "\n",
        "*", "*", "*", "\n",
        "*", "*", "*"
    ], // Os epaços vazios no tabuleiro serão representados pelo asterisco (*).
    players: {
        x: "❌",
        o: "🔴"
    },
    playerConfig: {
        peça: "",
        modo: ""
    }
}
console.log("Bem vindo(a) ao jogo da velha! antes de iniciar, preciso te fazer algumas perguntas.")
inquirer.question('Escolha o modo de jogo, escreva ' + '"d"'.green + ' para ir com 2 jogadores (local) ou ' + '"s"'.blue + ' para ir contra o computador.\n', msg => {
    switch (msg) {
        case 'd':
            console.log("Você ira jogar contra outro jogador.")
            jogo.playerConfig["modo"] = "duo"
            break;
        case 's':
            console.log("Você ira jogar contra o computador.")
            jogo.playerConfig["modo"] = "solo"
            break;
    }
    inquirer.question('Oque você quer ser? escreva ' + '"x"'.green + ' para o xis ou ' + '"o"'.blue + ' para a bolinha.\n', msg => {
        switch (msg) {
            case 'x':
                console.log("Você escolheu o '❌'.")
                jogo.playerConfig["peça"] = "❌"
                break;
            case 'o':
                console.log("Você escolheu o '🔴'.")
                jogo.playerConfig["peça"] = "🔴"
                break;
        }
        console.log("O jogo começou " + "instruções de como jogar: digite em qual casa você quer jogar (as casa vão de 1 a 9), por exemplo: você quer jogar na casa superior esquerda, por ela ser a primeira casa de cima pra baixo, você tera que digitar o numero 1.".red)
        console.log(pegarTabuleiro(jogo).message)

        LooopDoJogo(jogo)
    })

})



function LooopDoJogo(jogo) {
    while(true){
        if(taNaVez){
            taNaVez = false;
            perguntar()
        } else if (!taNaVez) break;
    }
}

function perguntar(){
    inquirer.question(`Escolha uma casa para jogar! lembre-se você esta jogando como: ${jogo.playerConfig.peça}\n`, msg => {
        if(!pegarTabuleiro(jogo).permitidos.includes(Number(msg))) {
            console.log("Você escolheu uma casa invalida para jogar, por favor selecione outra.")
            return perguntar()
        }
        jogo.tabuleiro[msg <= 3 ? msg - 1 : msg >= 7 ? Number(msg) + 1 : msg] = jogo.playerConfig.peça;
        console.log(pegarTabuleiro(jogo).message);
        taNaVez = true;
        LooopDoJogo(jogo)
    })
}
function pegarTabuleiro(jogo) { // pra não precisar escrever isso toda vez que quisermos logar o tabuleiro no console, eu fiz essa função.
    var casasVazias = [];
    jogo.tabuleiro.map((pos, i) => {
        if(i + 1/3 == 1 || i + 1/3 == 2 || i + 1/3 == 3) return;
        if(pos == "*") casasVazias.push(i < 3 ? i + 1 : i > 6 ? i - 1 : i);
    })
    return {
     permitidos: casasVazias,
     message: `Tabuleiro do jogo:\n ${jogo.tabuleiro.join(" ")}\nCasas disponiveis para jogar: ${casasVazias.join(", ")}`
    }
}