'use strict';

function displayParksFound(numOfParks, states){

    // replacing %2c with ", " in the states string
    states = states.split("%2C").join(", ");

    // If parks found display how many are found
    if(numOfParks > 0){
        $('.showing-results-section .wrapper').append(`
            <div class="showing-results">
                Displaying ${numOfParks} parks found in <span class="showing-parks-in-states">${states}</span>
            </div>
        `);
    }else{ // else displaying no results found
        $('.showing-results-section .wrapper').append(`
            <div class="showing-results">
                No Parks Found
            </div>
        `);
    }
}

function displayResults(responseJson, states)
{   
    let parks = responseJson.data;
    
    // Call back for the function to show how many parks found
    displayParksFound(parks.length, states);

    for(let i = 0; i < parks.length; i++){

        // HTML to append to the browser for search results
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

    // fetching data form NPS api
    fetch(`https://developer.nps.gov/api/v1/parks?api_key=${apiKey}&${query}`)
        .then(response => response.json())
        .then(responseJson => {
            
            // hide the label saying Searching through nature
            $('.searching').hide();

            // call back to the functions that appends html search-result-section
            displayResults(responseJson, states);

            // show the footer at the bottom to notify end of search result
            $('.footer-section').show();
        })
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

        // Empty and hide any equired elements that need to be reset to default states
        $('.showing-results-section .wrapper').html("");
        $('.search-results-section .wrapper').html("");
        $('.footer-section').hide()

        // remove focus from submit button
        $('.submit-button').blur();

        // As soon as user clicks search button, display a message for search taking place
        $('.searching').show();
        

        // Set value of max park entered by the user, else by default the value is 10
        let maxParks = $('.max-parks').val();
        
        // get states entered by user in the input box
        let states = $('.states').val();
        
        // removes all commas and replaces with %2C and gets rids of all spaces
        states = (states.replace(/ +/g, "")).replace(/,/g,"%2C");
        
        // call back for the function to search for parks
        searchParks(states, maxParks);

        // Reset the input boxes to deaulft settings
        $('.max-parks').val("10");
        $('.states').val("");
        
    });
}

$(watchForm);