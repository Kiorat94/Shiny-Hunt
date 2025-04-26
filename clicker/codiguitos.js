const listaPokemon = [
    "../Pokedex/Pokemon/Charmander.gif",
    "../Pokedex/Pokemon/Charmeleon.gif",
    "../Pokedex/Pokemon/Charizard.gif",
    "../Pokedex/Pokemon/Articuno.gif",
    "../Pokedex/Pokemon/Zapdos.gif",
    "../Pokedex/Pokemon/Moltres.gif",
    "../Pokedex/Pokemon/Mewtwo.gif",
    "../Pokedex/Pokemon/Mew.gif"
    // aquí puedes añadir más pokemons
];

let vida = 0;
let contador = 0;
let derrotados = [];
let pokemonActual = "";

const pokemonImg = document.getElementById('pokemon-img');
const vidaText = document.getElementById('vida');
const contadorTotal = document.getElementById('contador-total');
const derrotadosDiv = document.getElementById('derrotados');

// Cargar datos si existen
window.onload = () => {
    const clicksGuardados = localStorage.getItem("clicksTotales");
    const derrotadosGuardados = JSON.parse(localStorage.getItem("pokemonsDerrotados"));
    const vidaGuardada = localStorage.getItem("vidaActual");
    const pokemonGuardado = localStorage.getItem("pokemonActual");

    if (clicksGuardados) {
        contador = parseInt(clicksGuardados);
        contadorTotal.textContent = `Clicks Totales: ${contador}`;
    }

    if (derrotadosGuardados) {
        derrotados = derrotadosGuardados;
        derrotados.forEach(poke => agregarDerrotado(poke));
    }

    if (vidaGuardada && pokemonGuardado) {
        vida = parseInt(vidaGuardada);
        pokemonActual = pokemonGuardado;
        pokemonImg.src = pokemonActual;
        vidaText.textContent = `Vida: ${vida}`;
    } else {
        nuevoPokemon();
    }
};

// Botón de ataque
document.getElementById('click-button').addEventListener('click', () => {
    vida--;
    contador++;
    actualizar();

    if (vida <= 0) {
        derrotados.push(pokemonActual);
        agregarDerrotado(pokemonActual);
        limpiarPokemonActual();
        nuevoPokemon();
    }
});

// Función para actualizar contador y vida
function actualizar() {
    vidaText.textContent = `Vida: ${vida}`;
    contadorTotal.textContent = `Clicks Totales: ${contador}`;
    localStorage.setItem("clicksTotales", contador);
    localStorage.setItem("pokemonsDerrotados", JSON.stringify(derrotados));
    localStorage.setItem("vidaActual", vida);
    localStorage.setItem("pokemonActual", pokemonActual);
}

// Función para agregar Pokémon derrotado
function agregarDerrotado(imgSrc) {
    const img = document.createElement('img');
    img.src = imgSrc;
    img.style.width = "50px";  // Ajusta tamaño si quieres
    img.style.margin = "5px";
    derrotadosDiv.appendChild(img);
}

// Función para seleccionar nuevo Pokémon
function nuevoPokemon() {
    const indice = Math.floor(Math.random() * listaPokemon.length);
    pokemonActual = listaPokemon[indice];
    vida = Math.floor(Math.random() * 91) + 10; // Vida entre 10 y 100
    pokemonImg.src = pokemonActual;
    vidaText.textContent = `Vida: ${vida}`;

    localStorage.setItem("vidaActual", vida);
    localStorage.setItem("pokemonActual", pokemonActual);
}

// Función para limpiar datos del Pokémon actual al derrotarlo
function limpiarPokemonActual() {
    localStorage.removeItem("vidaActual");
    localStorage.removeItem("pokemonActual");
}
