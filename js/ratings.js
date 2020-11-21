// Viewer Enjoyment Ratings Visualization

class Grid {

    constructor(parentElement, data){
        this.parentElement = parentElement;
        this.data = data;

        this.initVis();
    }

    initVis(){
        let vis = this;

        // SVG dimensions
        vis.margin = {top: 130, right: 40, bottom: 60, left: 100};
        vis.width = $('#' + vis.parentElement).width() - vis.margin.left - vis.margin.right;
        vis.height = vis.width;
        vis.cellHeight = 10;
        vis.cellWidth = vis.cellHeight;

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

        vis.updateVis();
    }

    updateVis(){
        let vis = this;
        console.log(vis.data)

        vis.sortedData = vis.data.sort(function(a,b){
            return b[rating] - a[rating]
        })

        console.log(vis.sortedData)

        // data join
        vis.rectangle = vis.svg.selectAll("rect").data(vis.data);

        // enter
        vis.rectangle.enter()
            .append("rect")
            .attr("class", "rectangles")

        // update
            .merge(vis.rectangle)
            .attr("height", vis.cellHeight)
            .attr("width", vis.cellWidth)
            .attr("x", (d, i) => (i * 20) + 10)
            .attr("y", 20)
            .attr("fill", "red")

        vis.rectangle.exit().remove();

        vis.svg.append("rect").attr("x", 50).attr("y", 50).attr("height", 50).attr("width", 50).attr("fill", "red")
    }


}