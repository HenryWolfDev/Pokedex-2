import { FetchPokemonData } from "./js/fetchPokemonData.js";
import { PokemonRenderer } from "./js/PokemonRenderer.js";

async function initPokedex() {
  const renderer = new PokemonRenderer("pokedex");
  let currentOffset = 1;
  const limit = 20;

  const button = document.getElementById("next-button");

  const pokeCards = document.createElement("div");
  pokeCards.classList.add("pokeCards");
  renderer.containerElement.appendChild(pokeCards);

  const loadAndRenderPokemon = async () => {
    if (currentOffset > 151) {
      button.disabled = true;
      return;
    }

    const remaining = 151 - currentOffset + 1;
    const fetchLimit = Math.min(limit, remaining);
    const newPokemon = await FetchPokemonData.loadPokemon(
      currentOffset,
      fetchLimit
    );
    console.log("Geladene Pokémon:", newPokemon);
    renderer.filteredPokemonList.push(...newPokemon);

    newPokemon.forEach((pokemon) => {
      const card = renderer.renderPokeCard(pokemon);

      card.addEventListener("click", () => {
        const detailCard = renderer.renderPokemonDetailCard(pokemon);

        // Overlay für Detailansicht erstellen
        const overlay = document.createElement("div");
        overlay.classList.add("detail-card-overlay");
        overlay.appendChild(detailCard);

        document.body.appendChild(overlay);

        const closeIcon = document.querySelector(".close-image");

        // Schließen durch Klick aufs Overlay
        closeIcon.addEventListener("click", (e) => {
          overlay.remove();
        });
      });

      pokeCards.appendChild(card);
    });

    currentOffset += limit;

    if (currentOffset > 151) {
      button.disabled = true;
    }
  };

  button.addEventListener("click", loadAndRenderPokemon);

  loadAndRenderPokemon();
}

await initPokedex();
