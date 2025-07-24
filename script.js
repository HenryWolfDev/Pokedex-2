import { FetchPokemonData } from "./js/fetchPokemonData.js";
import { PokeCardRenderer } from "./js/pokeCardRenderer.js";

let currentOffset = 1;
const limit = 20;
let renderer;
let pokeCards;

// #region LOAD-RENDERING

async function loadAndRenderPokemon(button) {
  showSpinner();
  try {
    const restPokemons = 151 - currentOffset + 1;
    const fetchLimit = Math.min(limit, restPokemons);
    const newPokemons = await FetchPokemonData.loadPokemons(
      currentOffset,
      fetchLimit
    );

    renderer.originalPokemonList.push(...newPokemons);
    renderPokemonCards(newPokemons);

    currentOffset += limit;

    if (currentOffset > 151) {
      button.style.display = `none`;
    }

    return newPokemons;
  } finally {
    hideSpinner();
  }
}

function renderPokemonCards(pokemonList) {
  pokemonList.forEach((pokemon) => {
    const card = renderer.renderPokeCard(pokemon);
    cardClickHandler(card, pokemon);
    pokeCards.appendChild(card);
  });
}

function renderCardList(list) {
  pokeCards.innerHTML = "";
  list.forEach((pokemon) => {
    const card = renderer.renderPokeCard(pokemon);
    cardClickHandler(card, pokemon);
    pokeCards.appendChild(card);
  });
}

function loadMorePokemonListener(button) {
  button.addEventListener("click", () => loadAndRenderPokemon(button));
}

function searchInputRendering() {
  const searchInput = document.getElementById("search-input");

  searchInput.addEventListener("input", () => {
    const inputUser = searchInput.value.toLowerCase();

    if (inputUser.length < 3) {
      renderCardList(renderer.originalPokemonList);
      return;
    }

    const filtered = renderer.originalPokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(inputUser)
    );

    renderCardList(filtered);
  });
}

function showSpinner() {
  document.getElementById("loading-overlay").classList.remove("hidden");
}

function hideSpinner() {
  document.getElementById("loading-overlay").classList.add("hidden");
}

async function initPokedex() {
  renderer = new PokeCardRenderer("pokedex");
  const button = document.getElementById("next-button");

  pokeCards = document.createElement("div");
  pokeCards.classList.add("pokeCards");
  renderer.containerElement.appendChild(pokeCards);

  loadMorePokemonListener(button);
  searchInputRendering();
  await loadAndRenderPokemon(button);
}
// #endregion LOAD-RENDERING

// #region DETAIL-CARD

function cardClickHandler(card, pokemon) {
  card.addEventListener("click", () => {
    const index = renderer.originalPokemonList.findIndex(
      (pk) => pk.id === pokemon.id
    );
    renderDetailCard(index);
  });
}

async function renderDetailCard(index) {
  if (index >= renderer.originalPokemonList.length) {
    return;
  }

  const overlay = document.getElementById("detail-overlay");
  overlay.innerHTML = "";
  overlay.classList.remove("hidden");
  document.body.style.overflow = "hidden";

  const newPokemon = renderer.originalPokemonList[index];
  const detailCard = renderer.renderPokemonDetailCard(newPokemon);

  overlay.appendChild(detailCard);
  closeButtonListener(overlay);
  cardNavigationListener(overlay, index);
}

function closeButtonListener(overlay) {
  const closeIcon = overlay.querySelector(".close-image");

  if (closeIcon) {
    closeIcon.addEventListener("click", () => {
      closeOverlay(overlay);
    });
  }

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      closeOverlay(overlay);
    }
  });
}

function closeOverlay(overlay) {
  overlay.classList.add("hidden");
  document.body.style.overflow = "";
}

function cardNavigationListener(overlay, currentIndex) {
  const leftBtn = overlay.querySelector("#switch-left");
  const rightBtn = overlay.querySelector("#switch-right");
  const maxIndex = renderer.originalPokemonList.length - 1;

  if (leftBtn) {
    leftBtn.addEventListener("click", () => {
      const prevIndex = currentIndex === 0 ? maxIndex : currentIndex - 1;
      renderDetailCard(prevIndex);
    });
  }

  if (rightBtn) {
    rightBtn.addEventListener("click", () => {
      const nextIndex = currentIndex === maxIndex ? 0 : currentIndex + 1;
      renderDetailCard(nextIndex);
    });
  }
}

// #endregion DETAIL-CARD

await initPokedex();
