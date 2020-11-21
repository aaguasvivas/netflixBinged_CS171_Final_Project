// Viewer Enjoyment Ratings Visualization

class Grid {

    constructor(parentElement, data){
        this.parentElement = parentElement;
        this.data = data;

        this.initVis();
    }

    initVis(){
        let vis = this;
        vis.displayData = [];

        // SVG dimensions
        vis.margin = {top: 100, right: 0, bottom: 60, left: 0};
        vis.width = $('#' + vis.parentElement).width() - vis.margin.left - vis.margin.right;
        vis.height = vis.width;
        vis.cellHeight = 3.5;
        vis.cellWidth = vis.cellHeight;
        vis.cellPadding = 10;

        // SVG drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");

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

        vis.text = vis.svg.append("text")
            .text(vis.percent + "% are rated 6 or higher on IMDB.")
            .attr("fill", "white")

            // .selectAll("text").data(vis.displayData)
            // .enter()
            // .append("text")
            // .text(vis.percent + "% are rated 6 or higher on IMDB.")
            // .attr("fill", "white")

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
            .attr("class", "rectangle")
            .attr("height", vis.cellHeight)
            .attr("width", vis.cellWidth)
            .attr("x", (d, i) => (i * 5) + 5.5)
            .attr("y", 20)
            .attr("fill", function(d){
                if(d.rating >= 6)
                    return "red"
                else
                    return "white"
            })


    }


}