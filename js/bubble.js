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

        // WORKING V1 - using John Haldeman: https://observablehq.com/@johnhaldeman/tutorial-on-d3-basics-and-circle-packing-heirarchical-bubb

        // init drawing area
        // vis.svg = d3.select("#" + vis.parentElement).append("svg")
        //     .attr("width", vis.width + vis.margin.left + vis.margin.right)
        //     .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
        //     .attr("viewBox", [0, 0, vis.width, vis.height])
        //     .attr("font-size", 10)
        //     .attr("font-family", "sans-serif")
        //     .attr("text-anchor", "middle")
        //     .append('g')
        //     .attr('transform', `translate (${vis.margin.left}, ${vis.margin.top})`);

        // vis.grouped_titles = d3.stratify()(vis.titles)
        // .count(d => d.count)

        // console.log(vis.grouped_titles)

        // vis.pack = d3.pack()
        //     .size([vis.width, vis.height])
        //     .padding(3)
        //
        // vis.packedData = vis.pack(vis.grouped_titles)
        //
        // console.log(vis.packedData.leaves())
        // console.log(vis.packedData.descendants())
        // console.log(vis.titles)

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

        // ** END OF WORKING V1 John Haldeman

        // drawing tooltip
        vis.genretooltip = new Tooltip('genre_tooltip', 240);


        // V2 using zoomable circle packing
        vis.grouped_titles = d3.stratify()(vis.titles)
            .count(d => d.count)
        console.log(vis.grouped_titles)

        vis.pack = d3.pack()
            .size([vis.width, vis.height])
            .padding(3)

        vis.root = vis.pack(vis.grouped_titles)
        vis.focus = vis.root;
        vis.view;

        vis.color = d3.scaleLinear()
            .domain([0, 5])
            .range(["hsl(0,0%,96%)", "hsl(0,97%,49%)"])
            .interpolate(d3.interpolateHcl)

        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .attr("viewBox", `-${vis.width / 2} -${vis.height / 2} ${vis.width} ${vis.height}`)
            .style("display", "block")
            .style("margin", "0 -14px")
            .style("background", "black")
            .style("cursor", "pointer")
            .on("click", (event) => vis.zoom(event, vis.root));


        // END OF V2 ZOOMABLE PACKING


        vis.wrangleData();
    }

    wrangleData() {

        let vis = this;

        // vis.displayData = vis.titles;

        // console.log(vis.titles)

        vis.updateVis();
    }

    updateVis() {

        let vis = this;

        // V3 SIMPLE CIRCLE PACK USING : https://bl.ocks.org/denjn5/6d5ddd4226506d644bb20062fc60b53f
        // vis.pack = d3.pack()
        //     .size([vis.width, vis.height - 50]);
        // // .children(d => d.)
        // // .padding(10);
        // vis.root = d3.hierarchy(vis.grouped_titles);
        // vis.nodes = vis.root.descendants();
        // //
        // console.log(vis.root)
        // console.log(vis.nodes)
        // //
        // vis.pack(vis.root)
        //
        // vis.slices = vis.svg.selectAll("circle")
        //     .data(vis.nodes)
        //     .enter()
        //     .append("circle")
        //     .attr("fill", vis.color(3))
        //     .attr('cx', d => d.data.x)
        //     .attr('cy', d => d.data.y)
        //     .attr('r', d => d.data.r);


        // **END OF USING V# SIMPLE CIRCLE PACK

        // V2 ZOOMABLE PACKING
        vis.node = vis.svg.append("g")
            .selectAll("circle")
            .data(vis.root.descendants().slice(1))
            .join("circle")
            .attr("class", d => d.data.parentId)
            .attr("fill", d => d.children ? vis.color(d.depth) : "white")
            .attr("pointer-events", d => !d.children ? "none" : null)
            .on("mouseover", function (d, event) {
                d3.select(this).attr("stroke", "#860404");

                // console.log(d)
                // console.log(event)
                // console.log(event.data.id)

                let genre;
                if (event.data.id.substring(0, 2) === "m_") {
                    genre = event.data.id.substring(2, event.data.id.length)
                    // console.log(genre)
                } else {
                    genre = event.data.id;
                }

                vis.content = '<span class="name">Genre </span><span class="value">' + genre

                vis.genretooltip.showTooltip(vis.content, event);
                //
                // console.log(d3.event)
            })
            .on("mouseout", function () {
                d3.select(this).attr("stroke", null);
            })
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
            .text(d => {
                // console.log(d.data.id)
                if (d.data.id.substring(0, 2) === "m_") {
                    return d.data.id.substring(2, d.data.id.length)
                } else {
                    return d.data.id;
                }
            });
        // vis.genrelabel = vis.g.append("text")
        //     .style("font", "10px sans-serif")
        //     .attr("pointer-events", "none")
        //     .attr("text-anchor", "middle")
        //     .selectAll("text")
        //     .data(vis.root.descendants())
        //     .join("text")
        //     .style("fill-opacity", d => d.parent === vis.root ? 1 : 0)
        //     .style("display", d => d.parent === vis.root ? "inline" : "none")
        //     .text(d => d.data.id);


        vis.zoomTo([vis.root.x, vis.root.y, vis.root.r * 2]);
    }

    zoom(event, d) {

        let vis = this;

        vis.focus0 = vis.focus;

        // console.log(vis.focus)
        // console.log(d)

        vis.focus = d;

        vis.transition = vis.svg.transition()
            .duration(event.altKey ? 7500 : 750)
            .tween("zoom", d => {
                let i = d3.interpolateZoom(vis.view, [vis.focus.x, vis.focus.y, vis.focus.r * 2]);
                return t => vis.zoomTo(i(t));
            });

        vis.label
            .filter(function (d) {
                return d.parent === vis.focus || this.style.display === "inline";
            })
            .transition(vis.transition)
            .style("fill-opacity", d => d.parent === vis.focus ? 0 : 1)
            .on("start", function (d) {
                if (d.parent === vis.focus) this.style.display = "inline";
            })
            .on("end", function (d) {
                if (d.parent !== vis.focus) this.style.display = "none";
            });

    }

    zoomTo(v) {

        let vis = this;

        vis.k = vis.width / v[2];

        vis.view = v;

        vis.label
            .attr("transform", d => `translate(${(d.x - v[0]) * vis.k},${(d.y - v[1]) * vis.k})`)
            .attr("font-size", 30);

        // vis.genrelabel = vis.svg.append("g")
        //     .style("font", "10px sans-serif")
        //     .attr("pointer-events", "none")
        //     .attr("text-anchor", "middle")
        //     .selectAll("text")
        //     .data(vis.root)
        //     .join("text")
        //     .style("fill-opacity", d => d.parent === vis.root ? 0 : 1)
        //     .style("display", d => d.parent === vis.root ? "inline" : "none")
        //
        //
        //     // .attr("transform", d => `translate(${(d.x - v[0]) * vis.k},${(d.y - v[1]) * vis.k})`)
        //     // .attr("font-size", 30)
        //
        //     .text(d => function() {
        //         console.log(d.data.id)
        //         if (d.data.id.substring(0, 2) === "m_") {
        //             return d.data.id.substring(2, d.data.id.length)
        //         } else {
        //             return d.data.id;
        //         }
        //     });

        vis.node
            .attr("transform", d => `translate(${(d.x - v[0]) * vis.k},${(d.y - v[1]) * vis.k})`)
            .attr("r", d => d.r * vis.k);
    }


}

// TODO: how to get labels to show up after zooming back out
// TODO: change background color to black
// TODO: figure out outliers - 6263 vs. 6237 ??
// TODO: fix data labels why they all off? ask ben
// TODO: add label w/ zoomable packing
// TODO: color circles accordingly
// TODO: add tooltips for circles and movies
// TODO: update and format text
// TODO: changing between circles, labels show up?
// TODO: colors look weird

// ** RESOURCES **
// TODO: V1 John Haldeman: https://observablehq.com/@johnhaldeman/tutorial-on-d3-basics-and-circle-packing-heirarchical-bubb
// TODO: (working so far) V2 zoomable packing - https://observablehq.com/@d3/zoomable-circle-packing
// TODO: V3 simple circle packing https://bl.ocks.org/denjn5/6d5ddd4226506d644bb20062fc60b53f
// TODO: https://www.freecodecamp.org/news/a-gentle-introduction-to-d3-how-to-build-a-reusable-bubble-chart-9106dc4f6c46/
