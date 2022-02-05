<template>
  <div class="search">
    <input
      required="1"
      type="text"
      placeholder="e.g. 133 or eevee"
      @keyup.enter="searchPokemon"
      v-model="inputSearch"
    />
    <button type="submit" @click="searchPokemon()">
      <i class="fa fa-search"></i>
    </button>
  </div>

  <div v-if="!pokemon && !error && !loadingPokemon">
    <img alt="Vue logo" src="../assets/static.png" />
  </div>
  <div v-if="!pokemon && !error && loadingPokemon">
    <img alt="Vue logo" src="../assets/loading.gif" />
  </div>

  <div class="pokedex-container" v-if="pokemon">
    <div class="pokedex-container__pokemon-name">
      <h2>{{ pokemon.name.toUpperCase() }}</h2>
    </div>
    <div class="pokedex-container__img">
      <img :src="pokemon.sprites.front_default" alt="pokemon-image" />
    </div>
    <h3>N° {{ pokemon.id }}</h3>

    <div class="pokedex-container__pokemon-info">
      <div
        class="pokedex-container__pokemon-info__attributes"
        v-for="(ability, i) in pokemon.abilities"
        :key="i"
      >
        <span> {{ ability.replace(/(^\w)|([-\s]\w)/g, match => match.toUpperCase()) }}</span>
      </div>

      <div class="pokedex-container__pokemon-info__abilities">
        <div class="attribute__item">
          <div class="attribute_name">Height</div>
          <div class="attribute_value">{{ pokemon.height }} dc</div>
        </div>
        <div class="attribute__item">
          <div class="attribute_name">Weight</div>
          <div class="attribute_value">{{ pokemon.weight }} hc</div>
        </div>

        <div class="see-evolutions">
          <a href="#" @click="searchEvolutions()">Show Evolutions</a>
        </div>
      </div>
    </div>
    <div class="pokedex-container__evolutions" v-if="pokemon.evolutions">
      <h2>Evolutions</h2>

      <h3 v-if="pokemon.evolutions.length == 0">
        This pokemón doesn't have evolutions
      </h3>
      <div v-if="pokemon.evolutions.length > 0">
        <div
          class="pokedex-container__pokemon-info__attributes"
          v-for="(evolution, i) in pokemon.evolutions"
          :key="i"
        >
          <span> {{ evolution.toUpperCase() }}</span>
        </div>
      </div>
    </div>
  </div>

  <h2 v-if="error">{{ error }}</h2>
</template>

<script>
import pokedexServices from "../services/pokedexServices.js";
export default {
  name: "Pokedex",
  props: {
    msg: String,
  },
  data() {
    return {
      inputSearch: null,
      pokemon: null,
      error: null,
      loadingPokemon: false,
    };
  },
  methods: {
    recievePokemon(response) {
      if (response.success) this.pokemon = response.data;
      else if (response.status == 404) this.error = "Pokemón not found :(";
      else this.error = "Error al cargar los datos";
      this.loadingPokemon = false;
    },

    async getPokemonById(id) {
      await pokedexServices
        .getPokemonById(id)
        .then((response) => this.recievePokemon(response));
    },
    async getPokemonByName(name) {
      await pokedexServices
        .getPokemonByName(name)
        .then((response) => this.recievePokemon(response));
    },
    searchPokemon() {
      this.pokemon = null;
      this.error = null;
      this.loadingPokemon = true;
      if (isNaN(this.inputSearch)) this.getPokemonByName(this.inputSearch);
      else this.getPokemonById(this.inputSearch);
    },
    async getPokemonEvolutionsById(id) {
      await pokedexServices.getPokemonEvolutionsById(id).then((response) => {
        if (response.success) {
          this.pokemon.evolutions = response.data;
        } else this.error = "Error al obtener los datos";
      });
    },
    searchEvolutions() {
      this.getPokemonEvolutionsById(this.pokemon.id);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pokedex-container {
  display: flex;
  /* border: 1px black solid; */
  width: 40%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  background-color: white;

  -webkit-box-shadow: 2px 5px 15px 5px rgba(79, 79, 79, 0.73);
  box-shadow: 2px 5px 15px 5px rgba(79, 79, 79, 0.73);
  border-radius: 10px;
}

.pokedex-container__img {
  border-radius: 50%;
  display: flex;
  height: 350px;
  width: 350px;
  align-items: center;
  justify-content: center;
}

.pokedex-container__img > img {
  height: 350px;
  border-radius: 50%;
  border: solid black 5px;
}

.pokedex-container__pokemon-info {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.pokedex-container__pokemon-info__attributes {
  width: 90%;

  border: gray dotted 4px;
  margin-top: 1rem;

  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pokedex-container__pokemon-info__attributes > span {
  color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
  width: inherit;
  height: 2rem;
}

.pokedex-container__pokemon-info__abilities {
  width: 90%;
  display: flex;
  flex-direction: column;
}

.attribute__item {
  padding-top: 1rem;
  padding-bottom: 1rem;
  width: inherit;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
}

.attribute__item > div {
  width: 50%;
}

.attribute_name {
  font-weight: bold;
}
.attribute_value {
  text-align: right;
}

.pokedex-container__evolutions {
  width: 90%;
}

.see-evolutions {
  align-self: flex-end;
}

/*  search */
.search {
  display: flex;
  margin: auto;
  max-width: 40%;
}

.search input[type="text"] {
  padding: 10px;
  font-size: 17px;
  border: 1px solid grey;
  float: left;
  width: 80%;
  background: white;
  border-radius: 10px;
  margin-right: 5px;
}

.search button {
  float: left;
  width: 20%;
  padding: 10px;
  background: #2196f3;
  color: white;
  font-size: 17px;
  border: 1px solid grey;
  border-left: none;
  cursor: pointer;
  border-radius: 10px;
  align-self: flex-end;
}

.search button:hover {
  background: #0b7dda;
}
</style>
