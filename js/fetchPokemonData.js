export class FetchPokemonData {
  static speciesUrl = "https://pokeapi.co/api/v2/pokemon-species/";
  static baseURL = "https://pokeapi.co/api/v2/pokemon/";

  // #region SPECIES-METHODS
  static async getSpeciesInfos(id) {
    const response = await fetch(`${this.speciesUrl}${id}`);
    const data = await response.json();

    // POKEMON-INFO-DATA
    const idNumber = data.id;
    const name = data.names.find((name) => name.language.name === "de");
    const germanName = name.name;
    const captureRate = data.capture_rate;
    const happiness = data.base_happiness;

    // POKEMON-OBJECT-CREATION
    return {
      id: idNumber,
      name: germanName,
      captureRate: captureRate,
      happiness: happiness,
    };
  }

  static async getDescriptionText(data) {
    const text = data.flavor_text_entries.find(
      (text) => text.language.name === "de"
    );
    const formatedText = text.flavor_text.replace(/(\r\n|\n|\r)/g, " ");
    return formatedText;
  }
  // #endregion SPECIES-METHODS

  // #region BASE-METHODS
  static async getBaseInfos(id) {
    const response = await fetch(`${this.baseURL}${id}`);
    const data = await response.json();

    // POKEMON-INFO-DATA
    const stats = await this.getStats(data);
    const type = await this.getTypes(data);
    const weight = data.weight;

    // POKEMON-OBJECT-CREATION
    return {
      stats: stats,
      type: type,
      weight: weight,
    };
  }
  static getStats(data) {
    // s.state.name wird als Schlüssel verwendet um auf die Übersetzungen in statsTrans zuzugreifen
    const statsTrans = {
      hp: "KP",
      attack: "Angriff",
      defense: "Verteidigung",
      "special-attack": "Spezial-Angriff",
      "special-defense": "Spezial-Verteidigung",
      speed: "Initiative",
    };
    // stats ist ein neu erstelltes Array aus data.stats
    const stats = data.stats.map((s) => ({
      name: statsTrans[s.stat.name],
      baseStat: s.base_stat,
    }));

    return stats;
  }

  static async getTypes(data) {
    const typeUrl = data.types.map((type) => type.type.url);
    const type = [];
    for (const tUrl of typeUrl) {
      const response = await fetch(tUrl);
      const data = await response.json();

      const germanTypeName = data.names.find(
        (type) => type.language.name === "de"
      );
      type.push(germanTypeName.name);
    }
    return type;
  }
  // #endregion BASE-METHODS

  static async createPokemonArray(id) {
    const speciesInfos = await this.getSpeciesInfos(id);
    const baseInfos = await this.getBaseInfos(id);

    const pokemon = [{ ...speciesInfos, ...baseInfos }];
    return pokemon;
  }

  static async loadPokemon(offset = 1, limit = 20) {
    const pokemonList = [];

    for (let id = offset; id < offset + limit; id++) {
      let pokemon = await this.createPokemonArray(id);
      pokemonList.push(...pokemon);
    }
    return pokemonList;
  }
}
