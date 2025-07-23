import { FetchPokemonData } from "./js/fetchPokemonData.js";
import { PokeCardRenderer } from "./js/pokeCardRenderer.js";

let currentOffset = 1;
const limit = 20;
let renderer;
let pokeCards;

async function loadAndRenderPokemon(button) {
  showSpinner();

  try {
    if (currentOffset > 151) {
      button.disabled = true;
      return [];
    }

    const remaining = 151 - currentOffset + 1;
    const fetchLimit = Math.min(limit, remaining);
    const newPokemons = await FetchPokemonData.loadPokemons(
      currentOffset,
      fetchLimit
    );

    renderer.originalPokemonList.push(...newPokemons);
    renderer.filteredPokemonList.push(...newPokemons);

    newPokemons.forEach((pokemon) => {
      const card = renderer.renderPokeCard(pokemon);
      CardClickHandler(card, pokemon);
      pokeCards.appendChild(card);
    });

    currentOffset += limit;

    if (currentOffset > 151) {
      button.disabled = true;
    }

    return newPokemons;
  } finally {
    hideSpinner();
  }
}

function CardClickHandler(card, pokemon) {
  card.addEventListener("click", () => {
    let currentIndex = renderer.originalPokemonList.findIndex(
      (p) => p.id === pokemon.id
    );

    const renderDetailCard = async (index) => {
      const existingOverlay = document.querySelector(".detail-card-overlay");
      if (existingOverlay) existingOverlay.remove();

      // Falls das Pokémon noch nicht geladen wurde (index >= Länge)
      while (index >= renderer.originalPokemonList.length) {
        const button = document.getElementById("next-button");
        const newPokemons = await loadAndRenderPokemon(button);

        newPokemons.forEach((pokemon) => {
          const card = renderer.renderPokeCard(pokemon);
          CardClickHandler(card, pokemon);
          pokeCards.appendChild(card);
        });
      }

      const newPokemon = renderer.originalPokemonList[index];
      const detailCard = renderer.renderPokemonDetailCard(newPokemon);

      const overlay = document.createElement("div");
      overlay.classList.add("detail-card-overlay");
      overlay.appendChild(detailCard);
      document.body.appendChild(overlay);

      const closeIcon = overlay.querySelector(".close-image");
      if (closeIcon) {
        closeIcon.addEventListener("click", () => overlay.remove());
      }

      const leftBtn = overlay.querySelector("#switch-left");
      const rightBtn = overlay.querySelector("#switch-right");

      if (leftBtn) {
        leftBtn.addEventListener("click", async () => {
          const prevIndex = (currentIndex - 1 + 151) % 151;
          currentIndex = prevIndex;
          await renderDetailCard(prevIndex);
        });
      }

      if (rightBtn) {
        rightBtn.addEventListener("click", async () => {
          const nextIndex = (currentIndex + 1) % 151;
          currentIndex = nextIndex;
          await renderDetailCard(nextIndex);
        });
      }
    };

    renderDetailCard(currentIndex);
  });
}

function setupNextButton(button) {
  button.addEventListener("click", () => loadAndRenderPokemon(button));
}

async function initPokedex() {
  renderer = new PokeCardRenderer("pokedex");
  const button = document.getElementById("next-button");

  pokeCards = document.createElement("div");
  pokeCards.classList.add("pokeCards");
  renderer.containerElement.appendChild(pokeCards);

  setupNextButton(button);
  await loadAndRenderPokemon(button);
}

function showSpinner() {
  document.getElementById("loading-overlay").classList.remove("hidden");
}

function hideSpinner() {
  document.getElementById("loading-overlay").classList.add("hidden");
}

await initPokedex();
