export class PokemonRenderer {
  constructor(container) {
    this.containerElement = document.querySelector(`#${container}`);

    this.originalPokemonList = [];
    this.filteredPokemonList = [];
  }

  setPokemonLists(pokemonArray) {
    this.originalPokemonList = pokemonArray;
    this.filteredPokemonList = pokemonArray;
  }

  renderPokedex(pokemon) {
    const pokeCard = document.createElement("div");
    pokeCard.classList.add("pokemon-card");

    // POKEMON-TITLE-BOX
    const titleBox = document.createElement("div");
    const name = document.createElement("span");
    name.textContent = pokemon.name;
    const id = document.createElement("span");
    id.textContent = pokemon.id;

    titleBox.appendChild(name);
    titleBox.appendChild(id);

    // POKEMON-IMAGE-BOX
    const imageBox = document.createElement("div");
    const image = document.createElement("img");
    image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`;
    image.alt = pokemon.name;

    imageBox.appendChild(image);

    // POKEMON-TYPE-BOX
    const typeBox = document.createElement("div");
    pokemon.type.forEach((pokeType) => {
      const type = document.createElement("span");
      type.textContent = pokeType;

      typeBox.appendChild(type);
    });

    pokeCard.appendChild(titleBox);
    pokeCard.appendChild(imageBox);
    pokeCard.appendChild(typeBox);

    return pokeCard;
  }
}
