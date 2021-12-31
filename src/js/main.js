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
                        searchResultList.innerHTML += `<article class="results data-id="${animeSerie.mal_id}"> <p><h3data-title="${animeSerie.title}" >${animeSerie.title}</h3></p><img class="image" src="${alternativeImage}"/></article>`

                    } else {

                        searchResultList.innerHTML += `<article class="results" data-id="${animeSerie.mal_id}"> <p><h3 data-title="${animeSerie.title}">${animeSerie.title}</h3></p><img class="image" src="${animeSerie.image_url}"/></article>`
                    }




                    //Parte III Añado Listener al article de resultados

                    const favouriteSelector = document.querySelectorAll('.results')

                    for (const fav of favouriteSelector) {
                        fav.addEventListener('click', globalFunction)
                    }






                }


        }






        )

    //Parte III. Función manejadora  de favoritos
    function handleFavourites(event) { //Función para poder hacer un nuevo array con los ids de las series. 

        const favouriteSeries = parseInt(event.currentTarget.dataset.id); //
        //const favouriteSeries = event.currentTarget.dataset.title //por si lo quiero hacer con data-title


        //console.log(favouriteSeries);

        let favourites = animeSeriesArray.find((serie) => serie.mal_id === favouriteSeries)
        console.log(favourites)







        //console.log(favouriteSeriesArray);
        //console.dir(animeSeriesArray);




    }
    function changeColorFavourite(event) { //Función para cambiar el color a la serie seleccionada como favorita

        const favouriteAnime = event.currentTarget;
        favouriteAnime.classList.toggle('favourite')
        //console.log(event)

    }



    function globalFunction(event) { //Esta función es la que quiero uso en el listener "fav" para cambiar el color y mostrar el array con favoritos

        handleFavourites(event);
        changeColorFavourite(event);

    }



}






//Listeners

searchButton.addEventListener('click', fetchDataAnime);














