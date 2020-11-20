let titles;
let genres = [];

//loadData();

let promises = [
    d3.csv("data/netflix_titles.csv"),
    d3.csv("data/dummyshow")
];

Promise.all(promises)
    .then(function(data) {initMainPage(data)})
    .catch(function(err){console.log(err)})

function initMainPage(data){

    titles = data[0]
    dummy = data[1]
    console.log(dummy)

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

}


// // load data
// function loadData() {
//     d3.csv("data/netflix_titles.csv").then(titles => {
//
//         console.log(titles[0].listed_in)
//
//         let temp;
//
//         titles.forEach(function(title, index){
//             temp = title.listed_in.split(",");
//
//         })
//
//
//         // TODO: create list of listed_in
//         // TODO: separate by format, then separate by listed_in
//         // TODO: create bubbles - https://observablehq.com/@d3/bubble-chart
//         // options - separate by genre, color by genre (tough for multiple genres) or enable filtering
//         // refer to bechdel test
//
//         MyBubbleChart = new BubbleChart('bubblechart', titles);
//
//
//     });

//}
