// https://refreshless.com/nouislider/

// variables
var movieSlider = document.getElementById('movie-slider');
var showSlider = document.getElementById('show-slider');

// create sliders
noUiSlider.create(movieSlider, {
    start: 0,
    connect: [true, false],
    range: {
        'min': 0,
        'max': 10
    }
})

noUiSlider.create(showSlider, {
    start: [0],
    connect: [true, false],
    range: {
        'min': 0,
        'max': 10
    }
});

// update HTML with user's guess
var userMovieGuess = document.getElementById('movie-guess');
var userShowGuess = document.getElementById('show-guess');

movieSlider.noUiSlider.on('update', function(values, handle){
    userMovieGuess.innerHTML = values[handle];
})

showSlider.noUiSlider.on('update', function (values, handle) {
    userShowGuess.innerHTML = values[handle];
});

