
class BubbleChart {

    constructor(parentElement, titles, dummy) {
        this.parentElement = parentElement;
        this.titles = titles;
        this.dummy = dummy;

        this.initVis();
    }

    initVis() {

        let vis = this;

        vis.margin = {top: 20, right: 20, bottom: 20, left: 40};
        vis.width = $("#" + vis.parentElement).width() - vis.margin.left - vis.margin.right;
        vis.height = $("#" + vis.parentElement).height() - vis.margin.top - vis.margin.bottom;

        // init drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .attr("viewBox", [0, 0, width, height])
            .attr("font-size", 10)
            .attr("font-family", "sans-serif")
            .attr("text-anchor", "middle")
            .append('g')
            .attr('transform', `translate (${vis.margin.left}, ${vis.margin.top})`);

        vis.wrangleData();
    }

    wrangleData() {

        let vis = this;

        vis.displayData = vis.titles;

        // console.log(vis.titles)

        vis.movies = [];
        vis.shows = [];

        vis.displayData.forEach((d,i) => {
            if (d.type === "Movie") {
                let movie = {
                    "year": d.release_year,
                    "title": d.title,
                    "type": d.type,
                    "description": d.description,
                    "listed_in": d.listed_in
                }
                vis.movies.push(movie);
            } else {
                let show = {
                    "year": d.release_year,
                    "title": d.title,
                    "type": d.type,
                    "description": d.description,
                    "listed_in": d.listed_in
                }
                vis.shows.push(show);
            }
        })

        // console.log(vis.movies)
        // console.log(vis.shows)

        vis.updateVis();
    }

    updateVis() {

        let vis = this;

        // bubble chart packing not working, building circles
        // experimenting with dummy data

        // vis.pack = d3.pack()
        //     .size([vis.width, vis.height - 50])
        //     // .children(d => d.)
        //     .padding(10);
        //
        // vis.force = d3.force()
        //     .size([width, height - 50]);
        //
        // vis.force.nodes(dummy).start();

        // var nodes = pack.nodes(data);
        //
        // var node = chart.selectAll(".node")
        //     .data(nodes).enter()
        //     .append("g")
        //     .attr("class", "node")
        //     .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
        //     .call(force.drag);
        //
        // node.append("circle")
        //     .attr("r",function(d) { return d.r; })
        //     .attr("fill", function(d){ return d.children ? "#fff" : color(d.domain); }) //make nodes with children invisible
        //     .attr("opacity", 0.6)
        //
        // node.append("a")
        //     .attr("href", function(d){ return d.link; })
        //     .append("text")
        //     .attr("dy", ".3em").style("text-anchor", "middle")
        //     .text(function(d) { return d.children ? "" : d.name; });

        // not using since the circles will be the same size
        // vis.scaleRadius = d3.scaleLinear()
        //     .domain([d3.min(vis.movies, function(d) {
        //         return +d.views; }),
        //         d3.max(data, function(d) { return +d.views; })])
        //     .range([5,18]);


        // vis.ShowCircles = vis.svg.selectAll(".circle")
        //     .data(vis.shows)
        //
        //     .enter()
        //     .append("circle")
        //     .attr("class", "circle")
        //     .attr("r", 5)
        //     .attr("fill", "red")
        //     .attr('transform', 'translate(' + [vis.width / 2, vis.height / 2] + ')')
            // .merge(vis.MovieCircles);

        // function ticked(e) {
        //     vis.MovieCircles
        //         .attr("cx", function (d) {
        //             return d.x;
        //         })
        //         .attr("cy", function (d) {
        //             return d.y;
        //         });
        // } // 'node' is each circle of the bubble chart
        //
        // vis.simulation = d3.forceSimulation(vis.movies)
        //     .force("charge", d3.forceManyBody()
        //         .strength([-50]))
        //     .force("x", d3.forceX())
        //     .force("y", d3.forceY())
        //     .on("tick", ticked);

    }
}

// TODO: color circles accordingly
// TODO: add tooltips
// TODO: https://www.freecodecamp.org/news/a-gentle-introduction-to-d3-how-to-build-a-reusable-bubble-chart-9106dc4f6c46/

// TODO: OH - how to nest data? how to do pack layout