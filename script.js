function placeCard(card_img) {
    const placeWhereCardsGo = document.getElementById("cards-placement")
    let newCard = document.createElement("div")
    const ANGLE_VARIATION = 35
    const PLACEMENT_VARIATION = 8
    let rotationDegrees = Math.random() > 0.5 ? Math.random() * ANGLE_VARIATION * -1 : Math.random() * ANGLE_VARIATION
    let transformXY = Math.random() > 0.5 ? Math.random() * PLACEMENT_VARIATION * -1 : Math.random() * PLACEMENT_VARIATION
    newCard.id = "card"
    newCard.innerHTML = `<img src='${card_img}' style="transform:rotate(${rotationDegrees}deg) translate(${transformXY}%, ${transformXY}%); position:absolute;height:50vh">`
    placeWhereCardsGo.append(newCard)
}

const drawCardButton = document.getElementById("draw-card-button")

axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then(resp => {
        drawCardButton.addEventListener("click", placeCardEventHandler)
        function placeCardEventHandler(event) {
            event.preventDefault()
            axios.get(`https://deckofcardsapi.com/api/deck/${resp.data.deck_id}/draw/?count=1`)
                .then(resp => {
                    placeCard(resp.data.cards[0].image)
                    if (resp.data.remaining <= 0) {
                        drawCardButton.remove()
                    }
                }
                )
        }
    }
    )