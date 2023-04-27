


//  "https://pokeapi.co/api/v2/pokemon/" + inputValue

const form = document.querySelector ("form")
const input = form.querySelector("input")
const pokemonError = document.querySelector(".pokemon_error")
const pokemonResponseBlock = document.querySelector (".pokemon_response")
const loading = document.querySelector (".loading")
const url = "https://pokeapi.co/api/v2/pokemon/"
const abilityUrl = "https://pokeapi.co/api/v2/ability/"

export const searchPokemonControler = () => {
    form.addEventListener("submit", async (ev) => {
        ev.preventDefault()
        resetErrors()
        const inputValue = input.value
        const inputLength = inputValue.length

        if (inputLength >= 1){
           setLoadingOn()
           const fetchUrl = url + inputValue
           const pokemonResponse = await fetch(fetchUrl).then(res => res.json() )
           renderPokemon(pokemonResponse)
        } else {
            renderError()
        }
        setLoadingOff()
        form.reset()
    })
}

const resetErrors = () => {
    pokemonError.innerHTML = ""
}

const renderError = () => {
    pokemonError.innerHTML = "por favor mete un puto pokemon"
}

const renderPokemon = (pokemon) => {
    pokemonResponseBlock.innerHTML = `
    <div class="pokemon_response_name">${pokemon.species.name}</div>
    <div class="pokemon_response_picture">
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.species.name
    }" width=300" height=300" >
    </div>
    <div class="pokemon_response_abilities">
     ${pokemon.abilities.reduce((acc, ability) => acc + `
      <div class= "pokemon_response_ability">${ability.ability.name}</div>
     `, "")}
    </div>
    `
    initAbilitiesEvent()
    initPictureEvent()
}

const initPictureEvent = () => {
  const picture = pokemonResponseBlock.querySelector("img")
  picture.addEventListener("load" ,() => {
    console.log("imagen cargada")
  })
}

const initAbilitiesEvent = () => {
  const abilitiesBlocks = document.querySelectorAll (".pokemon_response_ability")

  abilitiesBlocks.forEach(abilitiesBlock => {
    abilitiesBlock.addEventListener("click", async (ev) => {
        setLoadingOn()
        const abilityName = abilitiesBlock.innerHTML
        const abilityResponse = await fetch(abilityUrl + abilityName).then((res) => res.json ())
        console.log(abilityResponse);
        setLoadingOff()
    } )
  })
  
}

const setLoadingOn = () => {
 loading.classList.add("opened")
}

const setLoadingOff = () => {
    loading.classList.remove("opened")
   }


   //

   