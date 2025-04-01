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
        toastPopUp();  //error case for when user types in nothing 
        return;
        
    }

    container.innerHTML = '';  //Resets movie posters so that they don't stack after multiple searches 

    apiCall(response);

    
})


async function apiCall(response){
    const req = await fetch(`https://api.tvmaze.com/search/shows?q=${response}`)  //API fetch process 
    const movies = await req.json();

    console.log(movies);

    makeImages(movies) //Create the images of the movies 
}


function makeImages(movies){
    for (let movie of movies){
        let src = movie.show.image.medium; //Accessing the images from the API call object 
        

        const img = document.createElement('img');
        img.src = src;  //Creates the image element from the API data of the movie the user searched 

        container.appendChild(img); //Add the image to the container element of image containers 
    }
}