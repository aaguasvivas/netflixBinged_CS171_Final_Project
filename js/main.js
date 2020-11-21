let titles;
let genres = [];
let imdbMovies = [];
let imdbShows = [];

//loadData();

let promises = [
    d3.csv("data/netflix_titles.csv"),
    d3.csv("data/dummyshow"),
    d3.csv("data/netflixIMDB.csv")
];

Promise.all(promises)
    .then(function(data) {initMainPage(data)})
    .catch(function(err){console.log(err)})

function initMainPage(data){

    // data
    titles = data[0]
    dummy = data[1]
    imdb = data[2]

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

    MyBubbleChart = new BubbleChart('bubblechart', titles, dummy)
    movieRatings = new Grid('movie-ratings-viz', imdbMovies)

}




