//Designated area the card goes and the button to draw the card.
const PLACE_WHERE_CARDS_GO = document.getElementById("cards-placement")
const DRAW_CARD_BUTTON = document.getElementById("draw-card-button")

//How the cards are placed based on angle and the relative placement radius.
const ANGLE_VARIATION = 35
const PLACEMENT_VARIATION = 8

//The saved deck.
let deck;

function placeCard(card_img) {
    let newCard = document.createElement("div")
    let rotationDegrees = Math.random() > 0.5 ? Math.random() * ANGLE_VARIATION * -1 : Math.random() * ANGLE_VARIATION
    let transformXY = Math.random() > 0.5 ? Math.random() * PLACEMENT_VARIATION * -1 : Math.random() * PLACEMENT_VARIATION
    newCard.id = "card"
    newCard.innerHTML = `<img src='${card_img}' style="transform:rotate(${rotationDegrees}deg) translate(${transformXY}%, ${transformXY}%); position:absolute;height:50vh">`
    PLACE_WHERE_CARDS_GO.append(newCard)
}

//The old way.
// axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
//     .then(resp => {
//         DRAW_CARD_BUTTON.addEventListener("click", placeCardEventHandler)
//         function placeCardEventHandler(event) {
//             event.preventDefault()
//             axios.get(`https://deckofcardsapi.com/api/deck/${resp.data.deck_id}/draw/?count=1`)
//                 .then(resp => {
//                     placeCard(resp.data.cards[0].image)
//                     if (resp.data.remaining <= 0) {
//                         DRAW_CARD_BUTTON.remove()
//                     }
//                 }
//                 )
//         }
//     }
//     )

//The new way.
DRAW_CARD_BUTTON.addEventListener("click", placeCardEventHandler)

async function placeCardEventHandler(event) {
    event.preventDefault()
    //If there's no deck, get one.
    if (!deck) {
        deck = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    }

    let drawnCard = await axios.get(`https://deckofcardsapi.com/api/deck/${deck.data.deck_id}/draw/?count=1`)
    placeCard(drawnCard.data.cards[0].image)
    if (drawnCard.data.remaining <= 0) {
        DRAW_CARD_BUTTON.remove()
    }
}