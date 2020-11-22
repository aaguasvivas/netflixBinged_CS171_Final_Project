let titles;
let genres = [];
let imdbMovies = [];
let imdbShows = [];

let worldMap;

//loadData();

let promises = [
    d3.csv("data/netflix_titles.csv"),
    d3.csv("data/dummyshow"),
    d3.csv("data/netflixIMDB.csv"),
    d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json")
];

Promise.all(promises)
    .then(function(data) {initMainPage(data)})
    .catch(function(err){console.log(err)})

function initMainPage(data){

    // data
    titles = data[0]
    dummy = data[1]
    imdb = data[2]
    mapData = data[3]

    // convert string to integer
    imdb.forEach(function(d){
        d.rating = +d.rating;
    })

    // create imdb movie and shows array
    imdbMovies = imdb.filter(function(e){
        return e.type == "Movie"
    })

    imdbShows = imdb.filter(function(e){
        return e.type == "TV Show"
    })

    // parse out genres
    let genreString = titles[0].listed_in;

    for(let i = 1; i < titles.length; i++){
        genreString = genreString + ", " + titles[i].listed_in;
    }

    genreArray = genreString.split(", ");

    // https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
    genres = genreArray.filter(function(genre, index){
        return genreArray.indexOf(genre) == index;
    })

    // initialize visualizations
    MyBubbleChart = new BubbleChart('bubblechart', titles, dummy);
    movieRatings = new Grid('movie-ratings-viz', imdbMovies);
    showRatings = new Grid('show-ratings-viz', imdbShows);
    MyMap = new MapVis("worldMap", mapData);

    // calculate average ratings
    var movieCounter = 0;
    var showCounter = 0;
    let movieAverage = 0;
    let showAverage = 0;

    // calculate average ratings
    imdbMovies.forEach(function(d){
        movieCounter = movieCounter + d.rating;
    })

    imdbShows.forEach(function(d){
        showCounter = showCounter + d.rating;
    })

    movieAverage = (movieCounter/imdbMovies.length).toFixed(2);
    showAverage = (showCounter/imdbShows.length).toFixed(2);

    // update HTML with calculation
    document.getElementById('movie-actual').innerHTML = movieAverage;
    document.getElementById('show-actual').innerHTML = showAverage;

}

// display answer after user clicks button to check their guess
function showMovie() {
    document.getElementById('m-act').style.display = "block";
}

function showTV(){
    document.getElementById('s-act').style.display = "block";

}


