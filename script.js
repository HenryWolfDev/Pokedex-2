import { FetchPokemonData } from "./fetchPokemonData.js";
import { PokemonRenderer } from "./PokemonRenderer.js";

async function initPokedex() {
  const renderer = new PokemonRenderer("pokedex");

  const pokemonArray = await FetchPokemonData.loadPokemon();
  renderer.setPokemonLists(pokemonArray);

  pokemonArray.forEach((pokemon) => {
    const card = renderer.renderPokedex(pokemon);
    renderer.containerElement.appendChild(card);
  });
}

await initPokedex();
