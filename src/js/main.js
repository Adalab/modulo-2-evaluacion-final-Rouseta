'use strict';

//Traigo del HTML

let input = document.querySelector('.js-input');
const searchButton = document.querySelector('.js-searchButton');
let searchResultList = document.querySelector('.searchresults');
let favouriteSelector = document.querySelectorAll('.results') //parte 3
//Variables globales
const alternativeImage = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
let userInput = '';
let animeSeriesArray = [];





//Empezamos con el fetch... Partes I y II
function fetchDataAnime() {
    searchResultList.innerHTML = "";

    fetch(`https://api.jikan.moe/v3/search/anime?q=${input.value}`)

        .then((response) => response.json())
        .then((dataAnime) => {
            const animeSeriesArray = dataAnime.results;
            console.log(animeSeriesArray)


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


                }

        })

}


function getUserInput() {
    userInput = input.value;
    console.log("User input:" + userInput);
}



//Listeners

searchButton.addEventListener('click', fetchDataAnime);









