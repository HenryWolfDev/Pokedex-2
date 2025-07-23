export class PokeCardRenderer {
  constructor(container) {
    this.containerElement = document.querySelector(`#${container}`);

    this.originalPokemonList = [];
    this.filteredPokemonList = [];
  }

  setPokemonLists(pokemonArray) {
    this.originalPokemonList = pokemonArray;
    this.filteredPokemonList = pokemonArray;
  }

  // #region POKECARD
  renderPokeCard(pokemon) {
    const pokeCard = document.createElement("div");
    const primaryType = pokemon.type[0];
    pokeCard.classList.add("pokemon-card", `type-${primaryType}`);

    // POKEMON-TITLE-BOX
    const titleBox = document.createElement("div");
    titleBox.classList.add("title-box");
    const name = document.createElement("span");
    name.textContent = pokemon.name;
    const id = document.createElement("span");
    id.textContent = pokemon.id;

    titleBox.appendChild(name);
    titleBox.appendChild(id);

    // POKEMON-IMAGE-BOX
    const imageBox = document.createElement("div");
    imageBox.classList.add("image-box");
    const image = document.createElement("img");
    image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`;
    image.alt = pokemon.name;

    imageBox.appendChild(image);

    // POKEMON-TYPE-BOX
    const typeBox = document.createElement("div");
    typeBox.classList.add("type-box"),
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
  // #endregion POKECARD

  renderPokemonDetailCard(pokemon) {
    const detailCard = document.createElement("div");
    const primaryType = pokemon.type[0];
    detailCard.classList.add("detail-card", `type-${primaryType}`);

    // POKEMON-TITLE-BOX
    const titleBox = document.createElement("div");
    titleBox.classList.add("title-box");
    const closeIcon = document.createElement("img");
    closeIcon.classList.add("close-image");
    closeIcon.src = `../images/close-icon.png`;
    closeIcon.alt = "Pokeball logo";
    const name = document.createElement("span");
    name.textContent = pokemon.name;
    const id = document.createElement("span");
    id.textContent = pokemon.id;

    titleBox.appendChild(closeIcon);
    titleBox.appendChild(name);
    titleBox.appendChild(id);

    // POKEMON-IMAGE-BOX
    const imageBox = document.createElement("div");
    imageBox.classList.add("image-box");
    const image = document.createElement("img");
    image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`;
    image.alt = pokemon.name;

    const pokeIconLeft = document.createElement("img");
    pokeIconLeft.classList.add("switch-image");
    pokeIconLeft.id = "switch-left";
    pokeIconLeft.src = `../images/pokeball-left.PNG`;

    const pokeIconRight = document.createElement("img");
    pokeIconRight.classList.add("switch-image");
    pokeIconRight.id = "switch-right";
    pokeIconRight.src = `../images/pokeball-right.png`;

    imageBox.appendChild(pokeIconLeft);
    imageBox.appendChild(image);
    imageBox.appendChild(pokeIconRight);

    // POKEMON-TYPE-BOX
    const typeBox = document.createElement("div");
    typeBox.classList.add("type-box"),
      pokemon.type.forEach((pokeType) => {
        const type = document.createElement("span");
        type.textContent = pokeType;

        typeBox.appendChild(type);
      });
    const captureRate = document.createElement("span");
    captureRate.textContent = `Fangrate: ${pokemon.captureRate}`;
    const happiness = document.createElement("span");
    happiness.textContent = `Zufriedenheit: ${pokemon.happiness}`;

    typeBox.appendChild(captureRate);
    typeBox.appendChild(happiness);

    // POKEMON-STATS-BOX
    const statsBox = document.createElement("div");
    statsBox.classList.add("stats-box");
    pokemon.stats.forEach((stat) => {
      const statBoxLine = document.createElement("div");
      statBoxLine.classList.add("stat-box-line");

      const statName = document.createElement("span");
      statName.classList.add("type-name");
      statName.textContent = stat.name;

      const statBarDiv = document.createElement("div");
      statBarDiv.classList.add("stat-bar-div");

      const statBar = document.createElement("span");
      statBar.classList.add("stat-bar");
      statBar.style.width = `${this.calcStatbar(stat)}%`;

      const baseStat = document.createElement("span");
      baseStat.classList.add("base-stat");
      baseStat.textContent = stat.baseStat;

      statBoxLine.appendChild(statName);
      statBarDiv.appendChild(statBar);
      statBoxLine.appendChild(statBarDiv);
      statBoxLine.appendChild(baseStat);

      statsBox.appendChild(statBoxLine);
    });

    detailCard.appendChild(titleBox);
    detailCard.appendChild(imageBox);
    detailCard.appendChild(typeBox);
    detailCard.appendChild(statsBox);

    return detailCard;
  }

  calcStatbar(stat) {
    const maxStat = 160;
    const statValue = stat.baseStat;
    const percentage = Math.min((statValue / maxStat) * 100, 100);
    return percentage;
  }
}
