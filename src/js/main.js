'use strict';

//Traigo del HTML

let input = document.querySelector('.js-input');
const searchButton = document.querySelector('.js-searchButton');
let searchResultList = document.querySelector('.searchresults');
//Variables globales
let userInput = '';
let animeSeriesArray = [];




//Empezamos con el fetch...
function fetchDataAnime() {
    searchResultList.innerHTML = "";

    fetch(`https://api.jikan.moe/v3/search/anime?q=${input.value}`)

        .then((response) => response.json())
        .then((dataAnime) => {
            const animeSeriesArray = dataAnime.results;
            console.log(animeSeriesArray)
            if (animeSeriesArray.length === 0) {
                alert("No hay  imaégenes para este serie");
            } else
                for (let i = 0; i < animeSeriesArray.length; i++) {
                    const animeSerie = animeSeriesArray[i];
                    searchResultList.innerHTML += `<article class="result"> <p>${animeSerie.title}</p><img src="${animeSerie.image_url}"/></article>`



                }



        })
}


function getUserInput() {
    userInput = input.value;
    console.log("User input:" + userInput);
}



//Listener

searchButton.addEventListener('click', fetchDataAnime);


