
loadData();

let titles;

// load data
function loadData() {
    d3.csv("data/netflix_titles.csv").then(titles => {

        console.log(titles)

        // TODO: create list of listed_in
        // TODO: separate by format, then separate by listed_in
        // TODO: create bubbles - https://observablehq.com/@d3/bubble-chart
        // options - separate by genre, color by genre (tough for multiple genres) or enable filtering



    });
}

function createVis() {
    let vis = this;

    vis.alltitlechart = new BubbleChart("alltitlechart", titles);

}