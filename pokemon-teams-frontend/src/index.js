const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const trainerContainer = document.getElementById("trainer-container")

document.addEventListener('DOMContentLoaded', (e) => {

    fetch('http://localhost:3000/trainers')
        .then(response => response.json())
        .then(data => {
            data.forEach(trainer => {
                const trainerCard = document.createElement("div");
                trainerCard.classList.add("card");
                trainerCard.innerHTML = `<p>${trainer.name}<p>
                                        <button>Add Pokemon</button>
                                        <ul><ul>`
                trainerContainer.append(trainerCard);
                const pokemonList = trainerCard.querySelector("ul");
                const addPokemon = trainerCard.querySelector("button");
                addPokemon.addEventListener('click', (e) => {
                    if (pokemonList.childElementCount <= 6) {
                        fetch("http://localhost:3000/pokemons", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                trainer_id: trainer.id
                            })
                        })
                            .then(response => response.json())
                            .then(result => displayPokemon(result, pokemonList));
                    }
                    else {
                        alert("There can only be up to six Pokemon on a team!");
                    }
                });
                trainer.pokemons.forEach(pokemon => displayPokemon(pokemon, pokemonList));
            });
        });
});

function displayPokemon(pokemon, pokemonList) {
    const pokemonInfo = document.createElement("li");
    pokemonInfo.innerHTML = `${pokemon.nickname} (${pokemon.species}) <button class="release">Release</button>`;
    const releaseButton = pokemonInfo.querySelector("button");
    releaseButton.addEventListener('click', (e) => {
        fetch(`http://localhost:3000/pokemons/${pokemon.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: pokemon.id
            })
        })
        pokemonList.removeChild(pokemonInfo);
    });
    pokemonList.append(pokemonInfo);
}