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
    if (currentOffset > 151) {
      button.disabled = true;
      return [];
    }

    const restPokemons = 151 - currentOffset + 1;
    const fetchLimit = Math.min(limit, restPokemons);
    const newPokemons = await FetchPokemonData.loadPokemons(
      currentOffset,
      fetchLimit
    );

    renderer.originalPokemonList.push(...newPokemons);

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

async function loadNextPokemonsIfIndexMissing(index) {
  // wenn index größer oder gleich wie liste ist -  dann wird geladen
  while (index >= renderer.originalPokemonList.length) {
    const button = document.getElementById("next-button");
    const newPokemons = await loadAndRenderPokemon(button);

    newPokemons.forEach((pokemon) => {
      const card = renderer.renderPokeCard(pokemon);
      CardClickHandler(card, pokemon);
      pokeCards.appendChild(card);
    });
  }
}

function loadMorePokemonListener(button) {
  button.addEventListener("click", () => loadAndRenderPokemon(button));
}

function searchInputListenerAndRendering() {
  const searchInput = document.getElementById("search-input");

  searchInput.addEventListener("input", () => {
    const inputUser = searchInput.value.toLowerCase();

    if (inputUser.length < 3) {
      pokeCards.innerHTML = "";

      renderer.originalPokemonList.forEach((pokemon) => {
        const card = renderer.renderPokeCard(pokemon);
        CardClickHandler(card, pokemon);
        pokeCards.appendChild(card);
      });
      return;
    }

    // mehr als 3 zeichen getippt:
    const filtered = renderer.originalPokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(inputUser)
    );

    pokeCards.innerHTML = "";

    filtered.forEach((pokemon) => {
      const card = renderer.renderPokeCard(pokemon);
      CardClickHandler(card, pokemon);
      pokeCards.appendChild(card);
    });
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
  searchInputListenerAndRendering();
  await loadAndRenderPokemon(button);
}
// #endregion LOAD-RENDERING

// #region DETAIL-CARD

function CardClickHandler(card, pokemon) {
  card.addEventListener("click", () => {
    const index = renderer.originalPokemonList.findIndex(
      (pk) => pk.id === pokemon.id
    );
    renderDetailCard(index);
  });
}

async function renderDetailCard(index) {
  let currentIndex = index;

  const overlay = document.getElementById("detail-overlay");
  overlay.innerHTML = "";
  overlay.classList.remove("hidden");
  document.body.style.overflow = "hidden";

  await loadNextPokemonsIfIndexMissing(currentIndex);

  const newPokemon = renderer.originalPokemonList[currentIndex];
  const detailCard = renderer.renderPokemonDetailCard(newPokemon);

  overlay.appendChild(detailCard);

  const closeIcon = overlay.querySelector(".close-image");
  if (closeIcon) {
    closeIcon.addEventListener("click", () => {
      overlay.classList.add("hidden");
      document.body.style.overflow = "";
    });
  }

  navigationButtons(overlay, currentIndex, renderDetailCard);
}

function navigationButtons(overlay, currentIndex, renderFn) {
  const leftBtn = overlay.querySelector("#switch-left");
  const rightBtn = overlay.querySelector("#switch-right");

  if (leftBtn) {
    leftBtn.addEventListener("click", async () => {
      const prevIndex = (currentIndex - 1 + 151) % 151;
      await renderFn(prevIndex);
    });
  }

  if (rightBtn) {
    rightBtn.addEventListener("click", async () => {
      const nextIndex = (currentIndex + 1) % 151;
      await renderFn(nextIndex);
    });
  }
}
// #endregion DETAIL-CARD

await initPokedex();
