/*
 * StackedAreaChart - ES6 Class
 * @param  parentElement 	-- the HTML element in which to draw the visualization
 * @param  data             -- the data the that's provided initially
 * @param  displayData      -- the data that will be used finally (which might vary based on the selection)
 *
 * @param  focus            -- a switch that indicates the current mode (focus or stacked overview)
 * @param  selectedIndex    -- a global 'variable' inside the class that keeps track of the index of the selected area
 */

class StackedAreaChart {

// constructor method to initialize StackedAreaChart object
    constructor(parentElement, data) {
        this.parentElement = parentElement;
        this.data = data;
        this.displayData = [];

        let colors = ['#E50914','#0D98BA'];

        // grab all the keys from the key value pairs in data (filter out 'year' ) to get a list of categories
        this.dataCategories = Object.keys(this.data[0]).filter(d=>d !== "Year")

        console.log(this.dataCategories)

        // prepare colors for range
        let colorArray = this.dataCategories.map( (d,i) => {
            return colors[i%2]
        })
        // Set ordinal color scale
        this.colorScale = d3.scaleOrdinal()
            .domain(this.dataCategories)
            .range(colorArray);
    }


    /*
     * Method that initializes the visualization (static content, e.g. SVG area or axes)
     */
    initVis(){
        let vis = this;

        vis.margin = {top: 100, right: 20, bottom: 100, left: 150};

        vis.width = $('#' + vis.parentElement).width() - vis.margin.left - vis.margin.right;
        vis.height = $('#' + vis.parentElement).height() - vis.margin.top - vis.margin.bottom;

        console.log("data", vis.data)


        // SVG drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");

        // Overlay with path clipping
        vis.svg.append("defs").append("clipPath")
            .attr("id", "clip")

            .append("rect")
            .attr("width", vis.width)
            .attr("height", vis.height);

        // Scales and axes
        vis.x = d3.scaleTime()
            .range([0, vis.width])
            .domain(d3.extent(vis.data, d=> d.Year));

        vis.y = d3.scaleLinear()
            .range([vis.height, 0]);

        vis.xAxis = d3.axisBottom()
            .scale(vis.x);

        vis.yAxis = d3.axisLeft()
            .scale(vis.y);

        vis.svg.append("g")
            .attr("class", "x-axis axis")
            .attr("transform", "translate(0," + vis.height + ")");

        vis.svg.append("g")
            .attr("class", "y-axis axis");


        // TO-DO (Activity II): Initialize stack layout

        let stack = d3.stack()
            .keys(vis.dataCategories);

        // TO-DO (Activity II) Stack data

        vis.stackedData = stack(vis.data);


        // TO-DO (Activity II) Stacked area layout

        vis.area = d3.area()
            .curve(d3.curveCardinal)
            .x(d => vis.x(d.data.Year))
            .y0(d => vis.y(d[0]))
            .y1(d => vis.y(d[1]));



        // TO-DO (Activity IV): Add Tooltip placeholder
        vis.svg.append("text")
            .attr("class","tooltips")
            .attr("fill","white")
            .attr("x", 40)
            .attr("y", 20)


        // TO-DO: (Filter, aggregate, modify data)
        vis.wrangleData();

    }

    /*
     * Data wrangling
     */
    wrangleData(){
        let vis = this;

        vis.displayData = vis.stackedData;


        // Update the visualization
        vis.updateVis();
    }

    /*
     * The drawing function - should use the D3 update sequence (enter, update, exit)
     * Function parameters only needed if different kinds of updates are needed
     */
    updateVis(){
        let vis = this;

        // Update domain
        // Get the maximum of the multi-dimensional array or in other words, get the highest peak of the uppermost layer
        vis.y.domain([0, d3.max(vis.displayData, function(d) {
            return d3.max(d, function(e) {
                return e[1];
            });
        })
        ]);

        // Draw the layers
        let categories = vis.svg.selectAll(".area")
            .data(vis.displayData);

        categories.enter().append("path")
            .attr("class", "area")
            .merge(categories)
            .style("fill", d => {
                return vis.colorScale(d)
            })
            .attr("d", d => vis.area(d))


            // (Activity IV): update tooltip text on hover
            .on("mouseover", function(event, d) {

                vis.svg.selectAll(".tooltips")
                    .text(d.key)
            })

        vis.svg.append("text")
            .attr("transform",
                "translate(" + (vis.width/2) + " ," +
                (vis.height + vis.margin.top - 40) + ")")
            .style("text-anchor", "middle")
            .text("Year")
            .attr("fill", "white")
            .attr("fontSize", 22);

        // text label for the y axis
        vis.svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - vis.margin.left + 75)
            .attr("x",0 - (vis.height / 2) + 10)
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Subscribers (in Millions)")
            .attr("fill", "white")
            .attr("fontSize", 22);

        categories.exit().remove();

        // Call axis functions with the new domain
        vis.svg.select(".x-axis").call(vis.xAxis);
        vis.svg.select(".y-axis").call(vis.yAxis);
    }
}