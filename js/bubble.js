class BubbleChart {

    constructor(parentElement, titles, dummy) {
        this.parentElement = parentElement;
        this.titles = titles;
        this.dummy = dummy;

        this.initVis();
    }

    initVis() {

        let vis = this;

        vis.margin = {top: 10, right: 20, bottom: 10, left: 40};
        vis.width = $("#" + vis.parentElement).width() - vis.margin.left - vis.margin.right;
        vis.height = $("#" + vis.parentElement).height() - vis.margin.top - vis.margin.bottom;
        // vis.height = vis.width;

        // drawing tooltip
        // vis.genretooltip = new Tooltip('genre_tooltip', 240);


        // V2 using zoomable circle packing
        vis.grouped_titles = d3.stratify()(vis.titles)
            .count(d => d.count)

        // console.log(vis.grouped_titles)

        vis.pack = d3.pack()
            .size([vis.width, vis.height])
            .padding(3)

        vis.root = vis.pack(vis.grouped_titles)
        vis.focus = vis.root;
        vis.view;

        vis.color = d3.scaleLinear()
            .domain([0, 5])
            .range(["hsl(14,93%,76%)", "hsl(358,83%,25%)"])
            .interpolate(d3.interpolateHcl)

        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .attr("viewBox", `-${(vis.width + vis.margin.left + vis.margin.right)/ 2} -${(vis.height + vis.margin.top + vis.margin.bottom) / 2} ${vis.width} ${vis.height}`)
            .style("display", "block")
            // .style("margin", "4px 7px")
            .style("background", "black")
            .style("cursor", "pointer")
            .on("click", (event) => vis.zoom(event, vis.root));

        // vis.formatLabel = vis.svg.append("g")
        //     .attr('class', 'formatLabel')
        //     .attr('transform', `translate(${vis.width / 2}, 0)`)

        vis.tt = d3.tip()
            .attr('class', 'd3-tip bubble')

        // END OF V2 ZOOMABLE PACKING

        vis.createVis();
    }

    createVis() {

        let vis = this;

        // V2 ZOOMABLE PACKING
        vis.node = vis.svg.append("g")
            .selectAll("circle")
            .data(vis.root.descendants().slice(1))
            .join("circle")
            .attr("class", d => d.data.id)
            .attr("fill", d => d.children ? vis.color(d.depth) : "white")
            .attr("pointer-events", d => {
                if (d.depth !== 0) {
                    return d.depth === 3 ? "none" : null
                }
            })
            // .on("load", )
            .on("mouseover", function (event, d) {
                d3.select(this)
                    .attr("stroke", "#860404");

                // console.log(d.data.id)
                // console.log(d.data.release_year)

                let text;
                if (d.data.id.substring(0, 2) === "m_") {
                    text = d.data.id.substring(2, d.data.id.length)
                    // console.log(genre)s
                } else {
                    text = d.data.id;
                }

                // console.log(d.depth)

                if (d.depth === 1) {
                    // format
                    vis.content = '<span class="value">' + text;
                } if (d.depth === 2) {
                    // genre
                    vis.content = '<span class="value">' + text;
                } if (d.depth === 3) {
                    // listing
                    vis.content = '<span class="value">' + text + "<br>" + "</span>" +
                        "<strong>Release Year: </strong> <span style='color:red'>" + d.data.date_added + "<br>" + "</span>" +
                        "<strong>Rating: </strong> <span style='color:red'>" + d.data.release_year + "</span>" + "<br>" + "</span>" +
                        "<strong>Subgenres: </strong> <span style='color:red'>" + d.data.duration + "</span>" + "<br>" + "</span>" +
                        "<strong>Director: </strong> <span style='color:red'>" + d.data.title + "</span>" + "<br>" + "</span>" +
                    "<strong>Cast: </strong> <span style='color:red'>" + d.data.director + "</span>" + "<br>" + "</span>" +
                        "<strong>Country: </strong> <span style='color:red'>" + d.data.cast + "</span>" + "<br>" + "</span>" +
                        "<strong>Description: </strong> <span style='color:red'>" + d.data.count + "</span>";
                    // vis.content = '<span class="name">Title: </span><span class="value">' + text;
                }

                vis.tt
                    .html(vis.content)

                vis.svg.call(vis.tt);
                vis.tt.show(d, this);

            })
            .on("mouseout", function (event, d) {

                d3.select(this)
                    .attr('stroke-width', '0px')

                vis.tt.hide(d, this);

            })
            .on("click", function (event, d) {

                // console.log(d)

                // when you zoom, check if leaf and if so, zoom on parent
                // if not, zoom in on d itself

                console.log(d.depth)

                if (d.depth !== 3) {
                    vis.focus !== d && (vis.zoom(event, d), event.stopPropagation())
                }
                // vis.focus !== d && (vis.zoom(event, d), event.stopPropagation())


            });

        // vis.formatLabel.append('text')
        //     .attr("class", "formatLabel")
        //     .text("Movies")
        //     .attr("x", 10)
        //     .attr("y",  10)

        vis.zoomTo([vis.root.x, vis.root.y, vis.root.r * 2]);

    }

    zoom(event, d) {

        let vis = this;

        vis.focus0 = vis.focus;

        // console.log(d)

        vis.focus = d;
        // what we are zooming to
        console.log(vis.focus)


        vis.transition = vis.svg.transition()
            .duration(event.altKey ? 7500 : 750)
            .tween("zoom", d => {
                let i = d3.interpolateZoom(vis.view, [vis.focus.x, vis.focus.y, vis.focus.r * 3.5]);
                return t => vis.zoomTo(i(t));
            });

        vis.node
            .attr("pointer-events", e => {
                if (d.depth === 2) {
                    return e.depth >= 2 ? "visibleFill" : "none"
                } else {
                    return e.depth === 3 ? "none" : "visibleFill"
                }})
    }

    zoomTo(v) {

        let vis = this;

        vis.k = vis.width / v[2];

        vis.view = v;

        vis.node
            .attr("transform", d => `translate(${(d.x - v[0]) * vis.k},${(d.y - v[1]) * vis.k})`)
            .attr("r", d => d.r * vis.k);
    }


}


// TODO:  add labels to show up when you zoom in and disappear when you zoom out
// TODO: how to stay on white circle instead of zooming out / in
// TODO: movie / tv show label on top
// TODO: update and format text
// TODO: upon loadiing - how to make it most zoomed out
// TODO: how to make it zoom to circle when it is zooming out - add margins?

// TODO: delete bubble trash and bubble tooltip

// ** RESOURCES **
// TODO: V1 John Haldeman: https://observablehq.com/@johnhaldeman/tutorial-on-d3-basics-and-circle-packing-heirarchical-bubb
// TODO: (working so far) V2 zoomable packing - https://observablehq.com/@d3/zoomable-circle-packing
// TODO: V3 simple circle packing https://bl.ocks.org/denjn5/6d5ddd4226506d644bb20062fc60b53f
// TODO: https://www.freecodecamp.org/news/a-gentle-introduction-to-d3-how-to-build-a-reusable-bubble-chart-9106dc4f6c46/
