
loadData();

let titles;

// load data
function loadData() {
    d3.csv("data/netflix_titles.csv").then(titles => {

        console.log(titles)



    });
}

function createVis() {
    let vis = this;

    vis.alltitlechart = new BubbleChart("alltitlechart", titles);

}