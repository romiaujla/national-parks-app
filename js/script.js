'use strict';

function displayResults(responseJson)
{   
    
}

function searchParks(states, maxParks){

    const apiKey = "X6gU1HR9voYTM2Thisadb19sGIz2AjsTqdE1Jcim";
    const query = `stateCode=${states}&limit=${maxParks}`;

    console.log(`https://developer.nps.gov/api/v1/parks?api_key=${apiKey}&${query}`);
    fetch(`https://developer.nps.gov/api/v1/parks?api_key=${apiKey}&${query}`)
        .then(response => response.json())
        .then(responseJson => displayResults(responseJson))
        .catch(err => console.log(err.message));

}


function watchForm(){

    $('.search-form').on('submit', function(e){
        e.preventDefault();

        let maxParks = $('.max-parks').val();
        
        // get states entered by user in the input box
        let states = $('.states').val();
        
        // removes all commas and replaces with %2C and gets rids of all spaces
        // states = (states.replace(/ +/g, "")).replace(/,/g,"%2C");

        // console.log(states);
        
        // call back for the function to search for parks
        searchParks(states, maxParks);
        
    });
}

$(watchForm);