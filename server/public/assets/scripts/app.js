$(document).ready(function(){
    $('#animalForm').on('submit', handleSubmit);
    getAnimals();
});

function handleSubmit(event){
    event.preventDefault();

    var formArray = $('#form').serializeArray();

    var formData = {};

    $.each(formArray, function(index, element){
        formData[element.name] = element.value;
    });

    console.log('form data', formData);
    postToServer(formData);
}

function postToServer(animalData){
    $.ajax({
        type: 'POST',
        url: '/animals',
        data: animalData,
        success: handleServer
    });
}

function handleServer(response){
    console.log('server response', response);
    getAnimals();
}

function getAnimals(){
    $.ajax({
        type: 'GET',
        url: '/animals',
        success: animalsGot
    });
}

function animalsGot(response){
    console.log('animals got', response);
    appendDom(response);
}

function appendDom(animal){
    $('.container').empty();
    for(var i = 0; i < animal.length; i++){
    $('.container').append('<div class="animal"></div>');
    var $el = $('.container').children().last();

    $el.append('<p>' + animal[i].type + '</p>');
    $el.append('<p>' + animal[i].number + '</p>');
    }
}

console.log('connected');
