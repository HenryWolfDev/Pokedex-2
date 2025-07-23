import { Templates } from "./templates/templates.js";

export class PokeCardRenderer {
  constructor(container) {
    this.containerElement = document.querySelector(`#${container}`);
    this.originalPokemonList = [];
  }

  setPokemonLists(pokemonArray) {
    this.originalPokemonList = pokemonArray;
  }

  renderPokeCard(pokemon) {
    return Templates.createPokeCard(pokemon);
  }

  renderPokemonDetailCard(pokemon) {
    return Templates.createPokemonDetailCard(pokemon, this.calcStatbar);
  }

  calcStatbar(stat) {
    const maxStat = 160;
    const statValue = stat.baseStat;
    return Math.min((statValue / maxStat) * 100, 100);
  }
}
