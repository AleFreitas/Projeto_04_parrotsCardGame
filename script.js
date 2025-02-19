/*prompt for card number*/
const par = [4,6,8,10,12,14]
let cardNumber = 0;
/*checking if cardNumber is a valid number*/
while (!(par.includes(cardNumber))){
    cardNumber = Number(prompt(`insira o numero de cartas a serem utilizadas ( deve ser um par entre 4 e 14)`));
}
/*number of right moves to win*/
let toWin = cardNumber / 2;
/*querySelector for game format based on cardNumber*/
const gameCards = document.querySelector(".game");
gameCards.classList.add("cards-" + cardNumber);
/*implementing card pairs on a array*/
const cards = []
for (let i = 1; i <= cardNumber / 2; i++) {
    cards.push(i);
    cards.push(i);
}
/*shuffling the cards*/
cards.sort(comparador);
/*[1,3,2,2,1,3]*/
/*list with gifs in order*/
const gifList = ["bobrossparrot.gif", "explodyparrot.gif",
"fiestaparrot.gif","metalparrot.gif", "revertitparrot.gif", 
"tripletsparrot.gif", "unicornparrot.gif"];

/*showing cards*/
const gameDiv = document.querySelector(".game");
for (let i = 1; i <= cardNumber; i++) { 
    gameDiv.innerHTML+=`
    <div class="card" onclick="selectCard(this,${cards[i-1]})">
        <img src="media/back.png" alt="ParrotImg">
        <img src="media/${gifList[cards[i-1]-1]}" alt="ParrotGif">
    </div>
    `;
}
/*Start clock*/
const clock = document.querySelector(".clock")
let count = 0;
const clockInterval = setInterval(function() {
    count++;
    clock.innerHTML = count
}, 1000);

/*function for scrambling cards*/
function comparador() {
    return Math.random() - 0.5;
}
/*a function that toggles two cards at the same time*/
function toggleBothCards(card1,card2){
    card1.classList.toggle("flip");
    card2.classList.toggle("flip");
    stillFlipping = false;
}
/*cards that were chosen and were the same*/
const winnedCards = []
/*previously chosen card*/
let selectedCardGif = 0;
let selectedCard = "";
/*number of moves made throghout the game*/
let moves = 0;
let stillFlipping = false;

function selectCard(card, gif) {
    if(!(stillFlipping)){
        /*checking if it is not an already winned card*/
        if (!(winnedCards.includes(card))) {
            card.classList.toggle("flip");
            /*primeira carta escolhida*/
            if(selectedCardGif === 0){
                moves++;
                selectedCardGif = gif;
                selectedCard = card;
            }else{
                /*got it right*/
                if(selectedCardGif === gif){
                    moves++;
                    toWin-=1;
                    winnedCards.push(card);
                    winnedCards.push(selectedCard);
                /*got it wrong*/
                }else{
                    moves++;
                    const card1 = card;
                    const card2 = selectedCard;
                    stillFlipping = true;
                    setTimeout(function(){
                        toggleBothCards(card1,card2)
                    },1000)
                }
                selectedCard = "";
                selectedCardGif = 0;
            }
            /*game is over and user won*/
            if(toWin === 0){
                clearInterval(clockInterval);
                alert(`Você ganhou em ${moves} jogadas com um tempo de exatamente ${count} segundos!`)
                reset = prompt("Você gostaria de reiniciar o jogo?");
                if (reset === "sim"){
                    window.location.reload()
                }
            }
        }
    }
}
