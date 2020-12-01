// Viewer Enjoyment Ratings Visualization

class Grid {

    constructor(parentElement, data, isMovies){
        this.parentElement = parentElement;
        this.data = data;
        this.isMovies = isMovies;

        this.initVis();
    }

    initVis(){
        let vis = this;
        vis.displayData = [];

        // SVG dimensions
        vis.margin = {top: 10, right: 0, bottom: 20, left: 0};
        vis.width = $('#' + vis.parentElement).width() - vis.margin.left - vis.margin.right;
        vis.height = vis.width;
        vis.cellHeight = 5;
        vis.cellWidth = vis.cellHeight;
        vis.cellPadding = 10;

        // SVG drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + vis.width/3 + "," + vis.margin.bottom + ")")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom);

        console.log(vis.height)

        // legend
        vis.svg.append('rect')
            .attr("width", vis.cellWidth * 4)
            .attr("height", vis.cellHeight * 4)
            .attr("x", 50)
            .attr("y", vis.height - (vis.margin.top * vis.margin.bottom))
            .attr("fill", "#fee0d2")

        vis.svg.append('rect')
            .attr("width", vis.cellWidth * 4)
            .attr("height", vis.cellHeight * 4)
            .attr("x", 80)
            .attr("y", vis.height - (vis.margin.top * vis.margin.bottom))
            .attr("fill", "#fc9272")

        vis.svg.append('rect')
            .attr("width", vis.cellWidth * 4)
            .attr("height", vis.cellHeight * 4)
            .attr("x", 110)
            .attr("y", vis.height - (vis.margin.top * vis.margin.bottom))
            .attr("fill", "#de2d26")

        vis.legendText = vis.svg.append("g")
            .attr('class', 'ratings-legend')
            .attr('transform', `translate(${vis.width * 2.8 / 4}, ${vis.height - 20})`)


        vis.wrangleData();
    }

    wrangleData(){
        let vis = this;
        var size = 100;
        var count = 0;

        // sort in descending order by ratings
        vis.data.sort(function(a,b){
            return b.rating - a.rating
        })

        // calculate percent of high ratings
        vis.data.forEach(function(d){
            if(d.rating >= 6){
                count = count + 1;
            }
        })

        vis.percent = Math.round((count/vis.data.length) * 100)

        // divide array into subarrays for rows
        // https://stackoverflow.com/questions/11318680/split-array-into-chunks-of-n-length
        while(vis.data.length > 0){
            vis.displayData.push(vis.data.splice(0, size));
        }

        vis.updateVis();
    }

    updateVis(){
        let vis = this;

        // visualization caption
        vis.text = vis.svg.append("text")
            .text(vis.percent + "% are rated 6 or higher on IMDB.")
            .attr("fill", "white")
            .attr("class", "ratings-viz-text")
            .attr("x", "50")

        vis.row = vis.svg.selectAll(".row").data(vis.displayData)
            .enter()
            .append('g')
            .attr("class", "row")
            .attr("transform", function(d, i){
                return "translate(0, " + i * vis.cellPadding + ")"
            })

        vis.row.selectAll('.rectangle').data(function(d, i) {return vis.displayData[i]})
            .enter()
            .append("rect")

            // linked view
            .on('click', function(event, d){
                // clear any existing data
                d3.selectAll(".title-row").remove()

                if (vis.isMovies == true){

                    document.getElementById("movie-table").style.display = "block";

                    // append data to bootstrap table
                    d3.select("#movie-title-row").append("th").attr("scope", "row").text("Title").attr("class", "title-row")
                    d3.select("#movie-title-row").append("td").text(d.title).attr("class", "title-row")

                    d3.select("#movie-rating-row").append("th").attr("scope", "row").text("IMDB Rating").attr("class", "title-row")
                    d3.select("#movie-rating-row").append("td").text(d.rating).attr("class", "title-row")

                    d3.select("#movie-release-row").append("th").attr("scope", "row").text("Release Year").attr("class", "title-row")
                    d3.select("#movie-release-row").append("td").text(d.release_year).attr("class", "title-row")
                }

                else {

                    document.getElementById("tv-table").style.display = "block";

                    // append data to bootstrap table
                    d3.select("#tv-title-row").append("th").attr("scope", "row").text("Title").attr("class", "title-row")
                    d3.select("#tv-title-row").append("td").text(d.title).attr("class", "title-row")

                    d3.select("#tv-rating-row").append("th").attr("scope", "row").text("IMDB Rating").attr("class", "title-row")
                    d3.select("#tv-rating-row").append("td").text(d.rating).attr("class", "title-row")

                    d3.select("#tv-release-row").append("th").attr("scope", "row").text("Release Year").attr("class", "title-row")
                    d3.select("#tv-release-row").append("td").text(d.release_year).attr("class", "title-row")
                }
            })

            // rectangle attributes
            .transition()
            .duration(1000)
            .attr("class", "rectangle")
            .attr("height", vis.cellHeight)
            .attr("width", vis.cellWidth)
            .attr("x", (d, i) => (i * 6) + 50)
            .attr("y", 20)
            .attr("fill", function(d){
                if (0 <= d.rating && d.rating <= 3)
                    return "#fee0d2"

                else if (3 < d.rating && d.rating <= 6)
                    return "#fc9272"

                else if (6 < d.rating && d.rating <= 10)
                    return "#de2d26";

            })
    }
}
