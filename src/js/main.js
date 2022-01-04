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

    fetch(`https://api.jikan.moe/v3/search/anime?q=${input.value}`)
        .then((response) => response.json())
        .then((dataAnime) => {
            animeSeriesArray = dataAnime.results;

            renderResults();
        });
}

//Funciones

function renderResults() {
    //Función que pinta los resultados de la búsqueda
    searchResultList.innerHTML = "";

    if (animeSeriesArray.length === 0) {
        searchResultList.innerHTML += `<p class="paragraph">No existe este título. Prueba con otro</p>`;
    } else {
        for (let i = 0; i < animeSeriesArray.length; i++) {
            //Recorro el array
            const animeSerie = animeSeriesArray[i];

            //Esto se hace para ver si está o no está en mis favoritos guardados, se recorre el array de favouriteSeriesArray
            let favouriteIndex = favouriteSeriesArray.findIndex(
                (serie) => serie.mal_id === animeSerie.mal_id
            );

            // Si están  se  pinta en la lista de resultados, el resultado con la bubble( que es la clase .favourite)
            if (favouriteIndex >= 0) {
                searchResultList.innerHTML += `
                <article class="results favourite" data-id="${animeSerie.mal_id
                    }">
                    <h3 data-title="${animeSerie.title
                    } class="searchresults__title--js" >
                        ${animeSerie.title}
                    </h3>
                    <img class="image" src="${animeSerie.image_url || alternativeImage
                    }"/>
                    
                  
                </article>
            `;
            }
            //Si no están, se pinta la lista "normal" sin clase porque no han sido marcadas como favoritas
            else {
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
            }
        }

        // Añado Listener al article de resultados dentro de la función
        const favouriteSelector = document.querySelectorAll(".results");
        for (const fav of favouriteSelector) {
            fav.addEventListener("click", globalFunction);
        }
    }
}

function changeColorFavourite(event) {
    //Función para cambiar el color a la serie seleccionada como favorita

    const favouriteAnime = event.currentTarget;
    favouriteAnime.classList.toggle("favourite");
}

function handleFavourites(event) {
    //Función para poder hacer un nuevo array con los ids de las series y subirlos a favoritos
    //Hacemos findIndex para ver si la serie marcada con el event está ya en mi array de favoritos (favouriteSeriesArray)

    const favouriteSeries = parseInt(event.currentTarget.dataset.id);
    let favouriteIndex = favouriteSeriesArray.findIndex(
        (serie) => serie.mal_id === favouriteSeries
    );

    if (favouriteIndex >= 0) {
        //Si coincide que el elemento clickado está en el array, entonces lo corto
        favouriteSeriesArray.splice(favouriteIndex, 1);
    } else {
        //Si no coincide, es que no está guardado en mi array y lo quiero guardar con push. Ahora ahago un find porque necesito buscar el objeto para pintarlo
        const searchAnimeObject = animeSeriesArray.find(
            (serie) => serie.mal_id === favouriteSeries
        );
        favouriteSeriesArray.push(searchAnimeObject);
    }
    //Guardo mis favoritos en el almacenamiento local
    saveData();
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
            <button class="deleteOneBtn"data-id="${favouriteSeriesArray[i].mal_id}">Quitar</button>
        </div>
        `;
    }

    //Listener al botón x que borra el favorito seleccionado
    const xButtons = document.querySelectorAll(".deleteOneBtn");
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
    //Recorro nuevamente el array para buscar si está o no está la serie que quiero borrar, sobre la que se ha hecho click
    const deletedSeries = parseInt(event.currentTarget.dataset.id);
    let deletedIndex = favouriteSeriesArray.findIndex(
        (deleted) => deleted.mal_id === deletedSeries
    );

    if (deletedIndex >= 0) {
        //Si la serie en la que hago click está en el array, entonces esa es la que quiero borrar y la corto de la lista
        favouriteSeriesArray.splice(deletedIndex, 1);
    }

    //Llamo a la función saveData (localStorage) para actualizar los datos de almacenamiento
    saveData();
    //Llamo a la función render Favourites para pintar la lista  actualizada
    renderFavourites();
    //LLamo a la función de renderResults para pintar la lsita de resultados actualizada (para que se borre la bubble)
    renderResults();
}

function globalFunction(event) {
    //Esta función es la que quiero uso en el listener "fav" para cambiar el color, mostrar el array con favoritos y pintar los favs
    handleFavourites(event);
    changeColorFavourite(event);
    renderFavourites();
    renderResults();
    deleteFavourites();
}
function saveData() {
    localStorage.setItem("favourites", JSON.stringify(favouriteSeriesArray));
}

//Listeners

searchForm.addEventListener("submit", fetchDataAnime);
resetButton.addEventListener("click", resetAll);

getStorageData();
