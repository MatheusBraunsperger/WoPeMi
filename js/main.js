$(document).ready(function () {
    inicializaCronometro()
    contadorInferior()
    randomSentence()
    verificaTextoBorda()
    contadorFraseCor()
    createScoreboard()
})

// Variaveis globais
let campo = $(".campo-digitacao")

let frase = $(".frase").text();
let numeroPalavras = frase.split(" ").length;

let tamanhoDaFrase = $("#tamanho-frase");
tamanhoDaFrase.text(numeroPalavras)

let tempoRestante = $("#tempo-digitacao").text()
tempoRestante = numeroPalavras - (numeroPalavras / 2)
let tempoInicial = tempoRestante


//Frases randomicas
let sentencas = [
    "The incidence of people travelling on fake or stolen passports is not as rare as people would like to think.",
    "The typical middle-class American baby comes home from the hospital to sleep in his own bed in his own room.",
    "My eyes weren't sharp enough to tell whether the black spot on the ceiling was a spider or a fly.",
    "Run away' will always work even with bosses and the last boss, so when you're in trouble let's run away.",
    "Tom is an obsessive checker and gets up several times every night to make sure the front door is locked.",
    "Tom and Mary purchased a small parcel of land on the edge of town, where they plan to grow vegetables.",
    "And, though many people seemingly still have not noticed this, Esperanto is not a project anymore; it is a language.",
    "If you're not happy with your purchase, you can return it at any time. Could I get that in writing?",
    "Accuracy and finish will become more important than high rates of metal removal for 95 percent of all machining operations.",
    "I had been thinking about our new project for two weeks, but I couldn't come up with a good idea.",
    "One in four girls and one in five boys said that they didn't know how to search for a job.",
    "Christianity came to Armenia at the beginning of the first century and became an official religion in the year 301.",
    "Then we decided to leave everything as it was, in its place - let him study where he wants to.",
    "January, February, March, April, May, June, July, August, September, October, November and December are the twelve months of the year.",
    "He made a lot of money in New York and went back to the small town where he was born.",
    "Nobody is concealing anything except the fact that he does not understand anything anymore and wishes he could go home.",
    "If you thought that we were on a little planet with little peoples, you would not want to propagandize anything.",
    "Sally was absent from school for two weeks, so she has to work hard to catch up with her class.",
    "What kind of a parent would leave their child unattended in the car outside the pub while they're inside drinking?",
    "There is a presumption that any group, anywhere, should be able to reach any overseas location with the new technologies.",
    "English mother-tongue speakers are embarrassed to correctly pronounce the name of the German philosopher Kant, which is a homophone for a vulgar expression referring to the female genitals.",
    "You don't really love me at all. You only care about your math stuff! Not at all, I do love you! Prove it! Okay. Let A be the set of the objects I love...",
    "One of the people I know in real life was trying to come up with a glove to increase your brain's functionality in taste, touch etc. I told him he was nuts but he still thinks it is the best thing since sliced bread!",
    "Americans wanted to impose the idea that a book or a movie should be considered the same as any commercial object. For they understood that besides the army, diplomacy and trade there is also a cultural war. It's a battle they intend to win both for noble reasons",
    "Reconnaissance satellite is a military satellite capable of monitoring many activities on earth, eavesdrop lines, registering the operating frequency of the radar systems...",
    "Hinder me? Thou fool. No living man may hinder me!' Then Merry heard of all sounds in that hour the strangest. It seemed that Dernhelm laughed, and the clear voice was like the ring of steel. 'But no living man am I! You look upon a woman",
    "Each bureaucrat has their own idiosyncrasies as to what papers they will require from you. To be safe, bring all the papers you can, and then get the ones that you can't. Even then, you will be at their whim.",
    "It is absurd to think that the only way to tell if a poem is lasting is to wait and see if it lasts. The right reader of a good poem can tell the moment it strikes him that he has taken an immortal wound â€?that he will never get over it.",
    "I can't keep this up. It's an emotional roller coaster around here and all we have to do is look at the boss's face to know whether everybody is going to be happy or sad.",
    "Although we may intend to judge a person on the basis of his or her personal qualities, they are not visible at first sight."


]
let valorRandom = sentencas[Math.floor(Math.random() * sentencas.length)]


//Botao new game - recarregar a pagina
let botaoReiniciar = $("#botao-reiniciar")
botaoReiniciar.click(function () {

    botaoDeReiniciar()

})


//funções
function verificaTextoBorda() {
    campo.on('input', function () {
        let frase = $(".frase").text();
        let digitado = campo.val();
        let comparavel = frase.substr(0, digitado.length)


        if (digitado == comparavel) {
            campo.removeClass('campo-errado')
            campo.addClass('campo-correto')

        } else {
            campo.removeClass('campo-correto')
            campo.addClass('campo-errado')

        }

    })
}

