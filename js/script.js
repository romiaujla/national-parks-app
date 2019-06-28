function watchForm(){

    $('.search-form').on('submit', function(e){
        e.preventDefault();
        let selectedStates = $('.checkbox label input:checked').val();
        console.log(selectedStates);
    })
}

$(watchForm);