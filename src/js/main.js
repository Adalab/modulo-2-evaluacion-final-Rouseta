"use strict";

//Traigo del HTML. Variables globales

let input = document.querySelector(".js-input");
const searchForm = document.querySelector(".form_search");
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

//Empezamos con el fetch
function fetchDataAnime(event) {
    event.preventDefault();
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
                            <h3 data-title="${animeSerie.title
                        } class="searchresults__title--js" >
                                ${animeSerie.title}
                            </h3>
                            <img class="image" src="${animeSerie.image_url || alternativeImage
                        }"/>
                            
                          
                        </article>
                    `;

                    // Añado Listener al article de resultados
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
}

function handleFavourites(event) {
    //Función para poder hacer un nuevo array con los ids de las series y subirlos a favoritos

    const favouriteSeries = parseInt(event.currentTarget.dataset.id);
    let favouriteIndex = favouriteSeriesArray.findIndex(
        //para encontart mis favoritos en el  array de resultados y subir mis favoritos a un nuevo array
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
    //Guardo mis favoritos en el almacenamiento local
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
        </article> 
        <div>
            <button class="testing"data-id="${favouriteSeriesArray[i].mal_id}">X</button>
        </div>
        `;
    }
    //Listener al botón x
    const xButtons = document.querySelectorAll(".testing");
    for (const xButton of xButtons) {
        xButton.addEventListener("click", resetOne);
    }
}

function deleteFavourites() {
    //Con esta función quito la clase de favoritos y se intercambia el color del título y fondo.
    for (let i = 0; i < favouriteSeriesArray; i++) {
        if (favouriteSeriesArray[i].contains("favourite")) {
            favouriteSeriesArray[i].classList.remove("favourite");
        }
    }
}
function getStorageData() {
    //Recupero los datos guardados
    const seriesStoraged = JSON.parse(localStorage.getItem("favourites"));
    if (seriesStoraged !== null) {
        favouriteSeriesArray = seriesStoraged;
    }
    renderFavourites();
}
function resetAll() {
    //Borrar todos los favoritos
    localStorage.removeItem("favourites");
    favouriteSeriesArray = [];
    renderFavourites();
}
function resetOne(event) {
    //Borrar un favorito

    const deletedSeries = parseInt(event.currentTarget.dataset.id);
    let deletedIndex = favouriteSeriesArray.findIndex(

        (deleted) => deleted.mal_id === deletedSeries
    );
    if (deletedIndex >= 0) {
        favouriteSeriesArray.splice(deletedIndex);
    }

    localStorage.setItem("favourites", JSON.stringify(favouriteSeriesArray));

    renderFavourites();
}



function globalFunction(event) {
    //Esta función es la que quiero uso en el listener "fav" para cambiar el color, mostrar el array con favoritos y pintar los favs
    handleFavourites(event);
    changeColorFavourite(event);
    renderFavourites();
    deleteFavourites();
}

//Listeners

searchForm.addEventListener("submit", fetchDataAnime);
resetButton.addEventListener("click", resetAll);

getStorageData();

