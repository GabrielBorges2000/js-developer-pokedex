const pokeApi = {}

function convertPokeApiDetailPokemon(pokeDetail) {
  const pokemon = new Pokemon()
  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
  const [type] = types


  pokemon.id = pokeDetail.id
  pokemon.name = pokeDetail.name
  pokemon.types = types
  pokemon.type = type
  pokemon.image = pokeDetail.sprites.other.dream_world.front_default

  return pokemon
}

pokeApi.pokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 20) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.pokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails)
}
