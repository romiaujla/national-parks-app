'use strict';

function displayParksFound(numOfParks){

    if(numOfParks > 0){

        $('.showing-results-section .wrapper').append(`
            <div class="showing-results">
                Displaying ${numOfParks} Parks Found
            </div>
        `);
    }
}

function displayResults(responseJson)
{   
    console.log(responseJson);

    let parks = responseJson.data;
    
    displayParksFound(parks.length);

    for(let i = 0; i < parks.length; i++){
        $('.search-results-section .wrapper').append(`
            <div class="park-wrapper">
                <div class="park">
                    <h2 class="park-full-name">
                        <a href="${parks[i].url}" target="_blank">${parks[i].fullName}</a>
                    </h2>
                    <div class="location">
                        Located in ${parks[i].states} <a href="${parks[i].directionsUrl}" target="_blank">(Map Directions)</a>
                    </div>
                    <p class="park-description">
                        ${parks[i].description}
                    </p>
                    <div class="park-links">
                        View More Info at <a href="${parks[i].url}" target="_blank">${parks[i].name} Homepage</a>
                    </div>
                </div>
            </div>
        `)
    }
    
}

function searchParks(states, maxParks){

    const apiKey = "X6gU1HR9voYTM2Thisadb19sGIz2AjsTqdE1Jcim";
    const query = `stateCode=${states}&limit=${maxParks}`;

    console.log(`https://developer.nps.gov/api/v1/parks?api_key=${apiKey}&${query}`);
    fetch(`https://developer.nps.gov/api/v1/parks?api_key=${apiKey}&${query}`)
        .then(response => response.json())
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('.search-results-section .wrapper').append(`
                <div class="showing-results">
                    No results were found
                </div>
            `);
        });
}


function watchForm(){

    $('.search-form').on('submit', function(e){
        e.preventDefault();

        // Empty any contents in the search section
        $('.search-results-section .wrapper').html("");
        $('.submit-button').blur();

        // Set value of max park entered by the user, else by default the value is 10
        let maxParks = $('.max-parks').val();
        
        // get states entered by user in the input box
        let states = $('.states').val();
        
        // removes all commas and replaces with %2C and gets rids of all spaces
        states = (states.replace(/ +/g, "")).replace(/,/g,"%2C");

        // console.log(states);
        
        // call back for the function to search for parks
        searchParks(states, maxParks);
        
    });
}

$(watchForm);