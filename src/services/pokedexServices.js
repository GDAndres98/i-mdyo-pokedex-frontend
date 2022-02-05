import axios from "axios";

const POKEMON_API = 'https://techtest-modyo-pokedex.herokuapp.com/';

class pokedexServices {

    /**
     * @param {number} id Pokemon id
     * @returns {Object} Pokemon object
     */
    async getPokemonById(id) {
        try {
            return await axios.get(`${POKEMON_API}pokemon/${id}`)
                .then(response => {
                    response.success = true
                    return response
                })
        } catch (error) {
            error.response.success = false
            return error.response
        }
    }

    /**
     * @param {String} name Pokemon name
     * @returns {Object} Pokemon object
     */
    async getPokemonByName(name) {
        try {
            return await axios.get(`${POKEMON_API}pokemon/name/${name}`)
                .then(response => {
                    response.success = true
                    return response
                })
        } catch (error) {
            error.response.success = false
            return error.response
        }
    }

    /**
     * @param {number} id Pokemon id
     * @returns {Object} Evolutions tree object
     */
    async getPokemonEvolutionsById(id) {
        try {
            return await axios.get(`${POKEMON_API}pokemon/${id}/evolutions`)
                .then(response => {
                    response.success = true
                    return response
                })
        } catch (error) {
            error.response.success = false
            return error.response
        }
    }


}

export default new pokedexServices()