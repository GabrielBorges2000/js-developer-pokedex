const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMore')

const maxRecord = 649
const limit = 20
let offset = 0

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit)
    .then((pokemons = []) => pokemonList.innerHTML += pokemons.map((pokemon) => `
      <li class="pokemon ${pokemon.type}">
          <span class="number">#${pokemon.id}</span>
          <span class="name">${pokemon.name}</span>

          <div class="detail">
              <ol class="types">
                ${pokemon.types.map((type) => ` <li class="type ${type}">${type}</li>`).join('')}
              </ol>

              <img src="${pokemon.image}" alt="${pokemon.name}">
          </div>
      </li>
    `).join(''))
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
  offset += limit

  const qtRecordWithNextPage = offset + limit

  if (qtRecordWithNextPage >= maxRecord) {
    const newLimit = maxRecord - offset
    loadPokemonItens(offset, newLimit)

    loadMoreButton.parentElement.removeChild(loadMoreButton)
    return
  } else {
    loadPokemonItens(offset, limit)
  }

})