let executado = true
let erro = false

function inicializaCronometro() {
    let campoTimer = $(".campo-digitacao")

    campoTimer.on('keydown', (function () {
        if (executado == true) {
            const intervalId = setInterval(function () {

                $("#botao-reiniciar").attr("disabled", true)

                tempoRestante--
                $("#tempo-digitacao").text(Math.round(tempoRestante))

                if (tempoRestante <= 0) {
                    campoTimer.addClass('textared')
                    $('#pontuacao-total').addClass('destaca-resultado')


                    $("#botao-reiniciar").attr("disabled", false)

                    campoTimer.attr("disabled", true)
                    clearInterval(intervalId)

                    let tempoDigitacao = $("#tempo-digitacao")
                    tempoDigitacao.text((Math.round(tempoInicial)))


                    mensagemDeErro()



                    scoreboardInput()


                }
            }, 1000)

            executado = false
        }


    }))
}

function contadorInferior() {


    campo.on("input", function () {
        let conteudo = campo.val()
        let qtdPalavras = conteudo.split(/\S+/).length - 1  //expressão regular que busca por espaço vazios
        $("#contador-palavras").text(qtdPalavras)

        conteudo = conteudo.replace(/ /g, '')           //expressão regular que descontabiliza espaço vazios
        let qtdCaracteres = conteudo.length
        $("#contador-caracteres").text(qtdCaracteres)

        let pontuacao = $("#pontuacao-total")
        let pontuacaoTotal = (qtdPalavras / tempoInicial) * 60
        pontuacao.text(pontuacaoTotal.toFixed(1) + ' Words Per Minutes')


    })

}

function botaoDeReiniciar() {

    location.reload()

}

function randomSentence() {

    //let valorRandom = sentencas[Math.floor(Math.random()*sentencas.length)]

    $(".frase").text(valorRandom)

    let frase = $(".frase").text();
    let numeroPalavras = frase.split(" ").length;

    let tamanhoDaFrase = $("#tamanho-frase");
    tamanhoDaFrase.text(numeroPalavras)

    let tempoRestante = $("#tempo-digitacao").text()
    tempoRestante = numeroPalavras - (numeroPalavras / 2)





}

function scoreboardInput() {

    if (erro === false) {
        let usuario = prompt('Name of Player')
        if (usuario == null || usuario == "") {
            usuario = "No Name Registered"
        }
        let tabela = $('.placar').find('tbody')
        let score = $('#pontuacao-total').text().replace(/[^0-9.]|\.(?=.*\.)/g, ""); // regex expression para filtrar tudo menos numeros e .




        let criacaoLinha = '<tr>' +
            '<td>' + usuario + '</td>' +
            '<td>' + score + '</td>' +
            '</tr>';


        tabela.prepend(criacaoLinha)


        scoreboard.push({
            name: usuario,
            points: score
        })

        updateLocalStoage()

    }




}

function mensagemDeErro() {
    let frase = $(".frase").text();
    let digitado = campo.val();
    let comparavel = frase.substr(0, digitado.length)

    if (digitado !== comparavel) {
        $("#pontuacao-total").text('One or more mistakes were made')
        erro = true
    } return erro
}

function createScoreboard() {
    i = 0
    while (i < scoreboard.length) {

        let items = scoreboard[i];

        if (items.points !== undefined || items.points !== 0) {


            let tabela = $('.placar').find('tbody')
            let criacaoLinha = '<tr>' +
                '<td>' + items.name + '</td>' +
                '<td>' + items.points + '</td>' +
                '</tr>';


            tabela.prepend(criacaoLinha)

        }

        i++
    }
}

function contadorFraseCor() {

    campo.keyup(validate);



    function validate() {
        var password1 = campo.val();

        // put each of your password chars in a span
        var pass = "<span>" + $('.frase').text().split("").join("</span><span>") + "</span>";
        $('.frase').html(pass);

        var length = campo.val().length;

        for (var i = 0; i < length; i++) {
            if ($(".frase span").eq(i).text() == password1[i]) {
                $(".frase span").eq(i).css("color", "LightGreen"); //make only correct character green
            } else {
                $(".frase span").eq(i).css("color", "hsl(0, 100%, 66%)");
            }
        }
    }
}


//LocalStorage
const localStorageScoreboard = JSON.parse(localStorage.getItem('scoreboard'));
let scoreboard = localStorage.getItem('scoreboard') !== null ? localStorageScoreboard : [];


const updateLocalStoage = function () {
    localStorage.setItem('scoreboard', JSON.stringify(scoreboard))
}


