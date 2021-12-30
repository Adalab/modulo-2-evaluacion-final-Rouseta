'use strict';

//Traigo del HTML

let input = document.querySelector('.js-input');
const searchButton = document.querySelector('.js-searchButton');
let searchResultList = document.querySelector('.searchresults');
const favouriteSelector = document.querySelectorAll('.results') //parte 3
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
            const animeSeriesArray = dataAnime.results;
            //console.log(animeSeriesArray)


            if (animeSeriesArray.length === 0) {
                alert("No existe esta serie");
            } else
                for (let i = 0; i < animeSeriesArray.length; i++) {
                    //No se me pinta la foto alternativa
                    const animeSerie = animeSeriesArray[i];
                    if (animeSerie.img_url === null) {
                        searchResultList.innerHTML += `<article class="results"> <p><h3>${animeSerie.title}</h3></p><img class="image" src="${alternativeImage}"/></article>`

                    } else {

                        searchResultList.innerHTML += `<article class="results"> <p><h3>${animeSerie.title}</h3></p><img class="image" src="${animeSerie.image_url}"/></article>`
                    }
                    //Añado Listener al article de reultados
                    const favouriteSelector = document.querySelectorAll('.results')

                    for (const fav of favouriteSelector) {
                        fav.addEventListener('click', handleFavourites)
                    }


                }



        })
    //Función manejadora los favoritos
    function handleFavourites(event) {
        //console.log('holi');
        const favouriteAnime = event.currentTarget;
        console.log(favouriteAnime);
        favouriteAnime.classList.toggle('favourite');

    }


}

//Listeners

searchButton.addEventListener('click', fetchDataAnime);














