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
            const animeSeriesArray = dataAnime.results;
            //console.log(animeSeriesArray)


            if (animeSeriesArray.length === 0) {
                alert("No existe esta serie");
            } else
                for (let i = 0; i < animeSeriesArray.length; i++) {
                    //No se me pinta la foto alternativa
                    const animeSerie = animeSeriesArray[i];
                    if (animeSerie.img_url === null) {
                        searchResultList.innerHTML += `<article class="results id=${animeSerie.id}> <p><h3>${animeSerie.title}</h3></p><img class="image" src="${alternativeImage}"/></article>`

                    } else {

                        searchResultList.innerHTML += `<article class="results" id=${animeSerie.id}> <p><h3>${animeSerie.title}</h3></p><img class="image" src="${animeSerie.image_url}"/></article>`
                    }
                    //Parte III Añado Listener al article de resultados

                    const favouriteSelector = document.querySelectorAll('.results')

                    for (const fav of favouriteSelector) {
                        fav.addEventListener('click', global) //la función que quiero usar es global, pero no funciona
                    }

                    ///Parte III. Pintar favoritos

                    /*for (let i = 0; i < favouriteSeriesArray.length; i++) {
                        const favouriteSeries = favouriteSeriesArray[i]
                        favouriteListOfAnimes.innerHTML += `<article class="results" id=${animeSerie.mal_id}> <p><h3>${favouriteSeries.title}</h3></p><img class="image" src="${favouriteSeries.image_url}"/></article>`



                    }*/





                }



        })
    //Parte III. Función manejadora  de favoritos
    function handleFavourites(event) { //Función para poder hacer un nuevo array con los ids de las series. FUNCIONA

        const favouriteAnime = event.currentTarget.id;
        console.log(favouriteAnime);


    }
    function changeColorFavourite(event) { //Función para cambiar el color al favorito FUNCIONA

        const favouriteAnime = event.currentTarget;
        favouriteAnime.classList.toggle('favourite')

    }
    function global() { //Esta función es la que quiero usar en el listener, pero las dos funcionas juntas dan error en el listener.NO FUNCIONA

        handleFavourites();
        changeColorFavourite();

    }




    //Añado las series seleccionadas al array vacío que he creado
    /*if (favouriteAnime.classList.contains('favourite')) {
        favouriteSeriesArray.push(favouriteAnime);
        console.log(favouriteSeriesArray);
    }*/


}





//Listeners

searchButton.addEventListener('click', fetchDataAnime);














