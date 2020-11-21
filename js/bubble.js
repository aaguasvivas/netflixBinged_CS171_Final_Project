
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
        // vis.height = $("#" + vis.parentElement).height() - vis.margin.top - vis.margin.bottom;
        vis.height = vis.width;

        // init drawing area
        // vis.svg = d3.select("#" + vis.parentElement).append("svg")
        //     .attr("width", vis.width + vis.margin.left + vis.margin.right)
        //     .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
        //     .attr("viewBox", [0, 0, width, height])
        //     .attr("font-size", 10)
        //     .attr("font-family", "sans-serif")
        //     .attr("text-anchor", "middle")
        //     .append('g')
        //     .attr('transform', `translate (${vis.margin.left}, ${vis.margin.top})`);


        // vis.displayData = d3.stratify(dummy);
        // console.log(vis.displayData)

        // vis.dummy.forEach((d,i) => {
        //
        // })


        // vis.grouped_dummmy = d3.group(dummy, d => d.type, d => d.listed_in)
        //

        // WORKING V1 - using stratify
        // vis.grouped_titles = d3.stratify()(vis.titles)
        //     .count(d => d.count)
        // console.log(vis.grouped_titles)
        //
        // vis.pack = d3.pack()
        //     .size([vis.width, vis.height])
        //     .padding(3)
        //
        // vis.packedData = vis.pack(vis.grouped_titles)
        //
        // console.log(vis.packedData.leaves())
        // console.log(vis.packedData.descendants())
        // console.log(vis.titles)
        //
        // vis.leaf = vis.svg.selectAll("g")
        //     .data(vis.packedData.leaves())
        //     .enter()
        //     .append("g")
        //     .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`);
        //
        // vis.circle = vis.leaf
        //     .append("circle")
        //     .attr("r", 2)
        //     .attr("fill", "#bbccff");
        // ** END OF WORKING V1


        // V2 using zoomable circle packing
        vis.grouped_titles = d3.stratify()(vis.titles)
            .count(d => d.count)
        console.log(vis.grouped_titles)

        vis.pack = d3.pack()
            .size([vis.width, vis.height])
            .padding(3)

        vis.root = vis.pack(vis.grouped_titles)
        let focus = vis.root;
        vis.view;

        vis.color = d3.scaleLinear()
            .domain([0, 5])
            .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
            .interpolate(d3.interpolateHcl)

        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .attr("viewBox", `-${vis.width / 2} -${vis.height / 2} ${vis.width} ${vis.height}`)
            .style("display", "block")
            .style("margin", "0 -14px")
            .style("background", vis.color(0))
            .style("cursor", "pointer")
            .on("click", (event) => vis.zoom(event, vis.root));

        vis.node = vis.svg.append("g")
            .selectAll("circle")
            .data(vis.root.descendants().slice(1))
            .join("circle")
            .attr("fill", d => d.children ? vis.color(d.depth) : "white")
            .attr("pointer-events", d => !d.children ? "none" : null)
            .on("mouseover", function() { d3.select(this).attr("stroke", "#000"); })
            .on("mouseout", function() { d3.select(this).attr("stroke", null); })
            .on("click", (event, d) => focus !== d && (vis.zoom(event, d), event.stopPropagation()));

        vis.label = vis.svg.append("g")
            .style("font", "10px sans-serif")
            .attr("pointer-events", "none")
            .attr("text-anchor", "middle")
            .selectAll("text")
            .data(vis.root.descendants())
            .join("text")
            .style("fill-opacity", d => d.parent === vis.root ? 1 : 0)
            .style("display", d => d.parent === vis.root ? "inline" : "none")
            .text(d => d.data.id);

        vis.zoomTo([vis.root.x, vis.root.y, vis.root.r * 2]);
        // END OF V2


        vis.wrangleData();
    }

    wrangleData() {

        let vis = this;

        // vis.displayData = vis.titles;

        // console.log(vis.titles)

        // vis.movies = [];
        // vis.shows = [];
        //
        // vis.displayData.forEach((d,i) => {
        //     if (d.type === "Movie") {
        //         let movie = {
        //             "year": d.release_year,
        //             "title": d.title,
        //             "type": d.type,
        //             "description": d.description,
        //             "listed_in": d.listed_in
        //         }
        //         vis.movies.push(movie);
        //     } else {
        //         let show = {
        //             "year": d.release_year,
        //             "title": d.title,
        //             "type": d.type,
        //             "description": d.description,
        //             "listed_in": d.listed_in
        //         }
        //         vis.shows.push(show);
        //     }
        // })

        // console.log(vis.movies)
        // console.log(vis.shows)

        vis.updateVis();
    }

    updateVis() {

        let vis = this;

        // bubble chart packing not working, building circles
        // experimenting with dummy data



        // ** USING : https://bl.ocks.org/denjn5/6d5ddd4226506d644bb20062fc60b53f
        // vis.pack = d3.pack()
        //     .size([vis.width, vis.height - 50]);
        // .children(d => d.)
        // .padding(10);
        // vis.root = d3.hierarchy(vis.grouped_titles);
        // vis.nodes = vis.root.descendants();
        //
        // console.log(vis.root)
        // console.log(vis.nodes)
        //
        // vis.pack(vis.root)

        // vis.slices = vis.svg.selectAll("circle")
        //     .data(vis.nodes)
        //     .enter()
        //     .append("circle")
        //     .attr('cx', function (d) { return d.x; })
        //     .attr('cy', function (d) { return d.y; })
        //     .attr('r', 1);
        //
        // vis.force.nodes(dummy).start();

        // **END OF USING: https://bl.ocks.org/denjn5/6d5ddd4226506d644bb20062fc60b53f

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

    zoom(event, d) {

        let vis = this;

        vis.focus0 = vis.focus;

        vis.focus = d;

        vis.transition = vis.svg.transition()
            .duration(event.altKey ? 7500 : 750)
            .tween("zoom", d => {
                let i = d3.interpolateZoom(vis.view, [vis.focus.x, vis.focus.y, vis.focus.r * 2]);
                return t => vis.zoomTo(i(t));
            });

        vis.label
            .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
            .transition(vis.transition)
            .style("fill-opacity", d => d.parent === focus ? 1 : 0)
            .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
            .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });


    }

    zoomTo(v) {

        let vis = this;

        vis.k = width / v[2];

        vis.view = v;

        // label.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
        vis.node
            .attr("transform", d => `translate(${(d.x - v[0]) * vis.k},${(d.y - v[1]) * vis.k})`)
            .attr("r", d => d.r * vis.k);
    }


}

// TODO: fix data labels why they all off? ask ben
// TODO: zoomable packing - https://observablehq.com/@d3/zoomable-circle-packing
// TODO: add label w/ zoomable packings
// TODO: color circles accordingly
// TODO: force simulation and drag: https://observablehq.com/@d3/clustered-bubbles
// TODO: add tooltips
// TODO: https://www.freecodecamp.org/news/a-gentle-introduction-to-d3-how-to-build-a-reusable-bubble-chart-9106dc4f6c46/
