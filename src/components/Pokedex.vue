<template>
  <h1>WENAS</h1>
  <input @keyup.enter="searchPokemon" type="text" v-model="inputSearch" />
  <button @click="searchPokemon()">Search</button>
  <span v-if="pokemon">
    <h2>{{ pokemon.name }}</h2>
    <button @click="searchEvolutions()">Show Evolutions</button>
  </span>
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
    };
  },
  methods: {
    recievePokemon(response) {
      if (response.success) this.pokemon = response.data;
      else if (response.status == 404) this.error = "Pokemón not found :(";
      else this.error = "puto xd";
    },

    async getPokemonById(id) {
      this.pokemon = null;
      this.error = null;
      await pokedexServices
        .getPokemonById(id)
        .then((response) => this.recievePokemon(response));
    },
    async getPokemonByName(name) {
      this.pokemon = null;
      this.error = null;
      await pokedexServices
        .getPokemonByName(name)
        .then((response) => this.recievePokemon(response));
    },
    searchPokemon() {
      this.pokemon = null;
      this.error = null;
      if (isNaN(this.inputSearch)) this.getPokemonByName(this.inputSearch);
      else this.getPokemonById(this.inputSearch);
    },
    async getPokemonEvolutionsById(id) {
      await pokedexServices.getPokemonEvolutionsById(id).then((response) => {
        if (response.success) {
          this.pokemon.evolutions = response.data;
          console.log(response.data);
        } else if (response.status == 404) this.error = "Pokemón not found :(";
        else this.error = "puto xd";
      });
    },
    searchEvolutions() {
      this.getPokemonEvolutionsById(this.inputSearch);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
