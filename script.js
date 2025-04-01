'use strict';

const form = document.querySelector('form');
const container = document.querySelector('.image-container');
const inputField = document.querySelector('.search-input');

function toastPopUp(){
    const toast = document.getElementById('toast');
    toast.classList.add("show");

    setTimeout(()=>{
        toast.classList.remove("show");
    }, 2000);
}

form.addEventListener('submit', (event)=>{
    event.preventDefault(); //Prevents from taking us to the other webpage when we submit 

    let response = inputField.value;
    console.log(response);

    if (response.trim() === ""){
        toastPopUp();
        
    }

    container.innerHTML = '';

    apiCall(response);

    
})


async function apiCall(response){
    const req = await fetch(`https://api.tvmaze.com/search/shows?q=${response}`)
    const movies = await req.json();

    console.log(movies);

    makeImages(movies)
}


function makeImages(movies){
    for (let movie of movies){
        let src = movie.show.image.medium;
        

        const img = document.createElement('img');
        img.src = src;  //Creates the image element from the API data of the movie the user searched 

        container.appendChild(img);
    }
}