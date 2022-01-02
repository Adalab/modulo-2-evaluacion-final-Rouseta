'use strict';

//Traigo del HTML

let input = document.querySelector('.js-input');
const searchButton = document.querySelector('.js-searchButton');
let searchResultList = document.querySelector('.searchresults');
const favouriteSelector = document.querySelectorAll('.results') //parte 3
const favouriteListOfAnimes = document.querySelector('.searchresults__favourites'); //aside de parte 3 para pintar favoritos
//Variables globales
const alternativeImage = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
let userInput = '';
let animeSeriesArray = [];
let favouriteSeriesArray = [];






//Empezamos con el fetch... Partes I y II
function fetchDataAnime() {
    searchResultList.innerHTML = "";

    fetch(`https://api.jikan.moe/v3/search/anime?q=${input.value}`)

        .then((response) => response.json())
        .then((dataAnime) => {
            animeSeriesArray = dataAnime.results;
            //console.log(animeSeriesArray);




            if (animeSeriesArray.length === 0) {
                searchResultList.innerHTML += `<p class="paragraph">No existe este título. Prueba con otro</p>`
            } else
                for (let i = 0; i < animeSeriesArray.length; i++) {
                    //No se me pinta la foto alternativa
                    const animeSerie = animeSeriesArray[i];


                    if (animeSerie.img_url === null) {
                        searchResultList.innerHTML += `<article class="results" data-id="${animeSerie.mal_id}"> <p><h3 data-title="${animeSerie.title}class="searchresults__title--js" >${animeSerie.title}</h3></p><img class="image" src="${alternativeImage}"/></article>`

                    } else {

                        searchResultList.innerHTML += `<article class="results" data-id="${animeSerie.mal_id}"> <p><h3 data-title="${animeSerie.title}" class= "searchresults__title--js">${animeSerie.title}</h3></p><img class="image" src="${animeSerie.image_url}"/></article>`
                    }




                    //Parte III Añado Listener al article de resultados

                    const favouriteSelector = document.querySelectorAll('.results')

                    for (const fav of favouriteSelector) {
                        fav.addEventListener('click', globalFunction)
                    }
                }


        }
        )

}


function changeColorFavourite(event) { //Función para cambiar el color a la serie seleccionada como favorita

    const favouriteAnime = event.currentTarget;
    favouriteAnime.classList.toggle('favourite')
    //console.log(event)

}
function handleFavourites(event) { //Función para poder hacer un nuevo array con los ids de las series. 

    const favouriteSeries = parseInt(event.currentTarget.dataset.id); //
    let favourites = animeSeriesArray.find((serie) => serie.mal_id === favouriteSeries)
    //Aquí hago un push para subirme los datos de let favourites (no sé si hacía falta)
    favouriteSeriesArray.push(favourites);
    //console.log(favouriteSeriesArray);
}
function renderFavourites() {
    //Ahora quiero pintar una lista con los favoritos. Que Dios reparta suerte! NO SALE TODAVÍA
    favouriteListOfAnimes.innerHTML = "";
    for (let i = 0; i < favouriteSeriesArray.length; i++) {

        favouriteListOfAnimes.innerHTML += `<article class="results" > <p><h3 class= "searchresults__title">${favouriteSeriesArray[i].title}</h3></p><img class="image" src="${favouriteSeriesArray[i].image_url}"/></article>`



    }
}
function deleteFavourites() { //Con esta funcion quito la clase de favoritos y se va el color, pero se me sige agregando a la lista de favoritos
    for (let i = 0; i < favouriteSeriesArray; i++) {


        if (favouriteSeriesArray[i].contains('favourite')) {
            favouriteSeriesArray[i].classList.remove('favourite');

        }
    }
}






function globalFunction(event) { //Esta función es la que quiero uso en el listener "fav" para cambiar el color, mostrar el array con favoritos y pintar los favs

    handleFavourites(event);
    changeColorFavourite(event);
    renderFavourites()
    deleteFavourites()


}










//Listeners

searchButton.addEventListener('click', fetchDataAnime);














