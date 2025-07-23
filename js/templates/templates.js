export const Templates = {
  // #region POKE-CARD
  createPokeCard(pokemon) {
    const pokeCard = document.createElement("div");
    pokeCard.classList.add("pokemon-card", `type-${pokemon.type[0]}`);

    const titleBox = document.createElement("div");
    titleBox.classList.add("title-box");

    const name = document.createElement("span");
    name.textContent = pokemon.name;

    const id = document.createElement("span");
    id.textContent = pokemon.id;

    titleBox.appendChild(name);
    titleBox.appendChild(id);

    const imageBox = document.createElement("div");
    imageBox.classList.add("image-box");

    const image = document.createElement("img");
    image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`;
    image.alt = pokemon.name;

    imageBox.appendChild(image);

    const typeBox = document.createElement("div");
    typeBox.classList.add("type-box");

    pokemon.type.forEach((type) => {
      const span = document.createElement("span");
      span.textContent = type;
      typeBox.appendChild(span);
    });

    pokeCard.appendChild(titleBox);
    pokeCard.appendChild(imageBox);
    pokeCard.appendChild(typeBox);

    return pokeCard;
  },
  // #endregion POKE-CARD

  // #region POKEMON-DETAIL-CARD
  createPokemonDetailCard(pokemon, statbarCallback) {
    const detailCard = document.createElement("div");
    detailCard.classList.add("detail-card", `type-${pokemon.type[0]}`);

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

    const imageBox = document.createElement("div");
    imageBox.classList.add("image-box");

    const pokeIconLeft = document.createElement("img");
    pokeIconLeft.classList.add("switch-image");
    pokeIconLeft.id = "switch-left";
    pokeIconLeft.src = `../images/pokeball-left.PNG`;

    const image = document.createElement("img");
    image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`;
    image.alt = pokemon.name;

    const pokeIconRight = document.createElement("img");
    pokeIconRight.classList.add("switch-image");
    pokeIconRight.id = "switch-right";
    pokeIconRight.src = `../images/pokeball-right.png`;

    imageBox.appendChild(pokeIconLeft);
    imageBox.appendChild(image);
    imageBox.appendChild(pokeIconRight);

    const typeBox = document.createElement("div");
    typeBox.classList.add("type-box");

    pokemon.type.forEach((type) => {
      const span = document.createElement("span");
      span.textContent = type;
      typeBox.appendChild(span);
    });

    const captureRate = document.createElement("span");
    captureRate.textContent = `Fangrate: ${pokemon.captureRate}`;

    const happiness = document.createElement("span");
    happiness.textContent = `Zufriedenheit: ${pokemon.happiness}`;

    typeBox.appendChild(captureRate);
    typeBox.appendChild(happiness);

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
      statBar.style.width = `${statbarCallback(stat)}%`;

      const baseStat = document.createElement("span");
      baseStat.classList.add("base-stat");
      baseStat.textContent = stat.baseStat;

      statBarDiv.appendChild(statBar);
      statBoxLine.appendChild(statName);
      statBoxLine.appendChild(statBarDiv);
      statBoxLine.appendChild(baseStat);

      statsBox.appendChild(statBoxLine);
    });

    detailCard.appendChild(titleBox);
    detailCard.appendChild(imageBox);
    detailCard.appendChild(typeBox);
    detailCard.appendChild(statsBox);

    return detailCard;
  },
  // #endregion POKEMON-DETAIL-CARD
};
