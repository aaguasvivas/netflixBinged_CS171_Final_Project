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
        vis.legendY = vis.height - (vis.margin.top * vis.margin.bottom)

        // SVG drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + vis.width/3 + "," + vis.margin.bottom + ")")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
         //   .attr("height", vis.height + vis.margin.top + vis.margin.bottom);


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
        var clicked = false;
        var position = vis.displayData.length * (vis.cellHeight + vis.cellPadding)

        // legend
        vis.svg.append('rect')
            .attr("width", vis.cellWidth * 4)
            .attr("height", vis.cellHeight * 4)
            .attr("x", 50)
            .attr("y", position)
            .attr("fill", "#fee0d2")

        vis.svg.append('text')
            .text("0-3")
            .attr("x", 80)
            .attr("y", position + 15)
            .attr("fill", "white")

        vis.svg.append('rect')
            .attr("width", vis.cellWidth * 4)
            .attr("height", vis.cellHeight * 4)
            .attr("x", 130)
            .attr("y", position)
            .attr("fill", "#fc9272")

        vis.svg.append('text')
            .text("4-6")
            .attr("x", 160)
            .attr("y", position + 15)
            .attr("fill", "white")

        vis.svg.append('rect')
            .attr("width", vis.cellWidth * 4)
            .attr("height", vis.cellHeight * 4)
            .attr("x", 210)
            .attr("y", position)
            .attr("fill", "#de2d26")

        vis.svg.append('text')
            .text("7-10")
            .attr("x", 240)
            .attr("y", position + 15)
            .attr("fill", "white")

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

                clicked = true;

                // // change stroke
                // d3.select(this)
                //     .attr("stroke", "white");

                if (vis.isMovies == true) {

                    // remove existing data
                    d3.select('#movie-table').selectAll('.table-row').remove();

                    // show table
                    document.getElementById("movie-table").style.display = "block";

                    // append data to bootstrap table
                    d3.select("#movie-title-row").append("th").attr("scope", "row").text("Title").attr("class", "table-row")
                    d3.select("#movie-title-row").append("td").text(d.title).attr("class", "table-row")

                    d3.select("#movie-description-row").append("th").attr("scope", "row").text("Description").attr("class", "table-row")
                    d3.select("#movie-description-row").append("td").text(d.description).attr("class", "table-row")

                    d3.select("#movie-release-row").append("th").attr("scope", "row").text("Release Year").attr("class", "table-row")
                    d3.select("#movie-release-row").append("td").text(d.release_year).attr("class", "table-row")

                    d3.select("#movie-rating-row").append("th").attr("scope", "row").text("IMDB Rating").attr("class", "table-row")
                    d3.select("#movie-rating-row").append("td").text(d.rating).attr("class", "table-row")

                }

                else {

                    // remove existing data
                    d3.select('#tv-table').selectAll('.table-row').remove();

                    // show table
                    document.getElementById("tv-table").style.display = "block";

                    // append data to bootstrap table
                    d3.select("#tv-title-row").append("th").attr("scope", "row").text("Title").attr("class", "table-row")
                    d3.select("#tv-title-row").append("td").text(d.title).attr("class", "table-row")

                    d3.select("#tv-description-row").append("th").attr("scope", "row").text("Description").attr("class", "table-row")
                    d3.select("#tv-description-row").append("td").text(d.description).attr("class", "table-row")

                    d3.select("#tv-release-row").append("th").attr("scope", "row").text("Release Year").attr("class", "table-row")
                    d3.select("#tv-release-row").append("td").text(d.release_year).attr("class", "table-row")

                    d3.select("#tv-rating-row").append("th").attr("scope", "row").text("IMDB Rating").attr("class", "table-row")
                    d3.select("#tv-rating-row").append("td").text(d.rating).attr("class", "table-row")

                }
            })
            // .on('mouseout', function(event, d){
            //
            //     // reset stroke
            //     d3.select(this)
            //         .attr("stroke", "none");
            // })

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
            .attr("stroke", d => {
                if(clicked == true)
                    return "white"
                else
                    return "none"
            })
    }
}
