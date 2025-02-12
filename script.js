const pokemonContainer = document.getElementById("pokemon-container");
const modal = document.getElementById("pokemon-modal");
const closeModal = document.querySelector(".close-btn");

// Modal Elements
const modalName = document.getElementById("pokemon-name");
const modalImage = document.getElementById("pokemon-image");
const modalType = document.getElementById("pokemon-type");
const modalHP = document.getElementById("pokemon-hp");
const modalAttack = document.getElementById("pokemon-attack");
const modalDefense = document.getElementById("pokemon-defense");

// Fetch Pokémon data
async function fetchPokemon() {
    for (let i = 1; i <= 10; i++) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        const pokemon = await response.json();
        createPokemonCard(pokemon);
    }
}

// Create Pokémon Card
function createPokemonCard(pokemon) {
    const card = document.createElement("div");
    card.classList.add("pokemon-card");

    card.innerHTML = `
        <h3>${pokemon.name.toUpperCase()}</h3>
        <img src="${pokemon.sprites.other.home.front_default}" alt="${pokemon.name}">
        <p>Type: ${pokemon.types.map(t => t.type.name).join(", ")}</p>
        <button class="details-btn" onclick="showDetails(${pokemon.id})">Details</button>
    `;

    pokemonContainer.appendChild(card);
}

// Show Pokémon Details in Modal
function showDetails(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => response.json())
        .then(pokemon => {
            modalName.textContent = pokemon.name.toUpperCase();
            modalImage.src = pokemon.sprites.other.home.front_default;
            modalImage.alt = pokemon.name;
            modalType.textContent = `Type: ${pokemon.types.map(t => t.type.name).join(", ")}`;
            modalHP.textContent = `HP: ${pokemon.stats[0].base_stat}`;
            modalAttack.textContent = `Attack: ${pokemon.stats[1].base_stat}`;
            modalDefense.textContent = `Defense: ${pokemon.stats[2].base_stat}`;

            modal.style.display = "block";
        });
}

// Close the modal when the close button is clicked
closeModal.onclick = () => {
    modal.style.display = "none";
};

// Close modal when clicking outside of it
window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

// Load Pokémon on page load
fetchPokemon();
