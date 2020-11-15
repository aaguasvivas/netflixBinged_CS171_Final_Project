// set the dimensions and margins of the graph
let margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// set the ranges
let x = d3.scaleBand()
    .range([0, width])
    .padding(0.1);
let y = d3.scaleLinear()
    .range([height, 0]);

// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
let svg = d3.select(".subscribersByPlatform").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// get the data
d3.csv("data/streamingPlatformsSubscribers.csv", function(error, data) {
    if (error) throw error;

    // format the data
    data.forEach(function(d) {
        d.numSubscribers = +d.numSubscribers;
    });

    console.log(data)

    // Scale the range of the data in the domains
    x.domain(data.map(function(d) { return d.platform; }));
    y.domain([0, d3.max(data, function(d) { return d.numSubscribers; })]);

    // append the rectangles for the bar chart
    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.platform); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d.numSubscribers); })
        .attr("height", function(d) { return height - y(d.numSubscribers); });

    // add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // add the y Axis
    svg.append("g")
        .call(d3.axisLeft(y));

});