"use strict";

//Traigo del HTML

let input = document.querySelector(".js-input");
const searchform = document.querySelector(".form_search");
let searchResultList = document.querySelector(".searchresults");
const favouriteSelector = document.querySelectorAll(".results"); //parte 3
const favouriteListOfAnimes = document.querySelector(
    ".searchresults__favourites"
);
const resetButton = document.querySelector(".js-btn-reset");
const alternativeImage =
    "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
let userInput = "";
let animeSeriesArray = [];
let favouriteSeriesArray = [];

//Empezamos con el fetch... Partes I y II
function fetchDataAnime(event) {
    event.preventDefault()
    searchResultList.innerHTML = "";

    fetch(`https://api.jikan.moe/v3/search/anime?q=${input.value}`)
        .then((response) => response.json())
        .then((dataAnime) => {
            animeSeriesArray = dataAnime.results;
            //console.log(animeSeriesArray);

            if (animeSeriesArray.length === 0) {
                searchResultList.innerHTML += `<p class="paragraph">No existe este título. Prueba con otro</p>`;
            } else
                for (let i = 0; i < animeSeriesArray.length; i++) {
                    const animeSerie = animeSeriesArray[i];
                    searchResultList.innerHTML += `
                        <article class="results" data-id="${animeSerie.mal_id}">
                            <h3 data-title="${animeSerie.title} class="searchresults__title--js" >
                                ${animeSerie.title}
                            </h3>
                            <img class="image" src="${animeSerie.image_url || alternativeImage}"/>
                        </article>
                    `;


                    //Parte III Añado Listener al article de resultados
                    const favouriteSelector = document.querySelectorAll(".results");
                    for (const fav of favouriteSelector) {
                        fav.addEventListener("click", globalFunction);
                    }
                }
        });
}

function changeColorFavourite(event) {
    //Función para cambiar el color a la serie seleccionada como favorita

    const favouriteAnime = event.currentTarget;
    favouriteAnime.classList.toggle("favourite");
    //console.log(event)
}

function handleFavourites(event) {
    //Función para poder hacer un nuevo array con los ids de las series y subirlos a favoritos

    const favouriteSeries = parseInt(event.currentTarget.dataset.id);
    let favouriteIndex = favouriteSeriesArray.findIndex( //para saber si hay coincidencia o no
        (serie) => serie.mal_id === favouriteSeries
    );

    if (favouriteIndex >= 0) {
        favouriteSeriesArray.splice(favouriteIndex, 1);
    } else {
        const searchAnimeObject = animeSeriesArray.find(
            (serie) => serie.mal_id === favouriteSeries
        );
        favouriteSeriesArray.push(searchAnimeObject);
    }
    localStorage.setItem("favourites", JSON.stringify(favouriteSeriesArray));
}

function renderFavourites() {
    //Ahora quiero pintar una lista con los favoritos.
    favouriteListOfAnimes.innerHTML = "";
    for (let i = 0; i < favouriteSeriesArray.length; i++) {
        favouriteListOfAnimes.innerHTML += `
        <article class="results">
            <h3 class= "searchresults__title">${favouriteSeriesArray[i].title}</h3>
            <img class="image" src="${favouriteSeriesArray[i].image_url}"/>
        </article>`;
    }
}
//Con esta función quiero borrar favoritos de mi lista de favoritos NO FUNCIONA: sobreescribe y no elimina y de index sale -1 por el parent.Node

function deleteFavourites() {
    //Con esta funcion quito la clase de favoritos y se va el color, pero se me sige agregando a la lista de favoritos
    for (let i = 0; i < favouriteSeriesArray; i++) {
        if (favouriteSeriesArray[i].contains("favourite")) {
            favouriteSeriesArray[i].classList.remove("favourite");
        }
    }
}
function getStorageData() {
    const seriesStoraged = JSON.parse(localStorage.getItem("favourites"));
    if (seriesStoraged !== null) {
        favouriteSeriesArray = seriesStoraged;
    }
    renderFavourites();
}
function resetAll() {
    localStorage.removeItem("favourites");
    favouriteSeriesArray = [];
    renderFavourites();
}

function globalFunction(event) {
    //Esta función es la que quiero uso en el listener "fav" para cambiar el color, mostrar el array con favoritos y pintar los favs
    handleFavourites(event);
    changeColorFavourite(event);
    renderFavourites();
    deleteFavourites();
    // removeFromFavourites(event);
}

//Listeners

searchform.addEventListener("submit", fetchDataAnime);
resetButton.addEventListener("click", resetAll);

getStorageData();
