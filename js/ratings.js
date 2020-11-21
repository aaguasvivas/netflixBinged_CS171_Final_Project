// Viewer Enjoyment Ratings Visualization

class Grid {

    constructor(parentElement, imdbData){
        this.parentElement = parentElement;
        this.imdbData = imdbData;

        this.initVis();
    }

    initVis(){
        let vis = this;

        // SVG dimensions
        vis.margin = {top: 130, right: 40, bottom: 60, left: 100};
        vis.width = $('#' + vis.parentElement).width() - vis.margin.left - vis.margin.right;
        vis.height = vis.width;

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

        vis.svg.append("rect").attr("x", 50).attr("y", 50).attr("height", 50).attr("width", 50).attr("fill", "red")
    }


}